'use client'
import React, { useState, useEffect } from 'react';
import { getAdmin } from '@/services/admin.service';
import { useRouter } from 'next/navigation'; 
import { Admin } from '@/interfaces/interfaces';

const LoginAdmin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const admins:Admin[] = await getAdmin();
      const admin = admins.find((admin: { email: string; password: any; }) => admin.email === email && String(admin.password) === password);
      if (admin) {
        alert('Đăng nhập thành công');
        router.push('/pages/admin/dashboard');
      } else {
        setError('Email hoặc mật khẩu sai');
      }
    } catch (err) {
      setError('An error occurred while logging in');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
