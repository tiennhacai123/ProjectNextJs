'use client'
import React, { useState } from 'react';
import { addUser, getAllUser } from '@/services/userClient.service';
import { FormData, FormErrors } from '@/interfaces/interfaces';
import '@/app/assets/signInSignUp.css';
import { useRouter } from 'next/navigation';

// lay icon tu react icon
import { FaGoogle } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


export default function SignInSignup() {
  const route = useRouter();
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    repassword: '',
    username: ''
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
    repassword: '',
    username: ''
  });

  const toggleSignInSignUp = () => {
    setIsSignUpActive(!isSignUpActive);
    setFormData({
      email: '',
      password: '',
      repassword: '',
      username: ''
    });
    setErrors({
      email: '',
      password: '',
      repassword: '',
      username: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateFormData = (isSignUp: boolean) => {
    let isValid = true;
    const newErrors: FormErrors = {
      email: '',
      password: '',
      repassword: '',
      username: ''
    };

    // Validate email
    if (!formData.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ.';
      isValid = false;
    }

    // Validate password
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
      isValid = false;
    }

    // Validate repassword
    if (isSignUp && formData.password !== formData.repassword) {
      newErrors.repassword = 'Mật khẩu xác nhận không khớp.';
      isValid = false;
    }

    // Additional validations for sign-up
    if (isSignUp) {
      if (!formData.username.trim()) {
        newErrors.username = 'Tên đăng nhập không được để trống.';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateFormData(isSignUpActive)) {
      return;
    }

    if (isSignUpActive) {
      try {
        await addUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          repassword: formData.repassword,
          profilePicture: '', // Default value
          role: 1, // Default value
          status: true // Default value
        });
        alert('Đăng ký thành công');

        // After successful registration, reset form data
        setFormData({
          email: '',
          password: '',
          repassword: '',
          username: ''
        });

        // Switch to login form
        setIsSignUpActive(false);
      } catch (error) {
        alert('Đăng ký thất bại. Vui lòng thử lại');
      }
    } else {
      try {
        const response = await getAllUser({
          email: formData.email,
          password: formData.password
        });
        const user = response.data.find((user: { email: string; password: string; }) => user.email === formData.email && user.password === formData.password);
        const checkStatus = response.data.find((user: { status: boolean }) => user.status === true);
        if (checkStatus) {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user)); // Save user info to localStorage
            alert(`Chào mừng, ${user.username}!`);
            route.push("/");
          } else {
            alert('Đăng nhập thất bại. Email hoặc mật khẩu không đúng.');
          }
        } else {
          alert('Người dùng đã bị ban');
        }
      } catch (error) {
        alert('Đăng nhập thất bại. Vui lòng thử lại.');
      }
    }
  };

  return (
    <div className='login-design'>
      <div className="auth-wrapper">
        <div className={`container_login ${isSignUpActive ? 'active' : ''}`} id="container_login">
          <div className="form-container_login sign-up">
            <form onSubmit={handleSubmit}>
              <h1>Tạo Tài Khoản</h1>
              <div className="social-icons">
                <a href="#" className="icon">
                <FaGoogle />
                </a>
                <a href="#" className="icon">
                  <FaFacebook/>
                </a>
                <a href="#" className="icon">
                  <FaInstagram/>
                </a>
                <a href="#" className="icon">
                  <FaGithub/>
                </a>
              </div>
              <span>hoặc sử dụng email của bạn để đăng ký</span>
              <input
                type="text"
                name="username"
                placeholder="Tên Đăng Nhập"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <span className="error">{errors.username}</span>}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
              <input
                type="password"
                name="password"
                placeholder="Mật Khẩu"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span className="error">{errors.password}</span>}
              <input
                type="password"
                name="repassword"
                placeholder="Xác Nhận Mật Khẩu"
                value={formData.repassword}
                onChange={handleChange}
              />
              {errors.repassword && <span className="error">{errors.repassword}</span>}
              <button type="submit">Đăng Ký</button>
            </form>
          </div>
          <div className="form-container_login sign-in">
            <form onSubmit={handleSubmit}>
              <h1>Đăng Nhập</h1>
              <div className="social-icons">
                <a href="#" className="icon">
                <FaGoogle />
                </a>
                <a href="#" className="icon">
                <FaFacebook/>
                </a>
                <a href="#" className="icon">
                  <FaInstagram/>
                </a>
                <a href="#" className="icon">
                  <FaGithub/>
                </a>
              </div>
              <span>hoặc sử dụng email của bạn để đăng nhập</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
              <input
                type="password"
                name="password"
                placeholder="Mật Khẩu"
                value={formData.password}
                onChange={handleChange}
                
                autoComplete="current-password"
              />
              {errors.password && <span className="error">{errors.password}</span>}
              <a href="#">Quên mật khẩu của bạn?</a>
              <button type="submit">Đăng Nhập</button>
            </form>
          </div>
          <div className="toggle-container_login">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Chào Mừng Trở Lại!</h1>
                <p>Nhập chi tiết cá nhân của bạn để tiếp tục sử dụng dịch vụ</p>
                <button className="toggle-btn" onClick={toggleSignInSignUp}>Đăng Nhập</button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Chào Mừng!</h1>
                <p>Nhập chi tiết của bạn để bắt đầu sử dụng dịch vụ</p>
                <button className="toggle-btn" onClick={toggleSignInSignUp}>Đăng Ký</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
