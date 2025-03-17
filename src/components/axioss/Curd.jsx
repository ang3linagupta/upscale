import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Curd = () => {
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const [obj, setObj] = useState({

        txtFName: "",
        txtLName: "",
        email: "",
        txtAdd: "",
        txtExp: "",
        txtYears: "",
        txtLoc: "",
        txtCity: "",
        txtPin: "",
        txtArea: "",
        txtDim: "",
        txtFloor: "",

    })
    function doUpdate(event) {
        var { name, value } = event.target
        setObj({ ...obj, [name]: value })

    }

    async function doSavePost() {
        let url = "http://localhost:2004/applicant/saveuserWithPost";

        let resp = await axios.post(url, obj, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        //alert(JSON.stringify(resp.data)); 
        if (resp.data.status == true)
            alert(resp.data.msg);
        else {
            alert(resp.data.msg);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-full h-[100vh]  ">

            <div className="w-full bg-yellow-500 py-4 px-6 flex items-center justify-between text-black font-semibold text-sm fixed top-0 left-0 right-0 z-50">
                <div className="flex items-center space-x-4 ml-4">
                    <img src="/pictures/logo.png" alt="Logo" className="h-8" />
                    <span>UpScale</span>
                </div>


                {/* Navbar */}
                <div className="flex space-x-6 mr-4">

                    <span className="cursor-pointer" onClick={() => navigate('/')}>
                        Home
                    </span>

                </div>
            </div>



            <div className="w-full mt-20 xl:max-w-3xl">

                <div className=" flex flex-col items-end justify-start  overflow-hidden mb-2 xl:max-w-3xl w-full">
                    <div className="flex">
                        <h3 className="text-white">Dark Mode : &nbsp;</h3>
                        <label class="inline-flex relative items-center mr-5 cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={darkMode}
                                readOnly
                            />
                            <div
                                onClick={() => {
                                    setDarkMode(!darkMode);
                                }}
                                className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                            ></div>
                        </label>
                    </div>
                </div>
                <div
                    className={`xl:max-w-3xl ${darkMode ? "bg-black" : "bg-white"
                        }  w-full p-5 sm:p-10 rounded-md`}
                >
                    <h1
                        className={`text-center text-xl sm:text-3xl font-sans${darkMode ? "text-white" : "text-black"
                            }`}
                    >

                    </h1>
                    <div className="w-full mt-8">
                        <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    type="text"
                                    placeholder="First name"
                                    name="txtFName"
                                    onChange={doUpdate}
                                />
                                <input
                                    className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    type="text"
                                    placeholder="Last name"
                                    name="txtLName"
                                    onChange={doUpdate}
                                />
                            </div>
                            <input
                                className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                    ? "bg-[#302E30] text-white focus:border-white"
                                    : "bg-gray-100 text-black focus:border-black"
                                    }`}
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={doUpdate}
                            />
                            <input
                                className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                    ? "bg-[#302E30] text-white focus:border-white"
                                    : "bg-gray-100 text-black focus:border-black"
                                    }`}
                                type="text"
                                placeholder="Residential Address"
                                name="txtAdd"
                                onChange={doUpdate}
                            />
                            <hr />
                            {/* ******************************************************************************************************************************************************************************* */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    type="text"
                                    placeholder="Business Experience"
                                    name="txtExp"
                                    onChange={doUpdate}
                                />
                                <input
                                    className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    type="text"
                                    placeholder="Years in Business"
                                    name="txtYears"
                                    onChange={doUpdate}
                                />
                            </div>
                            <hr />
                            {/* ******************************************************************************************************************************************************************************* */}

                            <input
                                className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                    ? "bg-[#302E30] text-white focus:border-white"
                                    : "bg-gray-100 text-black focus:border-black"
                                    }`}
                                type="text"
                                placeholder="Site Location"
                                name="txtLoc"
                                onChange={doUpdate}
                            />


                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    type="text"
                                    placeholder="City"
                                    name="txtCity"
                                    onChange={doUpdate}
                                />
                                <input
                                    className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    type="text"
                                    placeholder="Pincode"
                                    name="txtPin"
                                    onChange={doUpdate}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    type="text"
                                    placeholder="Area (in sq. ft.)"
                                    name="txtArea"
                                    onChange={doUpdate}
                                />
                                <input
                                    className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    type="text"
                                    placeholder="Dimensions"
                                    name="txtDim"
                                    onChange={doUpdate}
                                />

                                <input
                                    className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    type="text"
                                    placeholder="Floor"
                                    name="txtFloor"
                                    onChange={doUpdate}
                                />

                                <hr />

                            </div>

                            <button
                                className="w-full bg-yellow-700 text-white py-3 px-6 rounded-lg hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-transform transform hover:scale-105"

                                onClick={doSavePost}>

                                <center>
                                    <span className="ml-3">Submit</span>
                                </center>

                            </button>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
export default Curd;
