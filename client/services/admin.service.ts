import { Admin } from '@/interfaces/interfaces';
import axios from 'axios';
const API_URL = 'http://localhost:8080/admin';

export const getAdmin = async (): Promise<Admin[]> => {
    const response = await axios.get(API_URL);
    return response.data
}                                                         
