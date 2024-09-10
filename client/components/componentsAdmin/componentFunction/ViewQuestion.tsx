'use client'

import { Questions, Exams } from '@/interfaces/interfaces'
import { deleteQuestion, getQuestions, updateQuestion } from '@/services/question.service'
import { getExam } from '@/services/exam.service'
import React, { useEffect, useState } from 'react'

export default function ViewQuestion() {
  const [questions, setQuestions] = useState<Questions[]>([])
  const [exams, setExams] = useState<Exams[]>([])
  const [selectedQuestion, setSelectedQuestion] = useState<Questions | null>(null)

  useEffect(() => {
    // Fetch exams and questions data for rendering
    const fetchExams = async () => {
      try {
        const examData = await getExam();
        setExams(examData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchQuestions = async () => {
      try {
        const questionData = await getQuestions();
        setQuestions(questionData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExams();
    fetchQuestions();
  }, []);

  // Function to find the related exam title
  const findExamTitle = (examId: number) => {
    const exam = exams.find((item) => item.id === examId);
    return exam ? exam.title : 'N/A';
  };

  // Function to delete a question
  const handleDelete = async (id: number) => {
    try {
      await deleteQuestion(id);
      setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Declare update form for questions
  const [formData, setFormData] = useState({
    questions: '',
    examId: 0,
    options: ['', '', '', ''],
    answer: '',
  });

  const handleChange = (questionOld: Questions) => {
    setSelectedQuestion(questionOld);
    setFormData({
      questions: questionOld.questions,
      examId: questionOld.examId,
      options: questionOld.options,
      answer: questionOld.answer,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'examId' ? Number(value) : value,
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      options: updatedOptions,
    }));
  };

  const handleUpdate = async () => {
    if (selectedQuestion) {
      try {
        await updateQuestion(selectedQuestion.id, formData);
        setQuestions((prevData) =>
          prevData.map((question) =>
            question.id === selectedQuestion.id ? { ...question, ...formData } : question
          )
        );
        setSelectedQuestion(null); // Close the update form
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="container mx-auto py-6">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="bg-blue-500 p-4 rounded-t-lg">
            <h6 className="text-white font-semibold">Danh Sách Câu Hỏi</h6>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">STT</th>
                <th className="px-4 py-2 text-left text-gray-600">Câu Hỏi</th>
                <th className="px-4 py-2 text-left text-gray-600">Môn Thi</th>
                <th className="px-4 py-2 text-left text-gray-600">Câu Trả Lời </th>
                <th className="px-4 py-2 text-left text-gray-600">Câu Trả Lời Đúng</th>
                <th className="px-4 py-2 text-left text-gray-600">Chức năng</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {questions.map((question, index) => (
                <tr key={question.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{question.questions}</td>
                  <td className="px-4 py-2">{findExamTitle(question.examId)}</td>
                  <td className="px-4 py-2">{question.options.join(',')}</td>
                  <td className="px-4 py-2">{question.answer}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(question.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                    >
                      Xoá
                    </button>{' '}
                    &nbsp;&nbsp;
                    <button
                      onClick={() => handleChange(question)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                    >
                      Cập Nhật
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Update Form */}
      {selectedQuestion && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Cập Nhật Câu Hỏi</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Câu Hỏi</label>
            <input
              type="text"
              name="question"
              value={formData.questions}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Đề Thi</label>
            <select
              name="examId"
              value={formData.examId}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Chọn Môn Thi</option>
              {exams.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.title}
                </option>
              ))}
            </select>
          </div>
          {formData.options.map((option, index) => (
            <div className="mb-4" key={index}>
              <label className="block text-gray-700">Lựa Chọn {index + 1}</label>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-gray-700">Câu Trả Lời Đúng</label>
            <input
              type="text"
              name="answer"
              value={formData.answer}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Cập Nhật
          </button>
        </div>
      )}
    </>
  );
}
