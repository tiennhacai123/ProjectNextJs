export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 lg:space-y-0">
          <div className="lg:w-1/2 space-y-6">
            <div className="flex items-center space-x-4">
              <img
                src="https://static.vecteezy.com/system/resources/previews/009/182/690/original/thi-letter-logo-design-with-polygon-shape-thi-polygon-and-cube-shape-logo-design-thi-hexagon-logo-template-white-and-black-colors-thi-monogram-business-and-real-estate-logo-vector.jpg"
                alt="Logo"
                className="w-16 h-16 rounded-full border-2 border-gray-500 shadow-lg"
              />
              <h1 className="text-2xl font-semibold text-white">
                OnlineTest - Luyện thi miễn phí
              </h1>
            </div>
            <p className="text-gray-400 max-w-lg leading-relaxed">
              OnlineTest là một hệ thống thi trắc nghiệm trực tuyến linh hoạt. 
              Người dùng có thể tạo và tham gia các bài kiểm tra đa dạng với tính năng tùy chỉnh.
            </p>
            <div className="flex space-x-4 text-2xl">
              <i className="fa-brands fa-facebook hover:text-blue-500"></i>
              <i className="fa-brands fa-twitter hover:text-blue-400"></i>
              <i className="fa-brands fa-github hover:text-gray-500"></i>
              <i className="fa-brands fa-instagram hover:text-pink-500"></i>
            </div>
          </div>
  
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Về OnlineTest</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Group 3</li>
                <li>Tuyển dụng</li>
                <li>Group 3 Mall</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Hỗ trợ</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Điều khoản</li>
                <li>Bảo mật</li>
                <li>Dịch vụ</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Thông tin khác</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Group 3 Blog</li>
                <li>Thông tin đề thi</li>
                <li>Cam kết</li>
              </ul>
            </div>
          </div>
        </div>
  
        <hr className="my-6 border-gray-700" />
  
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center text-sm text-gray-400">
          <div>
            <span>&copy; 2024 OnlineTest. Created with </span>
            <i className="fa-solid fa-heart text-red-600"></i>
            <span> by Group 3</span>
          </div>
          <div>
            <span>Trao tri thức - Nhận niềm tin!</span>
          </div>
        </div>
      </footer>
    );
  }
  