import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SalesHistory() {
    const [dateRanges, setDateRanges] = useState([{ startDate: '', endDate: '', salesAmount: null }]);
    const [salesData, setSalesData] = useState([]);
    const [totalSalesAmount, setTotalSalesAmount] = useState(0);
    const [email, setemail] = useState("");

    useEffect(() => {

        const storedemail = localStorage.getItem('email');
        if (storedemail) {
            setemail(storedemail);
        }

        async function fetchSalesData() {
            try {
                const response = await axios.get('http://localhost:2004/sales/getallhistory');
                console.log('Fetched Sales Data:', response.data);

                if (Array.isArray(response.data)) {
                    // Filter sales data to only include records for the logged-in email
                    const userSalesData = response.data.filter(sales => sales.email === storedemail);
                    setSalesData(userSalesData);
                } else {
                    console.error('Expected an array but received:', response.data);
                    setSalesData([]);
                }
            } catch (error) {
                console.error('Error fetching sales data:', error);
                setSalesData([]);
            }
        }
        fetchSalesData();
    }, []);

    const handleDateChange = (index, field, value) => {
        const newRanges = [...dateRanges];
        newRanges[index][field] = value;
        setDateRanges(newRanges);
    };

    const calculateSales = (index) => {
        const { startDate, endDate } = dateRanges[index];

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);

            const filteredSales = salesData.filter((sales) => {
                const saleDate = new Date(sales.dos);
                saleDate.setHours(0, 0, 0, 0);
                return saleDate >= start && saleDate <= end;
            });

            const totalSales = filteredSales.reduce((sum, sales) => {
                const saleAmount = Number(sales.sales);
                return !isNaN(saleAmount) ? sum + saleAmount : sum;
            }, 0);

            const newRanges = [...dateRanges];
            newRanges[index].salesAmount = totalSales;
            setDateRanges(newRanges);

            const sumOfAllSales = newRanges.reduce((sum, range) => sum + (range.salesAmount || 0), 0);
            setTotalSalesAmount(sumOfAllSales);
        }
    };

    const addDateRange = () => {
        setDateRanges([...dateRanges, { startDate: '', endDate: '', salesAmount: null }]);
    };

    return (
        <div className="p-8 bg-white shadow-xl rounded-3xl max-w-3xl mx-auto mt-12 ">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-yellow-600">Sales History</h2>

        <div className="text-center mb-8">
            <span className="font-semibold text-yellow-500">Logged in as:</span>
            <span className="text-yellow-800 font-extrabold ml-2">{email}</span>
        </div>

        <div className="space-y-8">
            {dateRanges.map((range, index) => (
                <div key={index} className="flex flex-col space-y-6 border-b border-yellow-700 pb-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-yellow-800 font-medium block">Start Date:</label>
                            <input
                                type="date"
                                value={range.startDate}
                                onChange={(e) => handleDateChange(index, 'startDate', e.target.value)}
                                className="border border-yellow-800 rounded-lg p-3 w-full bg-yellow-100 focus:outline-none focus:ring-4 focus:ring-yellow-600 shadow-inner transition-transform transform hover:scale-105"
                            />
                        </div>

                        <div>
                            <label className="text-yellow-800 font-medium block">End Date:</label>
                            <input
                                type="date"
                                value={range.endDate}
                                onChange={(e) => handleDateChange(index, 'endDate', e.target.value)}
                                className="border border-yellow-700 rounded-lg p-3 w-full bg-yellow-100 focus:outline-none focus:ring-4 focus:ring-yellow-600 shadow-inner transition-transform transform hover:scale-105"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-yellow-800 font-medium block">Sales Amount:</label>
                        <input
                            type="text"
                            value={range.salesAmount !== null ? range.salesAmount : ''}
                            readOnly
                            className="border border-yellow-700 rounded-lg p-3 w-full"
                        />
                    </div>

                    <button
                        onClick={() => calculateSales(index)}
                        className="bg-yellow-900 text-white px-6 py-3 rounded-lg hover:bg-yellow-800 transition-transform transform hover:scale-105"
                    >
                        Calculate Sales
                    </button>
                </div>
            ))}
        </div>

        <div className="flex justify-between items-center mt-10">
            <button
                onClick={addDateRange}
                className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-transform transform hover:scale-105"
            >
                + Add Date Range
            </button>

            <div className="text-xl text-yellow-500">
                    Total Sales: <span className="text-gray-900">{totalSalesAmount}</span>
                </div>
        </div>
    </div>
    );
}

export default SalesHistory;

