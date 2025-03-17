import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import emailjs from 'emailjs-com';
import { nanoid } from 'nanoid';
import { useNavigate } from "react-router-dom";

const ApplicantsTable = () => {

    const [data, setData] = useState([]);
    const [applications, setApplications] = useState([]);
    const [filterApplications, setFilterApplications] = useState([]);
    const [rowsLimit] = useState(3);
    const [rowsToShow, setRowsToShow] = useState([]);
    const [customPagination, setCustomPagination] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [filter, setFilter] = useState("3");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("all");
    const tabRefs = useRef({});
    const navigate = useNavigate();

    useEffect(() => {
        getApplications();
    }, [filter, activeTab]);

    useEffect(() => {
        setRowsToShow(filterApplications.slice(0, rowsLimit));
        setTotalPage(Math.ceil(filterApplications.length / rowsLimit));
    }, [filterApplications]);

    const underlineStyle = {
        width: tabRefs.current[activeTab]?.offsetWidth || 0,
        left: tabRefs.current[activeTab]?.offsetLeft || 0,
        backgroundColor: "#fbbf24",
        transition: "all 0.3s ease",
    };


    const getLineText = (tab) => {
        return tab.charAt(0).toUpperCase() + tab.slice(1);
    };


    async function getApplications() {
        setLoading(true);
        let url = "http://localhost:2004/admin/showApplications";
        try {
            const response = await axios.post(url);
            let applicationsData = response.data;

            if (activeTab === "rejected") {
                applicationsData = applicationsData.filter((application) => application.status === -1);
            } else if (activeTab === "accepted") {
                applicationsData = applicationsData.filter((application) => application.status === 1);
            } else if (activeTab === "franchised") {
                applicationsData = applicationsData.filter((application) => application.status === 2);
            }


            setFilterApplications(applicationsData);
            setApplications(applicationsData);
            setRowsToShow(applicationsData.slice(0, rowsLimit));
            setTotalPage(Math.ceil(applicationsData.length / rowsLimit));
        } catch (error) {
            setError("Error fetching applications: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    const getTabText = (tab) => {

        return tab.charAt(0).toUpperCase() + tab.slice(1);
        switch (tab) {
            case "accepted": return "Accepted";
            case "rejected": return "Rejected";
            case "franchised": return "Franchised";
            case "all": return "All";
            default: return "";
        }
    };

    const nextPage = () => {
        const startIndex = rowsLimit * (currentPage + 1);
        const endIndex = startIndex + rowsLimit;
        const newArray = filterApplications.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        setCurrentPage(currentPage + 1);
    };

    const changePage = (value) => {
        const startIndex = value * rowsLimit;
        const endIndex = startIndex + rowsLimit;
        const newArray = filterApplications.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        setCurrentPage(value);
    };

    const previousPage = () => {
        const startIndex = (currentPage - 1) * rowsLimit;
        const endIndex = startIndex + rowsLimit;
        const newArray = filterApplications.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(0);
        }
    };

    useMemo(() => {
        setCustomPagination(
            Array(Math.ceil(filterApplications?.length / rowsLimit)).fill(null)
        );
    }, [filterApplications]);

    async function doApprove(email) {
        let obj = { email: email };
        let url = "http://localhost:2004/admin/approveApplication";
        try {
            const resp = await axios.post(url, obj, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });
            alert(resp.data);
            getApplications();
        } catch (error) {
            alert("Error approving application: " + error.message);
        }
    }

    async function doDecline(email) {
        let obj = { email: email };
        let url = "http://localhost:2004/admin/declineApplication";
        try {
            const resp = await axios.post(url, obj, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });
            alert(resp.data);
            getApplications();
        } catch (error) {
            alert("Error declining application: " + error.message);
        }
    }

    async function doFranchise(email) {
        const password = nanoid(10); // Generate a random password
        let obj = { email: email, password: password };
        let url = "http://localhost:2004/admin/allotFranchise";

        try {
            const resp = await axios.post(url, obj, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });

            if (resp.data) {
                // Prepare email template parameters
                const templateParams = {
                    email: email,
                    // id: email,
                    password: password
                };

                console.log('Sending email with params:', templateParams);

                // Send email using EmailJS
                emailjs.send(
                    'service_5006yfe',
                    'template_x5gv08q',
                    templateParams,
                    '_DdB0PFjuYZ_v7JiP'
                )
                    .then((result) => {
                        alert("Mail sent to the user");
                        console.log('Email successfully sent!', result.text);
                        getApplications(); // Refresh the applications list
                    })
                    .catch((error) => {
                        console.error('Error sending email:', error.text);
                        alert("Error sending email to user");
                    });

                const saveUrl = "http://localhost:2004/login/saveFranchise";
                await axios.post(saveUrl, obj, {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },

                });

                alert(resp.data);
                getApplications();
            }
        } catch (error) {
            alert("Error franchising application: " + error.message);
        }
    }

    return (
        <div className="min-h-screen h-full bg-white pt-32 pb-14">
            <div className="w-full bg-yellow-500 py-4 px-6 flex items-center justify-between text-black font-semibold text-sm fixed top-0 left-0 right-0 z-50">
                <div className="flex items-center space-x-4 ml-4">
                    <img src="/pictures/logo.png" alt="Logo" className="h-8" />
                    <span>UpScale</span>
                </div>
                <div className="flex space-x-6 mr-4">
                    <span className="cursor-pointer" onClick={() => navigate('/')}>
                        Home
                    </span>
                </div>
            </div>
            <h1 className="text-2xl  bg-yellow-500 p-4 fixed text-yellow-800 font-extrabold top-20 left-0 right-0 z-30">Applications</h1>


            {/* Tabs */}
            {/* <div className="relative flex mb-6 overflow-hidden mt-16">
                <div className="flex  rounded-xl p-2 w-full fixed  top-40 left-0 right-0 z-50"> */}

            <div className="relative flex mb-6 mt-16 z-[60]">
                <div className="flex rounded-xl p-2 w-full fixed top-40 left-0 right-0 z-[60] bg-white shadow-md">

                    {['all', 'accepted', 'rejected', 'franchised'].map(tab => (
                        <div
                            key={tab}
                            ref={(el) => tabRefs.current[tab] = el}
                            onClick={() => setActiveTab(tab)}
                            className={`tab-${tab} text-center px-4 py-3 cursor-pointer text-lg font-semibold relative z-10 ${activeTab === tab ? 'text-amber-400' : 'text-black'}`}
                        >
                            {getLineText(tab)}
                        </div>
                    ))}
                    <div

                        className="absolute bottom-0 h-1" style={underlineStyle} />
                    <hr className="absolute bottom-0 left-0 right-0 border-gray-300" />
                    <hr />                </div>
            </div>
            <div className="w-full max-w-[90rem] mx-auto">
                {/* <div className="w-full overflow-x-scroll md:overflow-auto mt-6"> */}
                <div className="w-full overflow-x-scroll md:overflow-auto mt-[120px]">




                    <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border max-h-[500px] ">
                        <thead className="rounded-lg text-base text-white font-semibold w-full z-[50] ">
                            <tr className="bg-yellow-500 top-60 z-[50]">

                                {/* <thead className="rounded-lg text-base text-white font-semibold w-full">
                            <tr className="bg-yellow-500 top-60">
                                 */}
                                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">Sr. No.</th>
                                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">Status</th>
                                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">Email ID</th>
                                <th className="py-3 px-3 justify-center gap-1 text-[#212B36] sm:text-base font-bold whitespace-nowrap">Site Address</th>
                                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">City</th>
                                <th className="py-3 px-2 text-[#212B36] sm:text-base font-bold whitespace-nowrap">Area in sq.ft (floor)</th>
                                {activeTab === 'all' && <th className="py-3 px-3 text-black sm:text-base font-bold whitespace-nowrap text-center">Actions</th>}
                                {activeTab === 'rejected' && <th className="py-3 px-3 text-black sm:text-base font-bold whitespace-nowrap text-center">Actions</th>}
                                {activeTab === 'accepted' && <th className="py-3 px-3 text-black sm:text-base font-bold whitespace-nowrap text-center">Actions</th>}

                            </tr>
                        </thead>
                        <tbody>
                            {rowsToShow?.map((data, index) => (
                                <tr className={`${index % 2 === 0 ? "bg-white" : "bg-[#222E3A]/[6%]"}`} key={index}>
                                    <td className={`py-2 px-3 font-normal text-base ${index === 0 ? "border-t-2 border-black" : "border-t"} whitespace-nowrap`}>
                                        {currentPage * rowsLimit + index + 1}
                                    </td>
                                    <td className={`py-2 px-3 font-normal text-base ${index === 0 ? "border-t-2 border-black" : "border-t"} whitespace-nowrap`}>
                                        {data.status}
                                    </td>
                                    <td className={`py-2 px-3 font-normal text-base ${index === 0 ? "border-t-2 border-black" : "border-t"} whitespace-nowrap`}>
                                        {data.email}
                                    </td>
                                    <td className={`py-2 px-3 font-normal text-base ${index === 0 ? "border-t-2 border-black" : "border-t"} whitespace-nowrap`}>
                                        {data.txtLoc}
                                    </td>
                                    <td className={`py-2 px-3 text-base font-normal ${index === 0 ? "border-t-2 border-black" : "border-t"} whitespace-nowrap`}>
                                        {data.txtCity}
                                    </td>
                                    <td className={`py-2 px-2 text-base font-normal ${index === 0 ? "border-t-2 border-black" : "border-t"} min-w-[250px]`}>
                                        {data.txtArea} ({data.txtFloor})
                                    </td>

                                    {/*  */}
                                    {/* <td className={`py-5 px-4 text-base font-normal ${index === 0 ? "border-t-2 border-black" : "border-t"}`}>
                                        <div className="flex gap-2">
                                            {data.status === 0 && (
                                                <>
                                                    <button
                                                        className="py-3 rounded-full border-2 bg-yellow-600 hover:bg-yellow-700 px-6 text-xs font-medium uppercase leading-tight text-white"
                                                        onClick={() => doApprove(data.email)}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="py-3 rounded-full border-2 bg-red-600 hover:bg-red-700 px-6 text-xs font-medium uppercase leading-tight text-white"
                                                        onClick={() => doDecline(data.email)}
                                                    >
                                                        Decline
                                                    </button>
                                                    <button
                                                        className="py-3 rounded-full border-2 bg-green-600 hover:bg-green-700 px-6 text-xs font-medium uppercase leading-tight text-white"
                                                        onClick={() => doFranchise(data.email)}
                                                    >
                                                        Franchise
                                                    </button>
                                                </>
                                            )}
                                            {data.status === 1 && (
                                                <div className="flex gap-2">
                                                <button
                                                    className="py-3 rounded-full border-2 bg-green-600 hover:bg-green-700 px-6 text-xs font-medium uppercase leading-tight text-white"
                                                    onClick={() => doFranchise(data.email)}
                                                >
                                                    Franchise
                                                </button>
                                                <button
                                                    className="py-3 rounded-full border-2 bg-red-600 hover:bg-red-700 px-6 text-xs font-medium uppercase leading-tight text-white"
                                                    onClick={() => doFranchise(data.email)}
                                                >
                                                    Decline
                                                </button>
                                                </div>
                                                
                                            )}
                                            {data.status === -1 && (
                                                <div className="flex gap-2">
                                                <button
                                                        className="py-3 rounded-full border-2 bg-yellow-600 hover:bg-yellow-700 px-6 text-xs font-medium uppercase leading-tight text-white"
                                                        onClick={() => doApprove(data.email)}
                                                    >
                                                        Approve
                                                    </button>
                                                </div>
                                                
                                            )}
                                        </div>
                                    </td> */}

                                    {activeTab === 'all' && (
                                        <td className={`py-5 px-4 text-base font-normal ${index === 0 ? "border-t-2 border-black" : "border-t"}`}>
                                            <div className="flex gap-2">
                                                <button className="py-3 rounded-full border-2 bg-yellow-600 hover:bg-yellow-700 px-6 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none active:shadow-lg" onClick={() => doApprove(data.email)}>
                                                    Approve
                                                </button>
                                                <button className="py-3 rounded-full border-2 bg-red-600 hover:bg-red-700 px-6 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none active:shadow-lg" onClick={() => doDecline(data.email)}>
                                                    Decline
                                                </button>
                                                <button className="py-3 rounded-full border-2 bg-green-600 hover:bg-green-700 px-6 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none active:shadow-lg" onClick={() => doFranchise(data.email)}>
                                                    Franchise
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                    {activeTab === 'rejected' && (
                                        <td className={`py-5 px-4 text-base font-normal ${index === 0 ? "border-t-2 border-black" : "border-t"}`}>
                                            <div className="flex gap-2">
                                                <button className="py-3 rounded-full border-2 bg-yellow-600 hover:bg-yellow-700 px-6 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none active:shadow-lg" onClick={() => doApprove(data.email)}>
                                                    Approve
                                                </button>

                                            </div>
                                        </td>
                                    )}
                                    {activeTab === 'accepted' && (
                                        <td className={`py-5 px-4 text-base font-normal ${index === 0 ? "border-t-2 border-black" : "border-t"}`}>
                                            <div className="flex gap-2">

                                                <button className="py-3 rounded-full border-2 bg-red-600 hover:bg-red-700 px-6 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none active:shadow-lg" onClick={() => doDecline(data.email)}>
                                                    Decline
                                                </button>
                                                <button className="py-3 rounded-full border-2 bg-green-600 hover:bg-green-700 px-6 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none active:shadow-lg" onClick={() => doFranchise(data.email)}>
                                                    Franchise
                                                </button>
                                            </div>
                                        </td>
                                    )}

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-full flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
                    <div className="text-lg">
                        Showing {currentPage === 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
                        {currentPage === totalPage - 1 ? applications?.length : (currentPage + 1) * rowsLimit}{" "}
                        of {applications?.length} entries
                    </div>
                    <div className="flex">
                        <ul className="flex justify-center items-center gap-x-[10px] z-30" role="navigation" aria-label="Pagination">
                            <li className={`prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${currentPage === 0 ? "bg-[#cccccc] pointer-events-none" : "cursor-pointer"}`} onClick={previousPage}>
                                <img src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg" />
                            </li>
                            {customPagination?.map((data, index) => (
                                <li className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${currentPage === index ? "text-blue-600 border-sky-500" : "border-[#E4E4EB]"}`} onClick={() => changePage(index)} key={index}>
                                    {index + 1}
                                </li>
                            ))}
                            <li className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${currentPage === totalPage - 1 ? "bg-[#cccccc] pointer-events-none" : "cursor-pointer"}`} onClick={nextPage}>
                                <img src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicantsTable;
