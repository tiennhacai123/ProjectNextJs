'use client'

import { Exams, ExamSubjects } from '@/interfaces/interfaces';
import { addExam } from '@/services/exam.service';
import { getExamSubjects } from '@/services/subject.service';
import { uploadImage } from '@/config/firebase'; // Import hàm uploadImage
import React, { useEffect, useState } from 'react';

export default function AddExam() {
    const [examName, setExamName] = useState('');
    const [chooseExamSubjects, setChooseExamSubjects] = useState('');
    const [description, setDescription] = useState('');
    const [questionNumbers, setQuestionNumbers] = useState('');
    const [duration, setDuration] = useState('');
    const [examSubject, setExamSubject] = useState<ExamSubjects[]>([]);
    const [image, setImage] = useState<File | null>(null); // State để lưu ảnh
    const [errors, setErrors] = useState({
        examName: '',
        chooseExamSubjects: '',
        description: '',
        questionNumbers: '',
        duration: '',
        image: '', // Thêm lỗi cho ảnh
    });
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchExamSubjects = async () => {
            try {
                const examSubjectData = await getExamSubjects();
                setExamSubject(examSubjectData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchExamSubjects();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        let hasError = false;
        const newErrors = {
            examName: '',
            chooseExamSubjects: '',
            description: '',
            questionNumbers: '',
            duration: '',
            image: '', // Thêm lỗi cho ảnh
        };

        if (!examName) {
            newErrors.examName = 'Tên đề thi không được để trống';
            hasError = true;
        }

        if (!description) {
            newErrors.description = 'Mô tả không được để trống';
            hasError = true;
        }

        if (!chooseExamSubjects) {
            newErrors.chooseExamSubjects = 'Môn thi không được để trống';
            hasError = true;
        }

        if (!questionNumbers || parseInt(questionNumbers) <= 0) {
            newErrors.questionNumbers = 'Số câu hỏi không được để trống và phải lớn hơn 0';
            hasError = true;
        }

        if (!duration || parseInt(duration) <= 0) {
            newErrors.duration = 'Thời gian thi không được để trống và phải lớn hơn không';
            hasError = true;
        }

        if (!image) { // Kiểm tra ảnh
            newErrors.image = 'Bạn cần chọn một ảnh';
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        // Reset lỗi và thông báo thành công
        setErrors({
            examName: '',
            chooseExamSubjects: '',
            description: '',
            questionNumbers: '',
            duration: '',
            image: '',
        });
        setSuccessMessage('');

        // Tạo đối tượng đề thi mới
        const imageURL = image ? await uploadImage(image) : '';

        const newExam = {
            title: examName,
            examSubjectId: parseInt(chooseExamSubjects), // Gán id của môn thi đã chọn
            description,
            questionNumbers: parseInt(questionNumbers),
            duration: parseInt(duration),
            image: imageURL // Sử dụng URL của ảnh
        };

        try {
            await addExam(newExam);
            setExamName('');
            setChooseExamSubjects('');
            setDescription('');
            setQuestionNumbers('');
            setDuration('');
            setImage(null); // Reset ảnh
            setSuccessMessage('Thêm đề thi thành công');
        } catch (error) {
            console.log('Có lỗi khi thêm đề thi', error);
        }
    };

    return (
        <>
            <div className="container mx-auto py-6">
                <h2 className="text-center text-blue-500 text-2xl font-semibold mb-8">Thêm Đề Thi</h2>
                <form onSubmit={handleSubmit} autoComplete="off" className="mx-auto max-w-lg p-6 bg-gray-100 rounded-lg shadow-lg">
                    <div className="space-y-4">
                        <div className="form-group">
                            <label htmlFor="exam_name" className="block text-gray-700 font-medium">Tên Đề Thi</label>
                            <input
                                type="text"
                                id="exam_name"
                                name="exam_name"
                                value={examName}
                                onChange={(e) => setExamName(e.target.value)}
                                placeholder="Nhập tên đề thi"
                                className={`form-control w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.examName ? 'border-red-500' : ''}`}
                            />
                            {errors.examName && <p className="text-red-500 text-sm">{errors.examName}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="choose_exam_subject_name" className="block text-gray-700 font-medium">Chọn Môn Thi</label>
                            <select
                                id="choose_exam_subject_name"
                                name="choose_exam_subject_name"
                                value={chooseExamSubjects}
                                onChange={(e) => setChooseExamSubjects(e.target.value)} // Cập nhật giá trị id môn thi đã chọn
                                className={`form-control w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.chooseExamSubjects ? 'border-red-500' : ''}`}
                            >
                                <option value="">Chọn 1 Môn Thi</option>
                                {examSubject.map(examSubject => (
                                    <option key={examSubject.id} value={examSubject.id}>
                                        {examSubject.title}
                                    </option>
                                ))}
                            </select>
                            {errors.chooseExamSubjects && <p className="text-red-500 text-sm">{errors.chooseExamSubjects}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="description" className="block text-gray-700 font-medium">Mô Tả</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Mô tả đề thi"
                                className={`form-control w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.description ? 'border-red-500' : ''}`}
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="question_number" className="block text-gray-700 font-medium">Số Câu Hỏi</label>
                            <input
                                type="number"
                                id="question_number"
                                name="question_number"
                                value={questionNumbers}
                                onChange={(e) => setQuestionNumbers(e.target.value)}
                                placeholder="Nhập số câu hỏi"
                                className={`form-control w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.questionNumbers ? 'border-red-500' : ''}`}
                            />
                            {errors.questionNumbers && <p className="text-red-500 text-sm">{errors.questionNumbers}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="duration" className="block text-gray-700 font-medium">Thời Gian Thi</label>
                            <input
                                type="number"
                                id="duration"
                                name="duration"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="Nhập thời gian thi (phút)"
                                className={`form-control w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.duration ? 'border-red-500' : ''}`}
                            />
                            {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="image" className="block text-gray-700 font-medium">Ảnh Đề Thi</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                                className={`form-control w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.image ? 'border-red-500' : ''}`}
                            />
                            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                        </div>
                    </div>

                    {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}

                    <div className="mt-6">
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Thêm</button>
                    </div>
                </form>
            </div>
        </>
    );
}
