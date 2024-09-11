'use client'

import { IoMdLogOut } from "react-icons/io";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { searchCourses } from "@/services/courses.service"; // Import hàm tìm kiếm
import { Courses, Users } from "@/interfaces/interfaces";

export default function Header() {
  const [account, setAccount] = useState<Users | null>(null);
  const [search, setSearch] = useState<string>("");
  const [courses, setCourses] = useState<Courses[]>([]); // Để lưu kết quả tìm kiếm

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    setAccount(user);
  }, []);

  const router = useRouter();

  const handleLogOut = () => {
    const confirmLogout = confirm("Bạn có chắc chắn đăng xuất không?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      router.push("/pages/SignInSignUp");
      setAccount(null);
    }
  };

  const handleSearchSubject = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.trim() !== "") {
      try {
        const result = await searchCourses(e.target.value);
        setCourses(result);
        console.log(result); // Hiển thị kết quả tìm kiếm trên console (tuỳ chỉnh theo nhu cầu)
      } catch (error) {
        console.error('Lỗi khi tìm kiếm khóa học:', error);
      }
    } else {
      setCourses([]); // Xóa kết quả tìm kiếm khi ô tìm kiếm rỗng
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Phần bên trái */}
        <div className="flex items-center space-x-4">
          <a href="/">
            <img
              src="https://static.vecteezy.com/system/resources/previews/009/182/690/original/thi-letter-logo-design-with-polygon-shape-thi-polygon-and-cube-shape-logo-design-thi-hexagon-logo-template-white-and-black-colors-thi-monogram-business-and-real-estate-logo-vector.jpg"
              alt="Logo"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md"
            />
          </a>
          <p className="text-2xl font-semibold tracking-wide">OnlineTest</p>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="relative w-full max-w-md">
          <input
            type="search"
            className="w-full py-2 pl-4 pr-10 rounded-full bg-white text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Tìm kiếm khoá học..."
            value={search}
            onChange={handleSearchSubject}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
            <i className="fa-solid fa-search"></i>
          </button>
          {/* Hiển thị kết quả tìm kiếm */}
          {courses.length > 0 && (
            <div className="absolute z-10 w-full bg-white text-gray-800 mt-2 rounded-md shadow-lg max-h-60 overflow-auto">
              <ul>
                {courses.map(course => (
                  <li
                    key={course.id}
                    className="p-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                    onClick={() => router.push(`/subject/${course.id}`)} // Thay đổi URL tùy thuộc vào cách bạn muốn điều hướng
                  >
                    <p className="font-semibold">{course.title}</p>
                    <p className="text-sm text-gray-600 truncate">{course.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Phần bên phải */}
        <div className="flex items-center space-x-6">
          <nav className="space-x-4">
            <a href="/" className="hover:text-indigo-300">
              Trang chủ
            </a>
            <a href="#" className="hover:text-indigo-300">
              Khóa học
            </a>
            <a href="#" className="hover:text-indigo-300">
              Liên hệ
            </a>
          </nav>
          <div id="loginOut" className="flex items-center gap-4">
            {account ? (
              <div className="flex items-center gap-4">
                <a href="/profile">
                  <img
                    src={
                      account.profilePicture
                        ? account.profilePicture
                        : "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                    className="w-9 h-9 rounded-full border-2 border-white shadow-md"
                  />
                </a>
                <a href="/profile" className="hover:text-indigo-300">
                  {account.username}
                </a>
                <button
                  onClick={handleLogOut}
                  className="hover:text-red-400 transition transform hover:scale-105"
                >
                  <IoMdLogOut />
                </button>
              </div>
            ) : (
              <a href="/pages/SignInSignUp" className="hover:text-indigo-300">
                Đăng nhập
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
