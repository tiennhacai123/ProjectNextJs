'use client'
import React, { useEffect } from 'react';
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



export default function Page() {
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
    return () => {
      navItems.forEach((element) => {
        element.removeEventListener('click', () => {});
      });
    };
  }, []);
  const handleLogout = () => {
      route.push('../auth/loginAdmin');
    }

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
              <a href="#">
              <IoHomeOutline />
              <span className="links">Dashboard</span>
              </a>
            </li>
            <li className="navList">
              <a href="#">
              <FaRegUserCircle />
                <span className="links">Quản lý người dùng</span>
              </a>
            </li>
            <li className="navList">
              <a href="#">
              <CiBookmark />
                <span className="links">Quản lý khoá thi</span>
              </a>
            </li>
            <li className="navList">
              <a href="#">
              <CiFileOn />
                <span className="links">Quản lý môn thi</span>
              </a>
            </li>
            <li className="navList">
              <a href="#">
              <GrTest />

                <span className="links">Quản lý đề thi</span>
              </a>
            </li>
            <li className="navList">
              <a href="#">
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
            <span className="text">Dashboard</span>
            </div>
            <div className="boxes">
              <div className="box box1">
              <FaRegUserCircle />
                <span className="text">Users</span>
                <span className="number">18345</span>
              </div>
              <div className="box box2">
              <CiFileOn />
                <span className="text">Subjects</span>
                <span className="number">2745</span>
              </div>
              <div className="box box3">
              <CiBookmark />
                <span className="text">Courses</span>
                <span className="number">1209</span>
              </div>
              <div className="box box4">
              <BsQuestionSquare />
                <span className="text">Questions</span>
                <span className="number">123</span>
              </div>
            </div>
          </div>

          {/* Data Tables */}
          <div className="data-table activityTable">
            <div className="title">
              {/* <ion-icon name="time-outline" /> */}
              <span className="text">Recent Activities</span>
            </div>
          </div>

          <div style={{ display: "none" }} className="data-table userDetailsTable">
            <div className="title">
              {/* <ion-icon name="folder-outline" /> */}
              <span className="text">Content</span>
            </div>
          </div>

          <div style={{ display: "none" }} className="data-table EditUserRole">
            <div className="title">
              {/* <ion-icon name="analytics-outline" /> */}
              <span className="text">Analytics</span>
            </div>
          </div>

          <div style={{ display: "none" }} className="data-table VehicleDetails">
            <div className="title">
              {/* <ion-icon name="heart-outline" /> */}
              <span className="text">Likes</span>
            </div>
          </div>

          <div style={{ display: "none" }} className="data-table downloads">
            <div className="title">
              {/* <ion-icon name="chatbubbles-outline" /> */}
              <span className="text">Comments</span>
            </div>
          </div>
          <div style={{ display: "none" }} className="data-table downloads">
            <div className="title">
              {/* <ion-icon name="chatbubbles-outline" /> */}
              <span className="text">Questions</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
