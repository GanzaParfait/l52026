import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Reports() {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // ✅ ONE FUNCTION FOR ALL (default + filter)
    const fetchReport = async (filters = {}) => {
        try {
            setLoading(true);

            const res = await axios.get(
                "http://localhost:5000/api/report/products",
                { params: filters }
            );

            setReport(res.data);
        } catch (err) {
            toast.error("Failed to fetch report");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Filter handler
    const handleFilter = () => {
        if (!startDate || !endDate) {
            toast.error("Please select both dates");
            return;
        }

        fetchReport({ startDate, endDate });
    };

    // ✅ Reset handler
    const handleReset = () => {
        setStartDate("");
        setEndDate("");
        fetchReport();
    };

    // ✅ Load all products on page load
    useEffect(() => {
        fetchReport();
    }, []);

    return (
        <>
            {/* HEADER */}
            <div className="flex justify-between items-center mb-5">
                <div>
                    <h1 className="text-2xl font-bold">Reports</h1>
                    <p className="text-gray-600">
                        View inventory and sales reports
                    </p>
                </div>

                <button
                    onClick={() => fetchReport()}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Refresh
                </button>
            </div>

            {/* FILTER */}
            <div className="flex flex-wrap gap-2 mb-5">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border p-2 rounded"
                />

                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border p-2 rounded"
                />

                <button
                    onClick={handleFilter}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Filter
                </button>

                <button
                    onClick={handleReset}
                    className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
                >
                    Reset
                </button>

                <button
                    onClick={() => window.print()}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                    Print
                </button>
            </div>

            {/* CARDS */}
            {loading ? (
                <div className="text-center py-10">Loading report...</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
                        <div className="bg-white p-4 shadow rounded">
                            <h2 className="font-bold">Total Products</h2>
                            <p>{report?.totalProducts || 0}</p>
                        </div>

                        <div className="bg-white p-4 shadow rounded">
                            <h2 className="font-bold">Total Value</h2>
                            <p>
                                {report?.totalValue
                                    ? report.totalValue.toLocaleString()
                                    : 0}{" "}
                                RWF
                            </p>
                        </div>

                        <div className="bg-white p-4 shadow rounded">
                            <h2 className="font-bold">Total Profit</h2>
                            <p>
                                {report?.totalProfit
                                    ? report.totalProfit.toLocaleString()
                                    : 0}{" "}
                                RWF
                            </p>
                        </div>

                        <div className="bg-white p-4 shadow rounded">
                            <h2 className="font-bold">New Products</h2>
                            <p>{report?.newProducts || 0}</p>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="bg-white shadow rounded overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-900 text-white text-left">
                                <tr>
                                    <th className="p-3">#</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Cost</th>
                                    <th className="p-3">Price</th>
                                    <th className="p-3">Qty</th>
                                    <th className="p-3">Date</th>
                                    <th className="p-3">Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {report?.products?.length > 0 ? (
                                    report.products.map((p, i) => (
                                        <tr key={p._id} className="border-b hover:bg-gray-50">
                                            <td className="p-3">{i + 1}</td>
                                            <td className="p-3">{p.name}</td>
                                            <td className="p-3">
                                                {Number(p.cost).toLocaleString()} RWF
                                            </td>
                                            <td className="p-3">
                                                {Number(p.price).toLocaleString()} RWF
                                            </td>
                                            <td className="p-3">{p.quantity}</td>
                                            <td className="p-3">{p.date}</td>
                                            <td className="p-3">
                                                {(p.price * p.quantity).toLocaleString()} RWF
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-10 text-gray-500"
                                        >
                                            No records found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </>
    );
}

export default Reports;