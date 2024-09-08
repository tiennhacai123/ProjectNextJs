'use client';
import { Users } from '@/interfaces/interfaces';
import { getDataUser, updateUser } from '@/services/user.service';
import React, { useEffect, useState } from 'react';

export default function ManageUser() {
  const [users, setUsers] = useState<Users[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Theo dõi trang hiện tại
  const usersPerPage = 5; // Số lượng user mỗi trang

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

  // Tính toán chỉ số của người dùng trong trang hiện tại
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser); // Lấy ra user của trang hiện tại

  // Thay đổi trang
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <b className="text-lg font-bold">Trang ManageUser</b>
      <table className="min-w-full mt-4 table-auto border-collapse">
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
          {currentUsers.map((user, index) => {
            const statusClass =
              user.status === true
                ? 'bg-green-200 text-green-600'
                : 'bg-red-200 text-red-600'; 
            return (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1 + (currentPage - 1) * usersPerPage}</td>
                <td className="py-3 px-6 text-left">{user.username}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`${statusClass} py-1 px-3 rounded-full text-xs`}>
                    {user.status ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">
                  <button onClick={() => toggleUserStatus(user.id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="mt-4">
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}
