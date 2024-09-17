"use client";

import Footer from "@/components/componentsUser/Footer";
import Header from "@/components/componentsUser/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCourses } from "@/services/courses.service";
import { Courses } from "@/interfaces/interfaces";

export default function Home() {
  const [courses, setCourses] = useState<Courses[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseList = await getCourses(); // courseList là mảng Courses
        setCourses(courseList); // Không cần truy cập .data
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleClick = (id: number) => {
    const user = localStorage.getItem("user"); // Kiểm tra nếu có ID người dùng trong localStorage
    if (user) {
      router.push(`/subject/${id}`);
      localStorage.setItem("idCourse", JSON.stringify(id));
    } else {
      alert("Bạn phải đăng nhập để lựa chọn khóa học");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1">
        {/* Carousel */}
        <section className="relative">
          <div id="carouselExampleCaptions" className="carousel slide">
            <div className="carousel-inner relative overflow-hidden w-full">
              {[
                {
                  imgSrc: "https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2022/10/24/14bd_-E1-BA-A2nh-banner-website-03.jpg", // Thay thế bằng đường dẫn ảnh thực tế
                  captionTitle: "Khóa luyện thi THPT",
                  captionText: "Khóa luyện thi dành cho học sinh lớp 10,11,12,13",
                },
                
              ].map((item, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={item.imgSrc}
                    className="d-block w-full h-96 object-cover"
                    alt={`Slide ${index + 1}`}
                  />
                  <div className="carousel-caption absolute bottom-0 left-0 right-0 text-center bg-gradient-to-t from-black to-transparent text-white p-4">
                    <h1 className="text-2xl font-bold mb-2 bg-yellow-500 p-2 rounded-lg">
                      {item.captionTitle}
                    </h1>
                    <p className="text-lg bg-yellow-500 p-2 rounded-lg">
                      {item.captionText}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
            <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-4">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="bg-gray-800 text-white rounded-full w-3 h-3"
                aria-current="true"
                aria-label="Slide 1"
              />
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                className="bg-gray-800 text-white rounded-full w-3 h-3"
                aria-label="Slide 2"
              />
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                className="bg-gray-800 text-white rounded-full w-3 h-3"
                aria-label="Slide 3"
              />
            </div>
          </div>
        </section>

        {/* Banner */}
        <div className="relative overflow-hidden bg-gray-800 text-white">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50" />
          </div>
          <div className="relative z-10 p-6 text-center">
            <h1 className="text-4xl font-bold mb-2">Công cụ ôn thi</h1>
            <p className="text-lg mb-4">Trắc Nghiệm hiệu quả</p>
            <p className="mb-6">
              Thông qua các bài thi trắc nghiệm, công cụ sẽ giúp bạn học tập, ôn
              thi hiệu quả hơn, đạt điểm cao hơn.
            </p>
            <a href="Subjects.html">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
                Thi Ngay
              </button>
            </a>
            <div className="mt-6 flex justify-around text-center text-white">
              <div>
                <p className="text-3xl font-bold">10M+</p>
                <p>Lượt truy cập</p>
              </div>
              <div>
                <p className="text-3xl font-bold">10K+</p>
                <p>Đề thi</p>
              </div>
              <div>
                <p className="text-3xl font-bold">100M+</p>
                <p>Lượt thi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses */}
        <section className="p-6">
          <h1 className="text-3xl font-bold text-center mb-8">
            Các khóa luyện thi
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {courses.map((course: Courses) => (
              <div
                key={course.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
                onClick={() => handleClick(course.id)}
              >
                <img
                  src={course.image} // Thay thế bằng đường dẫn ảnh thực tế nếu có
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-center text-red-600 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-center text-gray-600">{course.description}</p>
                  <p className="text-center text-gray-500">Số câu hỏi: {course.totalQuestions}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
