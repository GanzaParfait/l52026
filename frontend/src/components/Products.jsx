import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
// Import from react-icons
import { FiRefreshCw } from "react-icons/fi";

function Products() {

    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false);


    const initialForm = {
        name: "",
        cost: "",
        price: "",
        quantity: "",
    }
    const [formData, setFormData] = useState(initialForm);

    // Add and edit product form submit handler
    const handleAddEdit = async () => {
        if (formData._id) {
            // Edit product
            await axios.put(`http://localhost:5000/api/products/${formData._id}`, formData);
        } else {
            // Add product
            await axios.post('http://localhost:5000/api/products', formData);
        }

        setShowForm(false);
        setFormData(initialForm);
        fetchProducts();
    }
    
    const handleEdit = (product) => {
        setFormData(product);
        setShowForm(true);
    }

    const openDeleteConfirm = (product) => {
        setSelectedProduct(product);
        setShowDeleteConfirm(true);
    }

    const handleDelete = async () => {
        await axios.delete(`http://localhost:5000/api/products/${selectedProduct._id}`);
        setShowDeleteConfirm(false);
        setSelectedProduct(null);
        fetchProducts();
    }

    const fetchProducts = async () => {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data.products);
        setLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    // if (loading) {
    //     return <div className="text-center py-10"><Spinner /></div>;
    // }

    return (
        <>
            <div className="w-full h-full flex items-center justify-between mb-5">
                <div>
                    <h1 className="text-[25px] font-bold">Products Page</h1>
                    <p className="text-gray-600">Here you can manage your products easily one by one.</p>
                </div>
                <div className="">
                    <button onClick={() => handleAddEdit()} className="bg-gray-900 hover:bg-gray-700 transition-all duration-3 ease-in-out text-white px-4 py-2 rounded cursor-pointer">Add Product</button>
                    {/* Refresh Icon */}
                    <button onClick={fetchProducts} className="bg-gray-900 hover:bg-gray-700 transition-all duration-3 ease-in-out text-white px-4 py-3 rounded cursor-pointer ml-2">
                        <FiRefreshCw />
                    </button>
                </div>
                
            </div>

            <div className="table-responsive">
                <table className="w-full bg-white rounded-xl">
                    <thead className="bg-gray-900 text-white text-left">
                        <tr>
                            <th className="p-4 rounded-tl-xl">#</th>
                            <th className="p-4">Product Name</th>
                            <th className="p-4">Cost</th>
                            <th className="p-4">Price</th>
                            {/* Bought and left quantities */}
                            <th className="p-4">Quantity</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10">
                                    <div className="flex justify-center">
                                        <Spinner />
                                        <p className="pl-2 text-gray-600">Loading...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            products.map((product, index) => (
                                <tr key={product._id} className="border-b border-gray-200 even:bg-gray-100 hover:bg-gray-200 cursor-pointer transition-all duration-3 ease-in-out">
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4">{product.name}</td>
                                    <td className="p-4">{product.cost} RWF</td>
                                    <td className="p-4">{product.price} RWF</td>
                                    <td className="p-4">{product.quantity}</td>
                                    <td className="p-4">
                                        <button onClick={() => handleEdit(product)} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer">Edit</button>
                                        <button onClick={() => handleDelete(product._id)} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer ml-2">Delete</button>
                                    </td>
                                </tr>
                            )))}
                    </tbody>
                </table>
            </div>


            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-96">
                        <h2 className="text-[20px] font-bold mb-4">{formData._id ? "Edit Product" : "Add Product"}</h2>
                        <div className="mb-4">
                            <label className="block mb-1">Product Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Cost</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={formData.cost}
                                onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Price</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Quantity</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
                            >
                                {formData._id ? "Update" : "Add"} Product
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-96">
                        <h2 className="text-[20px] font-bold mb-4">Confirm Delete</h2>
                        <p className="mb-4">Are you sure you want to delete this product?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Products