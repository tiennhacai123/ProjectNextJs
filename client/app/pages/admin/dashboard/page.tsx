'use client'
import React, { useEffect, useState } from 'react';
import '../../../assets/dashboard.css';

import { IoHomeOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { CiFileOn } from "react-icons/ci";
import { GrTest } from "react-icons/gr";
import { BsQuestionSquare } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { useRouter } from 'next/navigation';

import ManageCourses from '@/components/componentsAdmin/ManageCourses';
import ManageUser from '@/components/componentsAdmin/ManageUser';
import ManageSubject from '@/components/componentsAdmin/ManageSubject';
import ManageExams from '@/components/componentsAdmin/ManageExams';
import ManageQuestions from '@/components/componentsAdmin/ManageQuestions';

import { getDataUser } from '@/services/user.service';
import { getCourses } from '@/services/courses.service';
import { getQuestions } from '@/services/question.service';
import { getExamSubjects } from '@/services/subject.service';

export default function Page() {
  const [showDashBoard,setShowDashBoard]=useState<boolean>(false);
  const [showManagerUser, setShowManagerUser] = useState<boolean>(false)
  const [showManagerCourses, setShowManagerCourses] = useState<boolean>(false)
  const [showManagerExamSubject, setShowManagerExamSubject] = useState<boolean>(false)
  const [showManagerExam, setShowManagerExam] = useState<boolean>(false)
  const [showManagerQuestion, setShowManagerQuestion] = useState<boolean>(false)
  
  const [countUser, setCountUser] = useState<number>(0);
  const [countSubjectExams, setCountSubjectExams] = useState<number>(0);
  const [countCourses, setCountCourses] = useState<number>(0);
  const [countQuestion, setCountQuestion] = useState<number>(0);
  const route = useRouter();
  useEffect(() => {
    const navItems = document.querySelectorAll(".navList");
    const dataTables = document.querySelectorAll<HTMLElement>(".data-table"); // Cast as HTMLElement
  
    navItems.forEach((element, index) => {
      element.addEventListener('click', () => {
        // Remove 'active' class from all navList items
        navItems.forEach((e) => e.classList.remove('active'));
  
        // Add 'active' class to the clicked item
        element.classList.add('active');
  
        // Hide all data-table elements
        dataTables.forEach((table) => {
          table.style.display = 'none'; // No error now
        });
  
        // Show the corresponding table
        if (dataTables.length > index) {
          dataTables[index].style.display = 'block';
        }
      });
    });
    
    // Cleanup event listeners when the component unmounts
    // lấy dât cho người dùng, khoá học , môn thi và câu hỏi
    const fetchData = async () =>{
      const users = await getDataUser();
      const courses = await getCourses();
      const subjects = await getExamSubjects();
      const questions = await getQuestions();
      setCountSubjectExams(subjects.length)
      setCountQuestion(questions.length);
      setCountCourses(courses.length)
      setCountUser(users.length);
      
      
    }
    fetchData();
    return () => {
      navItems.forEach((element) => {
        element.removeEventListener('click', () => {});
      });
    };
  }, []);
  const handleLogout = () => {
      route.push('../auth/loginAdmin');
    }
// console.log('1223123123213123',countUser);
  return (
    <>
      <nav>
        <div className="logo">
          <div className="logo-image">
            <img src="https://www.vhv.rs/dpng/d/448-4489723_valorant-logo-png-transparent-png.png" alt="" />
          </div>
        </div>
        <div className="menu-items">
          <ul className="navLinks">
            <li className="navList active">
              <a onClick={()=>{ setShowDashBoard(true); setShowManagerCourses(false); setShowManagerExamSubject(false); setShowManagerExam(false); setShowManagerQuestion(false); setShowManagerUser(false)}}>
              <IoHomeOutline />
              <span className="links">Dashboard</span>
              </a>
            </li>
            <li className="navList">
              <a onClick={()=>{ setShowDashBoard(false); setShowManagerCourses(false); setShowManagerExamSubject(false); setShowManagerExam(false); setShowManagerQuestion(false); setShowManagerUser(true)}}>
              <FaRegUserCircle />
                <span className="links">Quản lý người dùng</span>
              </a>
            </li>
            <li className="navList">
              <a onClick={()=>{ setShowDashBoard(false); setShowManagerCourses(true); setShowManagerExamSubject(false); setShowManagerExam(false); setShowManagerQuestion(false); setShowManagerUser(false)}}>
              <CiBookmark />
                <span className="links">Quản lý khoá thi</span>
              </a>
            </li>
            <li className="navList">
              <a onClick={()=>{ setShowDashBoard(false); setShowManagerCourses(false); setShowManagerExamSubject(true); setShowManagerExam(false); setShowManagerQuestion(false); setShowManagerUser(false)}}>
              <CiFileOn />
                <span className="links">Quản lý môn thi</span>
              </a>
            </li>
            <li className="navList">
              <a onClick={()=>{ setShowDashBoard(false); setShowManagerCourses(false); setShowManagerExamSubject(false); setShowManagerExam(true); setShowManagerQuestion(false); setShowManagerUser(false)}}>
              <GrTest />

                <span className="links">Quản lý đề thi</span>
              </a>
            </li>
            <li className="navList">
              <a onClick={()=>{ setShowDashBoard(false); setShowManagerCourses(false); setShowManagerExamSubject(false); setShowManagerExam(false); setShowManagerQuestion(true); setShowManagerUser(false)}}>
              <BsQuestionSquare />
              <span className="links">Quản lý câu hỏi</span>
              </a>
            </li>
          </ul>
          <ul className="bottom-link">
            <li>
              <a href="#">
              <CgProfile />
              <span className="links">Profile</span>
              </a>
            </li>
            <li>
              <a >
              <CiLogout />
              <span onClick={handleLogout} className="links">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <section className="dashboard">
        <div className="container">
          <div className="overview">
            <div className="title">
            <IoHomeOutline />
            <span className="text">Trang Chủ</span>
            </div>
            <div className="boxes">
              <div className="box box1">
              <FaRegUserCircle />
                <span className="text">Người Dùng</span>
                <span className="number">{countUser}</span>
              </div>
              <div className="box box3">
              <CiBookmark />
                <span className="text">Khoá Thi</span>
                <span className="number">{countCourses}</span>
              </div>
              <div className="box box2">
              <CiFileOn />
                <span className="text">Môn Thi</span>
                <span className="number">{countSubjectExams}</span>
              </div>
              <div className="box box4">
              <BsQuestionSquare />
                <span className="text">Câu Hỏi</span>
                <span className="number">{countQuestion}</span>
              </div>
            </div>
          </div>
          {showManagerUser && <ManageUser/>}
          {showManagerCourses && <ManageCourses/>}     
          {showManagerExamSubject && <ManageSubject/>}
          {showManagerExam && <ManageExams/>}     
          {showManagerQuestion && <ManageQuestions/>}
        </div>
      </section>
    </>
  );
}
