import { Questions } from "@/interfaces/interfaces"
import axios from "axios"

const API_URL = "http://localhost:8080/questions"

export const getQuestions = async ():Promise<Questions[]> => {
    const response =  await axios.get(API_URL);
    return response.data;
}


// Add a new question
export const addQuestion = async (newQuestion:any) => {
    const response = await axios.post(API_URL, newQuestion);
    return response.data
} 

export const deleteQuestion = async (id:number):Promise<void> => {
    await axios.delete(`${API_URL}/${id}`)
}

export const updateQuestion = async (id:number, formData?: {questions:string, answer:string, examId:number, options:string[] }):Promise<void>=>{
    await axios.put(`${API_URL}/${id}`,formData);
}