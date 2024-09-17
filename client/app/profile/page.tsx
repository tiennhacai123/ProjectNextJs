'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs'; 
import { getUserById, updateUserProfile } from '@/services/userClient.service';
import { Users } from '@/interfaces/interfaces';
import { uploadImage } from '@/config/firebase';

export default function ProfilePage() {
  const [user, setUser] = useState<Users | null>(null);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      const userData = JSON.parse(userFromStorage) as Users;

      const fetchUserProfile = async () => {
        try {
          const response = await getUserById(userData.id);
          setUser(response.data);
          setNewUsername(response.data.username);
          setNewEmail(response.data.email);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      };

      fetchUserProfile();
    }
  }, []);

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewProfilePicture(e.target.files[0]);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    // Kiểm tra nếu mật khẩu mới không khớp
    if (newPassword && newPassword !== reNewPassword) {
      console.error('Mật khẩu mới không khớp.');
      return;
    }

    let profilePictureUrl = user.profilePicture;

    if (newProfilePicture) {
      try {
        profilePictureUrl = await uploadImage(newProfilePicture); // Upload hình ảnh lên Firebase và lấy URL
      } catch (error) {
        console.error('Failed to upload image:', error);
        return;
      }
    }

    // Mã hóa mật khẩu mới nếu có
    let hashedPassword = user.password;
    if (newPassword) {
      try {
        const salt = await bcrypt.genSalt(10); // Tạo salt
        hashedPassword = await bcrypt.hash(newPassword, salt); // Mã hóa mật khẩu mới
      } catch (error) {
        console.error('Failed to hash password:', error);
        return;
      }
    }

    try {
      await updateUserProfile(user.id, {
        username: newUsername,
        email: newEmail,
        profilePicture: profilePictureUrl,
        // Sử dụng mật khẩu đã mã hóa (hoặc giữ nguyên mật khẩu cũ)
        password: hashedPassword,
        repassword: hashedPassword,
        role: user.role, // Giữ nguyên role
        status: user.status, // Giữ nguyên status
      });

      // Cập nhật dữ liệu vào localStorage
      const updatedUser = { 
        ...user, 
        username: newUsername, 
        email: newEmail, 
        profilePicture: profilePictureUrl,
        password: hashedPassword, // Cập nhật mật khẩu mới đã mã hóa
        repassword: hashedPassword, 
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Optionally, refresh user profile data
      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Trang Cá Nhân</h1>

        {user ? (
          <div className="space-y-4">
            <div className="text-lg">
              <p><strong>Tên:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <div className="mb-4">
                <img
                  src={user.profilePicture || '/default-profile.png'}
                  alt="Profile"
                  className="w-24 h-24 rounded-full"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="Tên người dùng mới"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
              />
              <input
                type="email"
                placeholder="Email mới"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
              />
              <input
                type="password"
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
              />
              <input
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                value={reNewPassword}
                onChange={(e) => setReNewPassword(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-2"
              />
              <input
                type="file"
                onChange={handleProfilePictureChange}
                className="border border-gray-300 p-2 rounded w-full mb-2"
              />
            </div>

            <button
              onClick={handleHome}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
            >
              Quay Về Trang Chủ
            </button>

            <button
              onClick={handleUpdateProfile}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
            >
              Cập Nhật Hồ Sơ
            </button>
          </div>
        ) : (
          <p>Đang tải thông tin người dùng...</p>
        )}
      </div>
    </div>
  );
}
