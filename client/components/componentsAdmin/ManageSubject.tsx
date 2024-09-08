'use client'
import React, { useState } from 'react'
import AddExamSubject from './componentFunction/AddExamSubject'
import ViewExamSubject from './componentFunction/ViewExamSubject'

export default function ManageSubject() {

  const [showAddExamSubjects, setShowAddExamSubjects] = useState<boolean>(false)
  const [showViewExamSubjects, setShowViewExamSubjects] = useState<boolean>(false)
  return (
    <>
      <div className="container mx-auto py-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="col-span-1">
      <div className="bg-blue-500 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center">
          <h6 className="text-white text-lg font-semibold">
            <p onClick={()=>{setShowAddExamSubjects(true); setShowViewExamSubjects(false) }} className="no-underline text-white">Thêm Môn Thi</p>
          </h6>
          <h2 className="text-right text-white text-2xl">
            <i className="fas fa-plus"></i>
          </h2>
        </div>
      </div>
    </div>

    <div className="col-span-1">
      <div className="bg-green-500 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center">
          <h6 className="text-white text-lg font-semibold">
          <p onClick={()=>{setShowAddExamSubjects(false); setShowViewExamSubjects(true) }} className="no-underline text-white">Danh Sách Môn Thi</p>
          </h6>
          <h2 className="text-right text-white text-2xl">
            <i className="fas fa-eye"></i>
          </h2>
        </div>
      </div>
    </div>
  </div>
</div>
{showAddExamSubjects && <AddExamSubject/>}
{showViewExamSubjects && <ViewExamSubject/>}
    </>
  )
}
