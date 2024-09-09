'use client';
import { Courses, ExamSubjects } from '@/interfaces/interfaces';
import { getCourses } from '@/services/courses.service';
import { deleteExamSubjects, getExamSubjects, updateExamSubjects } from '@/services/subject.service';
import React, { useEffect, useState } from 'react';

export default function ViewExamSubject() {
  const [examSubjects, setExamSubjects] = useState<ExamSubjects[]>([]);
  const [courses, setCourses] = useState<Courses[]>([]); // Lưu danh sách các khoá thi
  const [selectedExamSubjects, setSelectedExamSubjects] = useState<ExamSubjects | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    courseId: 0,
    description: '',
    questionNumbers:0,
  })
  useEffect(() => {
    const fetchExamSubject = async () => {
      try {
        const examSubjectsData = await getExamSubjects();
        setExamSubjects(examSubjectsData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCourses = async () => {
      try {
        const coursesData = await getCourses();
        setCourses(coursesData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExamSubject();
    fetchCourses();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteExamSubjects(id);
      // Cập nhật danh sách sau khi xóa
      setExamSubjects((prevExamSubjects) =>
        prevExamSubjects.filter((examSubject) => examSubject.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm tìm tên khoá thi dựa vào courseId
  const findCourseTitle = (courseId: number) => {
    const course = courses.find((item) => item.id === courseId);
    return course ? course.title : 'N/A'; // Nếu không tìm thấy, trả về 'N/A'
  };


    const handleChange = (examSubjectsOld:ExamSubjects) =>{
      //luu thong tin cua mon thi
      setSelectedExamSubjects(examSubjectsOld);
      setFormData({
        title: examSubjectsOld.title,
        courseId: examSubjectsOld.courseId,
        description: examSubjectsOld.description,
        questionNumbers: examSubjectsOld.questionNumbers,
      });
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === 'courseID' ? Number(value) : value, // Chuyển đổi courseID thành số
      }));
    };
    const handleUpdate = async () => {
      if(selectedExamSubjects){
        try {
          await updateExamSubjects(selectedExamSubjects.id, formData)
          setExamSubjects((prevData) =>
            prevData.map((examSubject)=>
              examSubject.id === selectedExamSubjects.id ? {... examSubject, ...formData} : examSubject         
            )
          );
          setSelectedExamSubjects(null) // dong form cap nhat
        } catch (error) {
          console.log(error);
        }
      }
    }
  return (
    <>
      <div className="container mx-auto py-6">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="bg-blue-500 p-4 rounded-t-lg">
            <h6 className="text-white font-semibold">Exams</h6>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">STT</th>
                <th className="px-4 py-2 text-left text-gray-600">Tên Môn Thi</th>
                <th className="px-4 py-2 text-left text-gray-600">Khoá Thi</th>
                <th className="px-4 py-2 text-left text-gray-600">Mô Tả</th>
                <th className="px-4 py-2 text-left text-gray-600">Chức năng</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {examSubjects.map((examSubject, index) => (
                <tr key={examSubject.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{examSubject.title}</td>
                  <td className="px-4 py-2">{findCourseTitle(examSubject.courseId)}</td> {/* Render tên khoá thi */}
                  <td className="px-4 py-2">{examSubject.description}</td>
                  <td className="px-4 py-2">
                    {/* Thêm id vào hàm xóa */}
                    <button onClick={() => handleDelete(examSubject.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
                      Xoá
                    </button>{' '}
                    &nbsp;&nbsp;
                    <button 
                    onClick={() => handleChange(examSubject)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition">
                      Cập Nhật
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Form cập nhật */}
      {selectedExamSubjects && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Cập Nhật Môn Thi</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Tên Môn Thi</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Khoá Thi</label>
            <select
              name="courseID"  // Thêm thuộc tính name để xác định trường dữ liệu
              value={formData.courseId}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Chọn 1 Khoá Thi</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mô Tả</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Số câu hỏi</label>
            <input
              type="number"
              name="questionNumbers"
              value={formData.questionNumbers}
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
