import { Questions } from "@/interfaces/interfaces"
import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next";

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

export const getQuestionsByExamId = async (examId: number): Promise<Questions[]> => {
    const response = await axios.get(`${API_URL}?examId=${examId}`);
    return response.data;
  };

  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { examId } = req.query;
  
    try {
      // Gọi hàm getQuestions để lấy toàn bộ câu hỏi
      const questions = await getQuestions();
  
      // Lọc câu hỏi theo examId
      const examQuestions = questions.filter((q) => q.examId === parseInt(examId as string, 10));
  
      res.status(200).json(examQuestions);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  }
