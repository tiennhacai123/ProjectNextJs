import { Courses } from '@/interfaces/interfaces';
import { deleteCourse, getCourses, updateCourse } from '@/services/courses.service'; // thêm updateCourse
import React, { useEffect, useState } from 'react';

export default function ViewCourses() {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Courses | null>(null); // Theo dõi khóa học được chọn để cập nhật
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    totalQuestions: 0,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCourses();
        setCourses(coursesData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourses();
  }, []);

  const handleDelete = async (courseId: number) => {
    try {
      await deleteCourse(courseId);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (course: Courses) => {
    setSelectedCourse(course); // Lưu thông tin khóa học cần cập nhật
    setFormData({
      title: course.title,
      description: course.description,
      totalQuestions: course.totalQuestions,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    if (selectedCourse) {
      try {
        await updateCourse(selectedCourse.id, formData); // Gọi service cập nhật khóa học
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.id === selectedCourse.id ? { ...course, ...formData } : course
          )
        );
        setSelectedCourse(null); // Đóng form sau khi cập nhật
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="container mx-auto py-6">
        <div className="bg-white shadow-lg rounded-lg">
          <div className="bg-blue-500 p-4 rounded-t-lg">
            <h6 className="text-white font-semibold">Khoá Thi</h6>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">STT</th>
                <th className="px-4 py-2 text-left text-gray-600">Tên Khoá Thi</th>
                <th className="px-4 py-2 text-left text-gray-600">Mô tả</th>
                <th className="px-4 py-2 text-left text-gray-600">Chức năng</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course, index) => (
                <tr key={course.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{course.title}</td>
                  <td className="px-4 py-2">{course.description}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                    >
                      <span className="material-icons">Xoá</span>
                    </button>{' '}
                    &nbsp;&nbsp;
                    <button
                      onClick={() => handleChange(course)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                    >
                      <span className="material-icons">Cập Nhật</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form cập nhật */}
      {selectedCourse && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Cập Nhật Khóa Học</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Tên Khóa Học</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mô tả</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tổng số câu hỏi</label>
            <input
              type="number"
              name="totalQuestions"
              value={formData.totalQuestions}
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
