'use client';

import { useEffect, useState } from 'react';
import { getExam } from '@/services/exam.service';
import { addQuestion } from '@/services/question.service'; // Assume you have a question.service for adding questions
import { Exams } from '@/interfaces/interfaces';

export default function AddQuestion() {
  const [questionText, setQuestionText] = useState('');
  const [answer, setAnswer] = useState('');
  const [examId, setExamId] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [exams, setExams] = useState<Exams[]>([]);
  const [errors, setErrors] = useState({
    questionText: '',
    answer: '',
    examId: '',
    options: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const examData = await getExam();
        setExams(examData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExams();
  }, []);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = {
      questionText: '',
      answer: '',
      examId: '',
      options: '',
    };

    // Validate the input fields
    if (!questionText) {
      newErrors.questionText = 'Câu hỏi không được để trống';
      hasError = true;
    }
    if (!answer) {
      newErrors.answer = 'Đáp án không được để trống';
      hasError = true;
    }
    if (!examId) {
      newErrors.examId = 'Vui lòng chọn đề thi';
      hasError = true;
    }
    if (options.some((option) => !option)) {
      newErrors.options = 'Tất cả các tùy chọn phải được điền';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Reset error messages
    setErrors({
      questionText: '',
      answer: '',
      examId: '',
      options: '',
    });
    setSuccessMessage('');

    // Construct the new question object
    const newQuestion = {
      questions: questionText,
      answer: answer,
      examId: parseInt(examId), // Convert selected examId to a number
      options: options,
    };

    try {
      await addQuestion(newQuestion);
      setQuestionText('');
      setAnswer('');
      setExamId('');
      setOptions(['', '', '', '']);
      setSuccessMessage('Thêm câu hỏi thành công');
    } catch (error) {
      console.log('Có lỗi khi thêm câu hỏi', error);
    }
  };

  return (
    <>
      <div className="container mx-auto py-6">
        <h2 className="text-center text-blue-500 text-2xl font-semibold mb-8">Thêm Câu Hỏi</h2>
        <form onSubmit={handleSubmit} autoComplete="off" className="mx-auto max-w-lg p-6 bg-gray-100 rounded-lg shadow-lg">
          <div className="space-y-4">
            <div className="form-group">
              <label htmlFor="question_text" className="block text-gray-700 font-medium">Câu Hỏi</label>
              <input
                type="text"
                id="question_text"
                name="question_text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Nhập câu hỏi"
                className={`form-control w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.questionText ? 'border-red-500' : ''}`}
              />
              {errors.questionText && <p className="text-red-500 text-sm">{errors.questionText}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="answer" className="block text-gray-700 font-medium">Đáp Án</label>
              <input
                type="text"
                id="answer"
                name="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Nhập đáp án"
                className={`form-control w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.answer ? 'border-red-500' : ''}`}
              />
              {errors.answer && <p className="text-red-500 text-sm">{errors.answer}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="exam_id" className="block text-gray-700 font-medium">Chọn Đề Thi</label>
              <select
                id="exam_id"
                name="exam_id"
                value={examId}
                onChange={(e) => setExamId(e.target.value)}
                className={`form-control w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.examId ? 'border-red-500' : ''}`}
              >
                <option value="">Chọn 1 Đề Thi</option>
                {exams.map((exam) => (
                  <option key={exam.id} value={exam.id}>
                    {exam.title}
                  </option>
                ))}
              </select>
              {errors.examId && <p className="text-red-500 text-sm">{errors.examId}</p>}
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-medium">Tùy Chọn</label>
              {options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Tùy chọn ${index + 1}`}
                  className={`form-control w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-2 ${errors.options ? 'border-red-500' : ''}`}
                />
              ))}
              {errors.options && <p className="text-red-500 text-sm">{errors.options}</p>}
            </div>

            {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}

            <div className="mt-6">
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                Thêm Câu Hỏi
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
