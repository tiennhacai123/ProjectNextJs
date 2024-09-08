export interface Users {
    id:number,
    username:string,
    password:string | number,
    email:string,
    role: number,
    profilePicture:string
    status:boolean,
}

export interface Courses {
    id:number,
    title:string,
    description:string,
    totalQuestions:number,
}

export interface ExamSubjects{
    id:number,
    title:string,
    description:string,
    courseId:number,
}

export interface Exams {
    id:number,
    title:string,
    description:string,
    duration:number,
    examSubjectId:number,
}

export interface Questions {
    id:number,
    question:string,
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