"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getExamSubjectsByCourseId } from "@/services/subject.service";
import { ExamSubjects } from "@/interfaces/interfaces";

export default function SubjectPage({ params }: { params: { id: string } }) {
  const [examSubjects, setExamSubjects] = useState<ExamSubjects[]>([]);
  const courseId = parseInt(params.id, 10);
  const router = useRouter();
  useEffect(() => {
    const fetchExamSubjects = async () => {
      try {
        const subjects = await getExamSubjectsByCourseId(courseId);
        setExamSubjects(subjects);
      } catch (error) {
        console.error("Failed to fetch exam subjects:", error);
      }
    };
    fetchExamSubjects();
  }, [courseId]);

  const handleSubjectClick = (examSubjectId: number) => {
    router.push(`/subject/${courseId}/exams/${examSubjectId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Các môn thi của khóa học {courseId}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {examSubjects.length === 0 ? (
            <p>Không có môn thi nào cho khóa học này.</p>   
          ) : (
            examSubjects.map((subject) => (
              <div 
              onClick={() => handleSubjectClick(subject.id)} // Thêm sự kiện click
              key={subject.id} className="bg-white shadow-lg rounded-lg p-4">
                 <img
                  src={subject.image} // Replace with actual image path if available
                  className="w-full h-48 object-cover"
                />
                <h3 className="text-xl font-semibold text-red-600">
                  {subject.title}
                </h3>
                <p className="text-gray-600">Mô tả: {subject.description}</p>
                <p className="text-gray-500">Số câu hỏi: {subject.questionNumbers}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
