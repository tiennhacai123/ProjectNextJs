import { ExamSubjects } from "@/interfaces/interfaces";
import axios from "axios";
 
const API_URL = 'http://localhost:8080/examSubject'

export const getExamSubjects = async ():Promise<ExamSubjects[]> => {
    const reponse = await axios.get(API_URL);
    return reponse.data
}

export const addExamSubjects = async (newExamSubjects:any) => {
    const reponse = await axios.post(API_URL,newExamSubjects)
    return reponse.data;7
}
export const deleteExamSubjects = async (id:number):Promise<void>=>{
    await axios.delete(`${API_URL}/${id}`)
}

export const updateExamSubjects = async (id:number, formData?: {title:string, courseId:number,description:string, questionNumbers: number }):Promise<void>=>{
    await axios.put(`${API_URL}/${id}`,formData);
}