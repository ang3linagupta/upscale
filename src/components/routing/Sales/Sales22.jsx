import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Sales22 = () => {

  const [obj, setObj] = useState({
    dos: "",
    sales: "",
    customer: "",
    email: ""
  })

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setObj((prev) => ({ ...prev, email: storedEmail }));
    }
  }, []);

  function doUpdate(event) {
    var { name, value } = event.target
    setObj({ ...obj, [name]: value })

  }

  async function doSavewithpost() {

    let url = `http://localhost:2004/sales/savesaleswithpost`;
    let resp = await axios.post(url, obj, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

    if (resp.data.status == true)
      alert(resp.data.msg);
    else {
      alert(resp.data.msg);
    }
  }


  return (

    <div className="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-lg border border-yellow-400">
      <h2 className="text-3xl font-extrabold mb-8 text-yellow-600 text-center">Daily Sales</h2>

      <form>
        <div className="mb-6">
          <label className="block text-yellow-700 text-sm font-bold mb-2" htmlFor="date"
          >
            Date
          </label>
          <input
            type="date"
            onChange={doUpdate}
            name="dos"
            required
            className="border border-yellow-700 rounded-lg p-3 w-full bg-yellow-100 focus:outline-none focus:ring-4 focus:ring-yellow-600 shadow-inner transition-transform transform hover:scale-105"

          />
        </div>

        <div className="mb-6">
          <label className="block text-yellow-700 text-sm font-bold mb-2" htmlFor="sales">
            Total Revenue Generated
          </label>
          <input
            type="text"
            onChange={doUpdate}
            name="sales"
            placeholder="Enter Revenue"
            // className="w-full px-4 py-2 border border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
            required
            className="border border-yellow-700 rounded-lg p-3 w-full bg-yellow-100 focus:outline-none focus:ring-4 focus:ring-yellow-600 shadow-inner transition-transform transform hover:scale-105 placeholder-stone-900"

          />
        </div>

        <div className="mb-8">
          <label className="block text-yellow-700 text-sm font-bold mb-2" htmlFor="customer">
            Total Customers Visited
          </label>
          <input
            type="number"
            onChange={doUpdate}
            name="customer"
            placeholder="Enter Customer Count"
            className="border border-yellow-700 rounded-lg p-3 w-full bg-yellow-100 focus:outline-none focus:ring-4 focus:ring-yellow-600 shadow-inner transition-transform transform hover:scale-105 placeholder-stone-900"
            required
          />
        </div>

        <button
          type="button"
          className="w-full bg-yellow-700 text-white py-3 px-6 rounded-lg hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-transform transform hover:scale-105"
          onClick={doSavewithpost}
          // className="bg-yellow-900 text-white px-6 py-3 rounded-lg hover:bg-yellow-800 transition-transform transform hover:scale-105"

        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default Sales22;
