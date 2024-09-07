import { ExamSubjects } from "@/interfaces/interfaces";
import axios from "axios";
 
const API_URL = 'http://localhost:8080/examSubject'

export const getSubjects = async ():Promise<ExamSubjects[]> => {
    const reponse = await axios.get(API_URL);
    return reponse.data
}