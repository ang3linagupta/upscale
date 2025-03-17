import React, { useState, useEffect } from "react";
import axios from "axios";

function Settings({ onClose }) {
    const [email, setemail] = useState(localStorage.getItem("email") || "");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!email) {
            setMessage("⚠️ User ID not found. Please log in.");
        }
    }, [email]);

    const handleChangePassword = async () => {
        console.log("🔍 Sending data:", {
            email,
            oldPassword,
            newPassword,
        });

        if (!email || !oldPassword || !newPassword || !confirmPassword) {
            setMessage("⚠️ Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:2004/login/updatepassword",
                {
                    email,
                    oldPassword,
                    newPassword,
                },
                {
                    headers: { "Content-Type": 'application/json' },
                }
            );

            console.log("Response:", response.data);
            setMessage("Password updated successfully!");

        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setMessage("Error updating password. Try again.");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-lg border border-yellow-500">
            <h2 className="text-3xl font-extrabold mb-8 text-yellow-600 text-center">Update Password</h2>

            <p className="text-yellow-500 font-semibold ml-2 text-center">
                Logged in as: <span className="text-yellow-800 font-extrabold">{email}</span>
            </p>
            <br />

            <div className="mb-6">
                <label className="block text-yellow-700 text-sm font-bold mb-2">Old Password:</label>
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="border border-yellow-700 rounded-lg p-3 w-full bg-yellow-100 focus:outline-none focus:ring-4 focus:ring-yellow-600 shadow-inner transition-transform transform hover:scale-105 placeholder-stone-900"
                    placeholder="Enter Old Password"
                />
            </div>

            <div className="mb-6">
                <label className="block text-yellow-700 text-sm font-bold mb-2" htmlFor="newPassword">New Password</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border border-yellow-700 rounded-lg p-3 w-full bg-yellow-100 focus:outline-none focus:ring-4 focus:ring-yellow-600 shadow-inner transition-transform transform hover:scale-105 placeholder-stone-900"
                    placeholder="Enter New Password"

                />
            </div>

            <div className="mb-8">
                <label className="block text-yellow-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm New Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm New Password"
                    className="border border-yellow-700 rounded-lg p-3 w-full bg-yellow-100 focus:outline-none focus:ring-4 focus:ring-yellow-600 shadow-inner transition-transform transform hover:scale-105 placeholder-stone-900"

                />
            </div>

            <button
                onClick={handleChangePassword}
                className="w-full bg-yellow-700 text-white py-3 px-6 rounded-lg hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-transform transform hover:scale-105"
            >
                Update Password
            </button>

            {message && <p className="mt-6 text-center font-semibold text-yellow-800">{message}</p>}
        </div>
    );
}

export default Settings;
