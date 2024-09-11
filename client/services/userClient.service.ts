import { Users } from '@/interfaces/interfaces';
import axios from 'axios';

const API_URL = 'http://localhost:8080/users';

// Thêm người dùng mới
export const addUser = async (user: Omit<Users, 'id'>) => {
  try {
    return await axios.post(API_URL, {
      ...user,
      role: 1,
      profilePicture: '', 
      status: true,
    });
  } catch (error) {
    console.error('Lỗi khi thêm người dùng:', error);
    throw error;
  }
};

// Lấy danh sách người dùng
export const getAllUser = async (params: any) => {
  try {
    return await axios.get(API_URL, { params });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách người dùng:', error);
    throw error;
  }
};

// Lấy thông tin người dùng theo ID
export const getUserById = async (id: number) => {
  try {
    return await axios.get(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin người dùng ID: ${id}`, error);
    throw error;
  }
};

// Cập nhật thông tin người dùng
export const updateUser = async (id: number, updatedData: Partial<Users>) => {
  try {
    return await axios.put(`${API_URL}/${id}`, updatedData);
  } catch (error) {
    console.error(`Lỗi khi cập nhật người dùng ID: ${id}`, error);
    throw error;
  }
};
export const updateUserProfile = async (userId: number, updatedData: Partial<Users>): Promise<void> => {
  await axios.put(`${API_URL}/${userId}`, updatedData);
};