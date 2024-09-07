import { Questions } from "@/interfaces/interfaces"
import axios from "axios"

const API_URL = "http://localhost:8080/questions"

export const getQuestions = async ():Promise<Questions[]> => {
    const reponse =  await axios.get(API_URL);
    return reponse.data;
}