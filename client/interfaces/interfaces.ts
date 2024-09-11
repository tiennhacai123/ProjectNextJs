export interface Users {
    id:number,
    username:string,
    password:string,
    repassword:string ,
    email:string,
    role: number,
    profilePicture:string
    status:boolean,
}

export interface FormData{
    username: string,
    email:string,
    password:string ,
    repassword:string ,
}

  
  // Định nghĩa interface cho lỗi của form
  export interface FormErrors {
    username: string;
    email: string;
    password: string ;
    repassword: string ;
  }
export interface Courses {
    id:number,
    title:string,
    description:string,
    totalQuestions:number,
    image:string,
}

export interface ExamSubjects{
    id:number,
    title:string,
    description:string,
    courseId:number,
    questionNumbers:number,
    image:string,
}

export interface Exams {
    id:number,
    title:string,
    description:string,
    duration:number,
    examSubjectId:number,
    questionNumbers:number,
    image:string
}

export interface Questions {
    id:number,
    questions:string,
    examId:number,
    options:string[],
    answer:string,
}

export interface UserAnswer {
    id:number,
    userId:number,
    examlId:number,
    score:number
}

export interface Admin {
    email:string,
    password:string | number,
}
// Trong interfaces/interfaces.ts
export interface ExamHistory {
    id: number;
    userId: number;
    examId: number;
    score: number;
    totalQuestions: number; // Thêm thuộc tính này
  }
  