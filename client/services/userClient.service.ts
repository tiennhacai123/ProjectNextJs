// userService.ts
import { Users } from '@/interfaces/interfaces';
import axios from 'axios';

const API_URL = 'http://localhost:8080/users';

export const addUser = async (user: Omit<Users, 'id'>) => {
  return axios.post(API_URL, {
    ...user,
    role: 1,
    profilePicture: '', 
    status: true,
  });
};

export const getAllUser = async (params: any) => {
  return axios.get(API_URL, { params });
};
