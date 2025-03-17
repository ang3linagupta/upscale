import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [obj, setObj] = useState({ email: "", password: "" });


    function doUpdate(event) {
        const { name, value } = event.target;
        setObj({ ...obj, [name]: value });
    }

    const doSave = async () => {
        try {
            const resp = await axios.post("http://localhost:2004/login/checkuser", obj, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (resp.data.status) {
                alert(resp.data.msg);
                localStorage.setItem('email', obj.email);
            } else {
                alert(resp.data.msg);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed. Please try again.");
        }
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="w-full py-4 px-6 flex items-center justify-between text-black font-semibold text-sm fixed top-0 left-0 right-0 z-50">
                <div className="flex items-center space-x-4 ml-4">
                    <img src="/path-to-your-logo.png" alt="Logo" className="h-8" />
                    <span>McDonald's Franchising</span>
                </div>
                <div className="flex space-x-6 mr-4">
                    <span className="cursor-pointer" onClick={() => navigate('/')}>Home</span>
                </div>
            </div>

            <div className="bg-white w-8/12 shadow-xl rounded-2xl p-12 mt-20">
                <h2 className="text-center text-3xl font-bold text-yellow-700 mb-6">Login</h2>
                <form>
                    <input
                        type="text"
                        name="email"
                        onChange={doUpdate}
                        placeholder="Enter Username"
                        className="border border-yellow-700 rounded-lg p-3 w-full bg-yellow-100 focus:outline-none focus:ring-4 focus:ring-yellow-600 shadow-inner transition-transform transform hover:scale-105 placeholder-yellow-900 my-3"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={doUpdate}
                        placeholder="Enter Password"
                        className="border border-yellow-700 rounded-lg p-3 w-full bg-yellow-100 focus:outline-none focus:ring-4 focus:ring-yellow-600 shadow-inner transition-transform transform hover:scale-105 placeholder-yellow-900 my-3"
                        required
                    />
                    <button
                        type="button"
                        onClick={doSave}
                        className="border border-yellow-700 rounded-lg p-3 w-full bg-yellow-100 focus:outline-none focus:ring-4 focus:ring-yellow-600 shadow-inner transition-transform transform hover:scale-105 placeholder-yellow-900 mt-4"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
