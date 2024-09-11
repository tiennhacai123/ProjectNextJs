"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { getQuestionsByExamId } from "@/services/question.service";
import { Questions } from "@/interfaces/interfaces";
import { getExamDuration } from "@/services/exam.service";

export default function ExamQuestionsPage({ params }: { params: { examId: string } }) {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [answers, setAnswers] = useState<{ [questionId: number]: string }>({});
  const examId = parseInt(params.examId, 10);
  const [duration, setDuration] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const router = useRouter();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5; // Number of questions per page

  // Calculate the number of total pages
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  // Get the questions for the current page
  const currentQuestions = questions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestionsByExamId(examId);
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };
    fetchQuestions();
  }, [examId]);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const exam = await getExamDuration(examId);
        setDuration(exam.duration);
        setRemainingTime(exam.duration * 60);
      } catch (error) {
        console.error("Failed to fetch exam:", error);
      }
    };
    fetchExam();
  }, [examId]);

  useEffect(() => {
    if (remainingTime !== null && remainingTime > 0 && !showResults) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => (prevTime ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [remainingTime, showResults]);

  const formatTime = (time: number | null) => {
    if (time === null) return "";
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleAnswerChange = (questionId: number, selectedOption: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    alert("Bạn có chắc chắn nộp bài không?");
    let correct = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.answer) {
        correct++;
      }
    });
    setCorrectCount(correct);
    setShowResults(true);
    setRemainingTime(0); // Dừng đồng hồ
  };

  const handleCancelExam = () => {
    if (confirm("Bạn có chắc chắn muốn hủy bài thi và thoát không?")) {
      router.push("/"); // Điều hướng về trang chủ
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Bài kiểm tra: {examId}
        </h1>

        <div className="text-center mb-4">
          {remainingTime !== null && remainingTime > 0 ? (
            <p className="text-xl font-semibold text-red-500">
              Thời gian còn lại: {formatTime(remainingTime)}
            </p>
          ) : (
            <p className="text-xl font-semibold text-red-500">Hết thời gian!</p>
          )}
        </div>

        <div className="space-y-6">
          {currentQuestions.length === 0 ? (
            <p>Không có câu hỏi nào cho bài kiểm tra này.</p>
          ) : (
            currentQuestions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.answer;

              return (
                <div
                  key={question.id}
                  className={`bg-white shadow-lg rounded-lg p-4 ${
                    showResults
                      ? isCorrect
                        ? "border-l-4 border-green-500"
                        : "border-l-4 border-red-500"
                      : ""
                  }`}
                >
                  <h3 className="text-xl font-semibold text-red-600">
                    Câu hỏi {index + 1 + (currentPage - 1) * questionsPerPage}: {question.questions}
                  </h3>
                  <ul className="list-disc pl-5 mt-2">
                    {question.options.map((option, i) => (
                      <li
                        key={i}
                        className={`text-gray-600 list-none ${
                          showResults && option === question.answer
                            ? "text-green-600 font-bold"
                            : showResults && userAnswer === option
                            ? "text-red-600"
                            : ""
                        }`}
                      >
                        <label>
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option}
                            checked={userAnswer === option}
                            onChange={() =>
                              handleAnswerChange(question.id, option)
                            }
                            disabled={showResults || remainingTime === 0} // Disable when time is up or results are shown
                            className="mr-2"
                          />
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            disabled={showResults} // Disable submit button after submission
          >
            Nộp Bài
          </button>

          <button
            onClick={handleCancelExam}
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
          >
            Hủy Thi
          </button>
        </div>

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Previous
          </button>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Next
          </button>
        </div>

        {/* Hiển thị modal kết quả */}
        {showResults && (
          <div className="mt-8 bg-white shadow-lg p-4 rounded-lg">
            <h2 className="text-2xl font-bold text-green-600">Kết quả bài thi:</h2>
            <p className="text-xl">
              Bạn đã trả lời đúng {correctCount} trên {questions.length} câu hỏi.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
