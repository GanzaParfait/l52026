import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Reports() {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchReport = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:5000/api/report/products");
            setReport(res.data);
            setLoading(false);
        } catch (err) {
            toast.error("Failed to fetch report's details, Please try again.");
        }
    }

    useEffect(() => {
        fetchReport();
    }, []);

    return (
        <>
            <div className="flex justify-between p-2 mb-4">
                <div className="left">
                    <h1 className="text-[2rem] font-bold">Reports</h1>
                    <p>Here you can view various reports related to your inventory and sales.</p>
                </div>
                {/* Refresh button */}
                <button
                    onClick={fetchReport}
                    className="h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                >
                    Refresh
                </button>
            </div>

            {/* Cards */}

            {loading ? (
                <p className="text-center p-4">Loading report...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                    <div className="bg-white p-4 shadow rounded">
                        <h2 className="text-lg font-bold mb-2">Total Products</h2>
                        <p>{report?.totalProducts}</p>
                    </div>
                    <div className="bg-white p-4 shadow rounded">
                        <h2 className="text-lg font-bold mb-2">Total Value</h2>
                        <p>{report?.totalValue?.toLocaleString()} RWF</p>
                    </div>
                    <div className="bg-white p-4 shadow rounded">
                        <h2 className="text-lg font-bold mb-2">Total Profit</h2>
                        <p>{report?.totalProfit?.toLocaleString()} RWF</p>
                    </div>
                    <div className="bg-white p-4 shadow rounded">
                        <h2 className="text-lg font-bold mb-2">New Products</h2>
                        <p>{report?.newProducts}</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Reports