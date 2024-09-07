import { Users } from '@/interfaces/interfaces';
import axios from 'axios';


const API_URL = 'http://localhost:8080/users'

export const getDataUser = async ():Promise<Users[]> => {
    const response = await axios.get(API_URL);
    return response.data
}

export const updateUser = async (id:number, updatedUser: Users):Promise<Users> =>{
    const response = await axios.put(`http://localhost:8080/users/${id}`, updatedUser);
    return response.data;
}