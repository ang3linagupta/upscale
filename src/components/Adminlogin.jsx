import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:2004/adminlogin/login', { email, password });
            alert(response.data.message);

            navigate('/applications');
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="w-full bg-yellow-500 py-4 px-6 flex items-center justify-between text-black font-semibold text-sm fixed top-0 left-0 right-0 z-50">
                <div className="flex items-center space-x-4 ml-4">
                    <img src="/pictures/logo.png" alt="Logo" className="h-8" />
                    <span>UpScale</span>
                </div>
                <div className="flex space-x-6 mr-4">
                    <span className="cursor-pointer" onClick={() => navigate('/')}>Home</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md'>
            <h2 className="text-center text-3xl font-bold text-yellow-700 mb-6">Admin Login</h2>
                {error && <p className='text-red-500'>{error}</p>}

                <input
                    className="border border-yellow-700 rounded-lg p-3 w-full bg-yellow-100 focus:outline-none focus:ring-4 focus:ring-yellow-600 shadow-inner transition-transform transform hover:scale-105 placeholder-yellow-900 my-3"

                    type='text'
                    placeholder='Admin email'
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required />

                <input
                    className="border border-yellow-700 rounded-lg p-3 w-full bg-yellow-100 focus:outline-none focus:ring-4 focus:ring-yellow-600 shadow-inner transition-transform transform hover:scale-105 placeholder-yellow-900 my-3"

                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                <button
                    className="w-full bg-yellow-700 text-white py-3 px-6 rounded-lg hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-transform transform hover:scale-105"
                    type='submit'>Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
