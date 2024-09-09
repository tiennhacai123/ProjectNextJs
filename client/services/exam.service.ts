import { Exams } from "@/interfaces/interfaces";
import axios from "axios";

const API_URL = 'http://localhost:8080/exams'

export const getExam = async ():Promise<Exams[]> => {
    const response = await axios.get(API_URL);
    return response.data
}

export const addExam = async (newExam:any) => {
    const response = await axios.post(API_URL, newExam);
    return response.data
} 
export const deleteExam = async (id:number):Promise<void> => {
    await axios.delete(`${API_URL}/${id}`)
}

export const updateExam = async (id:number, formData?: {title:string, description:string, examSubjectId:number, questionNumbers:number ,duration:number}):Promise<void>=>{
    await axios.put(`${API_URL}/${id}`,formData);
}