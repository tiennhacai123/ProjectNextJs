'use client';
import { Users } from '@/interfaces/interfaces';
import { getDataUser, updateUser } from '@/services/user.service';
import React, { useEffect, useState } from 'react';

export default function ManageUser() {
  const [users, setUsers] = useState<Users[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Theo dõi trang hiện tại
  const usersPerPage = 5; // Số lượng user mỗi trang
  const [searchQuery, setSearchQuery] = useState(''); // State cho thanh tìm kiếm

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getDataUser();
        setUsers(usersData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  // Xử lý thay đổi trạng thái người dùng
  const toggleUserStatus = async (userId: number) => {
    try {
      const userToUpdate = users.find(user => user.id === userId);
      if (userToUpdate) {
        const updatedUser = { ...userToUpdate, status: !userToUpdate.status };
        await updateUser(userId, updatedUser);

        setUsers(users.map(user => (user.id === userId ? updatedUser : user)));
        alert(`Người dùng đã được ${updatedUser.status ? 'kích hoạt' : 'chặn'}`);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Cập nhật trạng thái người dùng thất bại. Vui lòng thử lại.');
    }
  };

  // Xử lý thay đổi giá trị tìm kiếm
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Đặt lại trang hiện tại về 1 khi thay đổi tìm kiếm
  };

  // Lọc người dùng dựa trên giá trị tìm kiếm (case-insensitive)
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Tính toán chỉ số của người dùng trong trang hiện tại
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser); // Lấy ra user của trang hiện tại

  // Thay đổi trang
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-6xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Quản Lý Người Dùng</h1>

        {/* Thanh tìm kiếm */}
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên người dùng..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border border-gray-300 p-2 rounded w-1/3"
          />
        </div>

        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">STT</th>
              <th className="py-3 px-6 text-left">Tên Người Dùng</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Trạng Thái</th>
              <th className="py-3 px-6 text-left">Chức Năng</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentUsers.length > 0 ? (
              currentUsers.map((user, index) => {
                const statusClass =
                  user.status === true
                    ? 'bg-green-200 text-green-600'
                    : 'bg-red-200 text-red-600';
                return (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {index + 1 + (currentPage - 1) * usersPerPage}
                    </td>
                    <td className="py-3 px-6 text-left">{user.username}</td>
                    <td className="py-3 px-6 text-left">{user.email}</td>
                    <td className="py-3 px-6 text-left">
                      <span className={`${statusClass} py-1 px-3 rounded-full text-xs`}>
                        {user.status ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        {user.status ? 'Chặn' : 'Kích hoạt'}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Không tìm thấy người dùng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Phân trang */}
        {filteredUsers.length > usersPerPage && (
          <div className="mt-4 flex justify-center">
            {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
