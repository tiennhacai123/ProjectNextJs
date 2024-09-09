'use client'
import { Exams, ExamSubjects } from '@/interfaces/interfaces'
import { deleteExam, getExam, updateExam } from '@/services/exam.service'
import { getExamSubjects } from '@/services/subject.service'
import React, { useEffect, useState } from 'react'

export default function ViewExam() {
  const [exam, setExam] = useState<Exams[]>([])
  const [examSubjects, setExamSubjects] = useState<ExamSubjects[]>([])
  const [selectedExam, setSelectedExam] = useState<Exams | null>(null)
  useEffect(()=>{
    //lay du lieu cua mon thi de ti render ra de thi nay thuoc mon thi nao
    const fetchExamSubjects = async ()=>{
     try {
      const examSubjectData = await getExamSubjects();
      setExamSubjects(examSubjectData);
    } catch (error) {
      console.log(error);
    } 
    }

    const fetchExam = async () =>{
      try {
        const examData = await getExam();
        setExam(examData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchExamSubjects();    
    fetchExam();
  },[])
  // ham tim mon thi dua vao examSubjectId
  const findExamSubjectTitle = (examSubjectId:number)=>{
    const examSubject = examSubjects.find((item)=> item.id === examSubjectId);
    return examSubject ? examSubject.title : ' N/A'// neu khong tim thay thi tra ve N/A
  };
  //ham xoa mon thi 
    const handleDelete= async (id:number)=>{ 
      try {
        //truyen id de xoa mon thi 
        await deleteExam(id);
        // cap nhat lai danh sach sau khi xoa de thi 
        setExam((prevExam)=>(
          prevExam.filter((prevExam)=> prevExam.id !== id)
        ))
      } catch (error) {
        console.log(error);
      }
    }
    // khai bao form cap nhat de thi 
    const [formData, setFormData] = useState({
      title:'',
      examSubjectId:0,
      description:'',
      questionNumbers:0,
      duration:0,
    });
    
    const handleChange = (examOld:Exams) =>{
      //luu thong tin cua mon thi vao form cap nhat de tien hanh cap nhat
      setSelectedExam(examOld);
      setFormData({
        title: examOld.title,
        examSubjectId: examOld.examSubjectId,
        description: examOld.description,
        questionNumbers: examOld.questionNumbers,
        duration: examOld.duration
      });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === 'examSubjectId' ? Number(value) : value, // Chuyển đổi examSubjectId thành số
      }));
    };
    const handleUpdate = async () => {
      if(selectedExam){
        try {
          await updateExam(selectedExam.id, formData)
          setExam((prevData) =>
            prevData.map((exam)=>
              exam.id === selectedExam.id ? {... exam, ...formData} : exam         
            )
          );
          setSelectedExam(null) // dong form cap nhat
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
            <h6 className="text-white font-semibold">Danh Sách Đề Thi</h6>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">STT</th>
                <th className="px-4 py-2 text-left text-gray-600">Tên Đề Thi</th>
                <th className="px-4 py-2 text-left text-gray-600">Môn Thi</th>
                <th className="px-4 py-2 text-left text-gray-600">Mô Tả</th>
                <th className="px-4 py-2 text-left text-gray-600">Câu Hỏi</th>
                <th className="px-4 py-2 text-left text-gray-600">Thời Gian Thi</th>
                <th className="px-4 py-2 text-left text-gray-600">Chức năng</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {exam.map((exam, index) => (
                <tr key={exam.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{exam.title}</td>
                  <td className="px-4 py-2">{findExamSubjectTitle(exam.examSubjectId)}</td> {/* Render tên mon thi */}
                  <td className="px-4 py-2">{exam.description}</td>
                  <td className="px-4 py-2">{exam.questionNumbers} câu      </td>
                  <td className="px-4 py-2">{exam.duration} phút</td>
                  <td className="px-4 py-2">
                    {/* Thêm id vào hàm xóa */}
                    <button onClick={() => handleDelete(exam.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
                      Xoá
                    </button>{' '}
                    &nbsp;&nbsp;
                    <button 
                    onClick={() => handleChange(exam)}
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
      {selectedExam && (
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
            <label className="block text-gray-700">Đề Thi</label>
            <select
              name="examSubjectId"  // Thêm thuộc tính name để xác định trường dữ liệu
              value={formData.examSubjectId}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Chọn 1 Đề Thi"></option>
              {examSubjects.map((examSubject) => (
                <option key={examSubject.id} value={examSubject.id}>
                  {examSubject.title}
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
          <div className="mb-4">
            <label className="block text-gray-700">Thời Gian Thi</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
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
  )
}
