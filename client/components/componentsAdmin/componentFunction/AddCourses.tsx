'use client'

import { Courses } from '@/interfaces/interfaces';
import { addCourses, getCourses } from '@/services/courses.service';
import React, { useEffect, useState } from 'react';
import { uploadImage } from '@/config/firebase'; // Import the uploadImage function

export default function AddCourse() {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [courseName, setCourseName] = useState('');
  const [description, setDescriptions] = useState('');
  const [questionNumber, setQuestionNumber] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    courseName: '',
    description: '',
    questionNumber: '',
    image: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourses();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset lỗi và thông báo thành công
    setErrors({
      courseName: '',
      description: '',
      questionNumber: '',
      image: '',
    });
    setSuccessMessage('');

    // Validate form
    let hasError = false;
    const newErrors = {
      courseName: '',
      description: '',
      questionNumber: '',
      image: '',
    };

    if (!courseName) {
      newErrors.courseName = 'Tên khoá thi không được để trống';
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

    if (!image) {
      newErrors.image = 'Vui lòng chọn ảnh';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      let imageURL = '';
      if (image) {
        imageURL = await uploadImage(image);
      }

      const newCourse: Courses = {
        id: Math.floor(Math.random() * 1000),
        title: courseName,
        description: description,
        totalQuestions: parseInt(questionNumber),
        image: imageURL,
      };

      const addedCourse = await addCourses(newCourse);
      setCourses((prevCourses) => [...prevCourses, addedCourse]);

      setCourseName('');
      setDescriptions('');
      setQuestionNumber('');
      setImage(null);
      setSuccessMessage('Thêm Khoá Học Thành Công');
    } catch (err) {
      console.log(err);
      setSuccessMessage('Có lỗi xảy ra khi thêm khoá học');
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-center text-blue-500 text-2xl font-semibold mb-8">Thêm Khoá Thi</h2>
      <form onSubmit={handleSubmit} autoComplete="off" className="mx-auto max-w-lg p-6 bg-gray-100 rounded-lg shadow-lg">
        <div className="space-y-4">
          <div className="form-group">
            <label htmlFor="course_name" className="block text-gray-700 font-medium">Tên Khoá Thi</label>
            <input
              type="text"
              id="course_name"
              name="course_name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Khóa luyện thi đại học"
              className={`form-control w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.courseName ? 'border-red-500' : ''}`}
            />
            {errors.courseName && <p className="text-red-500 text-sm">{errors.courseName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="description" className="block text-gray-700 font-medium">Mô tả</label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescriptions(e.target.value)}
              placeholder="Khóa luyện thi cho học sinh chuẩn bị thi đại học"
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
              placeholder="10"
              className={`form-control w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.questionNumber ? 'border-red-500' : ''}`}
            />
            {errors.questionNumber && <p className="text-red-500 text-sm">{errors.questionNumber}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="image" className="block text-gray-700 font-medium">Ảnh</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className={`form-control w-full mt-1 p-2 border border-gray-300 rounded-lg ${errors.image ? 'border-red-500' : ''}`}
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
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
