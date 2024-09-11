"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getExamsBySubjectId } from "@/services/exam.service";
import { Exams } from "@/interfaces/interfaces";

export default function ExamPage({ params }: { params: { id: string, examSubjectId: string } }) {
  const [exams, setExams] = useState<Exams[]>([]);
  const examSubjectId = parseInt(params.examSubjectId, 10);
  const subjectId = parseInt(params.id, 10); // Lấy id của subject
  const router = useRouter();
  // Lấy danh sách các bài kiểm tra theo examSubjectId
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const fetchedExams = await getExamsBySubjectId(examSubjectId);
        setExams(fetchedExams);
      } catch (error) {
        console.error("Failed to fetch exams:", error);
      }
    };
    fetchExams();
  }, [examSubjectId]);

  // Hàm điều hướng khi người dùng nhấn vào đề thi
  const handleExamClick = (examId: number) => {
    router.push(`/subject/${subjectId}/exams/${examSubjectId}/${examId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Các đề thi của môn thi {examSubjectId}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {exams.length === 0 ? (
            <p>Không có đề thi nào cho môn thi này.</p>
          ) : (
            exams.map((exam) => (
              <div 
                onClick={() => handleExamClick(exam.id)} 
                key={exam.id} 
                className="cursor-pointer bg-white shadow-lg rounded-lg p-4"
              >
                <img
                  src={exam.image || '/default-image.jpg'} // Thay thế nếu không có ảnh
                  alt={exam.title}
                  className="w-full h-48 object-cover"
                />
                <h3 className="text-xl font-semibold text-red-600">
                  {exam.title}
                </h3>
                <p className="text-gray-500">Tổng số câu hỏi: {exam.questionNumbers}</p>
                <p className="text-gray-600">Thời gian làm bài: {exam.duration} phút</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
