'use client'

import { Courses } from '@/interfaces/interfaces';
import { getCourses } from '@/services/courses.service';
import { addExamSubjects } from '@/services/subject.service';
import React, { useEffect, useState } from 'react';

export default function AddExamSubject() {
  const [examSubjectName, setExamSubjectName] = useState('');
  const [chooseCourses, setChooseCourses] = useState(''); // Lưu id của khóa học
  const [description, setDescription] = useState('');
  const [questionNumber, setQuestionNumber] = useState('');
  const [courses, setCourses] = useState<Courses[]>([]); // Lưu danh sách khóa học
  const [errors, setErrors] = useState({
    examSubjectName: '',
    description: '',
    questionNumber: '',
    chooseCourses: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCourses();
        setCourses(coursesData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset lỗi và thông báo thành công
    setErrors({
      examSubjectName: '',
      description: '',
      questionNumber: '',
      chooseCourses: '',
    });
    setSuccessMessage('');

    // Validate form
    let hasError = false;
    const newErrors = {
      examSubjectName: '',
      description: '',
      questionNumber: '',
      chooseCourses: '',
    };

    if (!examSubjectName) {
      newErrors.examSubjectName = 'Tên môn thi không được để trống';
      hasError = true;
    }

    if (!description) {
      newErrors.description = 'Mô tả không được để trống';
      hasError = true;
    }

    if (!questionNumber || parseInt(questionNumber) <= 0) {
      newErrors.questionNumber = 'Số câu hỏi phải lớn hơn 0';
      hasError = true;
    }

    if (!chooseCourses) {
      newErrors.chooseCourses = 'Bạn phải chọn một khóa thi';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Tạo đối tượng môn thi mới
    const newExamSubject = {
      title: examSubjectName,
      description,
      questionNumber: parseInt(questionNumber),
      courseId: parseInt(chooseCourses), // Gán id của khóa học đã chọn
    };

    try {
      await addExamSubjects(newExamSubject);
      setExamSubjectName('');
      setDescription('');
      setChooseCourses('');
      setQuestionNumber('')
      setSuccessMessage('Môn thi đã được thêm thành công');
    } catch (error) {
      console.log('Có lỗi khi thêm môn thi', error);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-center text-blue-500 text-2xl font-semibold mb-8">Thêm Môn Thi</h2>
      <form onSubmit={handleSubmit} autoComplete="off" className="mx-auto max-w-lg p-6 bg-gray-100 rounded-lg shadow-lg">
        <div className="space-y-4">
          <div className="form-group">
            <label htmlFor="exam_subject_name" className="block text-gray-700 font-medium">Tên Môn Thi</label>
            <input
              type="text"
              id="exam_subject_name"
              name="exam_subject_name"
              value={examSubjectName}
              onChange={(e) => setExamSubjectName(e.target.value)}
              placeholder="Nhập tên môn thi"
              className={`form-control w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.examSubjectName ? 'border-red-500' : ''}`}
            />
            {errors.examSubjectName && <p className="text-red-500 text-sm">{errors.examSubjectName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="choose_course" className="block text-gray-700 font-medium">Chọn Khoá Thi</label>
            <select
              id="choose_course"
              name="choose_course"
              value={chooseCourses}
              onChange={(e) => setChooseCourses(e.target.value)} // Cập nhật giá trị id khóa học đã chọn
              className={`form-control w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.chooseCourses ? 'border-red-500' : ''}`}
            >
              <option value="">Chọn 1 Khoá Thi</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
            {errors.chooseCourses && <p className="text-red-500 text-sm">{errors.chooseCourses}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="block text-gray-700 font-medium">Mô Tả</label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả khoá thi"
              className={`form-control w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="question_number" className="block text-gray-700 font-medium">Số Câu Hỏi</label>
            <input
              type="number"
              id="question_number"
              name="question_number"
              value={questionNumber}
              onChange={(e) => setQuestionNumber(e.target.value)}
              placeholder="Nhập số câu hỏi"
              className={`form-control w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.questionNumber ? 'border-red-500' : ''}`}
            />
            {errors.questionNumber && <p className="text-red-500 text-sm">{errors.questionNumber}</p>}
          </div>
        </div>

        {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}

        <div className="mt-6">
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Thêm</button>
        </div>
      </form>
    </div>
  );
}
