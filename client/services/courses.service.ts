import { Courses } from "@/interfaces/interfaces"
import axios from "axios";

const API_URL = '  http://localhost:8080/courses'

export const getCourses = async ():Promise<Courses[]> => {
    const reponse = await axios.get(API_URL);
    return reponse.data;
}
                 
export const addCourses = async (newCourse: any) => {
      const response = await axios.post(API_URL, newCourse);
      return response.data
  };

  export const deleteCourse = async (courseId: number): Promise<void> => {
    await axios.delete(`${API_URL}/${courseId}`);
  };
  
 export const updateCourse = async (courseId: number, formData?: { title: string; description: string; totalQuestions: number; }): Promise<void> =>{
    await axios.put(`${API_URL}/${courseId}`, formData);
 }
 