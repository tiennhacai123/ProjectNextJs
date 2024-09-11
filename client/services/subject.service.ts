import { ExamSubjects } from "@/interfaces/interfaces";
import axios from "axios";
 
const API_URL = 'http://localhost:8080/examSubject'

export const getExamSubjects = async ():Promise<ExamSubjects[]> => {
    const response = await axios.get(API_URL);
    return response.data
}

export const addExamSubjects = async (newExamSubjects:any) => {
    const response = await axios.post(API_URL,newExamSubjects)
    return response.data;7
}
export const deleteExamSubjects = async (id:number):Promise<void>=>{
    await axios.delete(`${API_URL}/${id}`)
}

export const updateExamSubjects = async (id:number, formData?: {title:string, courseId:number,description:string, questionNumbers: number }):Promise<void>=>{
    await axios.put(`${API_URL}/${id}`,formData);
}

export const getExamSubjectsByCourseId = async (courseId: number): Promise<ExamSubjects[]> => {
    const response = await axios.get(`${API_URL}?courseId=${courseId}`);
    return response.data;
  };