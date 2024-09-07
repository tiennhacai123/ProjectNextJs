'use client';
import { Users } from '@/interfaces/interfaces';
import { getDataUser, updateUser  } from '@/services/user.service';
import React, { useEffect, useState } from 'react';

export default function ManageUser() {
  const [users, setUsers] = useState<Users[]>([]);

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
  const toggleUserStatus = async (userId: number) => {
    try {
      const userToUpdate = users.find(user => user.id === userId); // Tìm người dùng cần cập nhật
      if (userToUpdate) {
        const updatedUser = { ...userToUpdate, status: !userToUpdate.status }; // Đảo ngược trạng thái của người dùng
        await updateUser(userId, updatedUser); // Gọi API để cập nhật người dùng
        
        // Cập nhật lại danh sách users sau khi thay đổi trạng thái
        setUsers(users.map(user => (user.id === userId ? updatedUser : user)));
        
        // Thông báo cho người dùng về thay đổi trạng thái
        alert(`Người dùng đã được ${updatedUser.status ? 'kích hoạt' : 'chặn'}`);
      }
    } catch (error) {
      console.error('Error updating user status:', error); // Xử lý lỗi khi cập nhật trạng thái người dùng
      alert('Cập nhật trạng thái người dùng thất bại. Vui lòng thử lại.');
    }
  };
    return (
    <>
      <b className="text-lg font-bold">Trang ManageUser</b>
      <table className="min-w-full mt-4 table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">STT</th>
            <th className="py-3 px-6 text-left">Tên người dùng</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Trạng thái</th>
            <th className="py-3 px-6 text-left">Chức năng</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users.map((user, index) => {
            const statusClass =
              user.status === true
                ? 'bg-green-200 text-green-600'
                : 'bg-red-200 text-red-600'; 
            return (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                <td className="py-3 px-6 text-left">{user.username}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`${statusClass} py-1 px-3 rounded-full text-xs`}>
                    {user.status ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">
                  <button onClick={()=> toggleUserStatus(user.id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
