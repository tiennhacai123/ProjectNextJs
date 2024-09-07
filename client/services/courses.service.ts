import { Courses } from "@/interfaces/interfaces"
import axios from "axios";

const API_URL = '  http://localhost:8080/courses'

export const getCourses = async ():Promise<Courses[]> => {
    const reponse = await axios.get(API_URL);
    return reponse.data;
}
                                                        