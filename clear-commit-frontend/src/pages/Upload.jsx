import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../api.js';
import { Link } from 'react-router-dom';

export const CSSCleanerApp = () => {
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [fileInfo, setFileInfo] = useState({
        filename: '',
        size: 0,
    });
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length) {
            setSelectedFile(files[0]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setUploadStatus('Пожалуйста, выберите файл');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            setUploadStatus('Загрузка...');
            const response = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setUploadStatus('success');
            setFileInfo({
                filename: response.data.filename,
                size: selectedFile.size
            });
        } catch (error) {
            setUploadStatus('Ошибка при загрузке файла');
            console.error('Ошибка:', error);
        }
    };

    const handleFileClear = async () => {
        console.log(fileInfo.filename)
        const dataFile = {fileName: fileInfo.filename};
        try{
            const response = await api.post('/clear_file', dataFile);
            const data = response.data;
            console.log(data);
            if(data.success){
                window.open(`${VITE_API_URL}/${data.path}`, '_blank');
            }
        }catch(error){
            console.error('error:', error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex  flex-col items-center justify-center p-4"
        >
            <Link to="/home" className="mb-4 inline-block text-indigo-600 hover:text-indigo-800">
                ← Back to Dashboard
            </Link>
            <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700/50 backdrop-blur-xl">
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-3xl font-bold text-white mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                >
                    CSS Cleaner
                </motion.h1>

                <form onSubmit={handleSubmit}>
                    <div
                        className={`border-2 border-dashed rounded-xl p-6 mb-6 transition-colors duration-300 ${
                            isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".css"
                            className="block w-full text-sm text-gray-300
                                file:mr-4 file:py-3 file:px-6
                                file:rounded-xl file:border-0
                                file:text-sm file:font-medium
                                file:bg-gradient-to-r file:from-blue-600 file:to-blue-700
                                file:text-white
                                hover:file:from-blue-700 hover:file:to-blue-800
                                file:transition-all file:duration-300
                                file:cursor-pointer"
                        />
                        <p className="text-gray-400 text-sm mt-2 text-center">
                            или перетащите файл сюда
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl
                            hover:from-blue-700 hover:to-blue-800
                            transition duration-300
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            font-medium shadow-lg shadow-blue-500/30"
                    >
                        Загрузить файл
                    </motion.button>
                </form>

                <AnimatePresence>
                    {uploadStatus === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-6 p-4 bg-gray-700/50 rounded-xl border border-gray-600"
                        >
                            <p className="text-emerald-400 font-medium">Файл успешно загружен</p>
                            <p className="text-gray-300 text-sm mt-2">Имя файла: {fileInfo.filename}</p>
                            <p className="text-gray-300 text-sm">Размер: {fileInfo.size} байт</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.open(`http://localhost:8000/uploads/${fileInfo.filename}`, '_blank')}
                                className="text-blue-400 hover:text-blue-300 mt-3 underline decoration-2 underline-offset-4"
                            >
                                Открыть файл
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleFileClear}
                                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl
                                    hover:from-purple-700 hover:to-purple-800
                                    transition duration-300
                                    focus:outline-none focus:ring-2 focus:ring-purple-500
                                    font-medium shadow-lg shadow-purple-500/30"
                            >
                                Очистить файл
                            </motion.button>
                        </motion.div>
                    )}
                    {uploadStatus && uploadStatus !== 'success' && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 text-sm text-red-400 text-center"
                        >
                            {uploadStatus}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};