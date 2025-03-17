import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from "recharts";

const Charts = () => {
    const [email, setEmail] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [salesData, setSalesData] = useState([]);
    const [monthlySalesData, setMonthlySalesData] = useState([]);
    const [monthlyCustomerData, setMonthlyCustomerData] = useState([]);

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    useEffect(() => {
        if (email && startDate && endDate) {
            fetchSalesData();
        }
    }, [email, startDate, endDate]);

    const fetchSalesData = async () => {
        if (!email) {
            console.warn("Email not set yet. Waiting before fetching sales data.");
            return;
        }

        if (!startDate || !endDate) {
            alert("Please select a start and end date.");
            return;
        }

        try {
            const response = await axios.get("http://localhost:2004/sales/charts", {
                params: { email, startDate, endDate },
            });

            console.log("Fetched Sales Data:", response.data);

            if (Array.isArray(response.data) && response.data.length > 0) {
                const formattedData = response.data.map(item => ({
                    date: item.date,
                    sales: item.sales || 0,
                    customer: item.customer || 0
                }));

                setSalesData(formattedData);

                const monthlySales = response.data.reduce((acc, item) => {
                    const month = new Date(item.date).toLocaleString('default', { month: 'long' });
                    acc[month] = (acc[month] || 0) + (item.sales || 0);
                    return acc;
                }, {});

                const monthlyCustomers = response.data.reduce((acc, item) => {
                    const month = new Date(item.date).toLocaleString('default', { month: 'long' });
                    acc[month] = (acc[month] || 0) + (item.customer || 0);
                    return acc;
                }, {});

                const pieChartData = Object.entries(monthlySales).map(([month, value]) => ({
                    name: month,
                    value
                }));

                const barChartData = Object.entries(monthlyCustomers).map(([month, value]) => ({
                    name: month,
                    value
                }));

                setMonthlySalesData(pieChartData);
                setMonthlyCustomerData(barChartData);

            } else {
                setSalesData([]);
                setMonthlySalesData([]);
                setMonthlyCustomerData([]);
                console.warn("No sales data found for this Email and date range.");
            }
        } catch (error) {
            console.error("Error fetching sales data:", error);
            setSalesData([]);
            setMonthlySalesData([]);
            setMonthlyCustomerData([]);
        }
    };

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
        
        <div className="p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-extrabold mb-8 text-center text-yellow-600">Sales Data Chart</h2>

            <div className="text-center mb-6">
                <label className="mr-4 text-yellow-800 ">Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    className="border text-yellow-800 rounded-md p-2 bg-yellow-100 focus:outline-none focus:ring-4 focus:ring-yellow-600 shadow-inner transition-transform transform hover:scale-105"
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <label className="ml-8 mr-4 text-yellow-800">End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    className="border text-yellow-800 rounded-md p-2 bg-yellow-100 focus:outline-none focus:ring-4 focus:ring-yellow-600 shadow-inner transition-transform transform hover:scale-105"
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            <ResponsiveContainer width="100%" height={400}>
                {salesData.length > 0 ? (
                    <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="sales" stroke="#F59E0B" />
                    </LineChart>
                ) : (
                    <p className="text-center text-yellow-500">No sales data available</p>
                )}
            </ResponsiveContainer>

            <div className="flex flex-col items-center gap-8 mt-8">
                <div className="border border-yellow-500 rounded-lg p-6 w-full md:w-3/4">
                    <h3 className="text-xl font-bold text-center text-yellow-500">Monthly Sales Distribution</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={monthlySalesData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                label
                            >
                                {monthlySalesData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="border border-yellow-500 rounded-lg p-6 w-full md:w-3/4">
                    <h3 className="text-xl font-bold text-center text-yellow-500">Monthly Customer Distribution</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={monthlyCustomerData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#F59E0B" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Charts;
