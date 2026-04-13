import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "./Spinner";
import EmptyState from "./EmptyState";
// Import from react-icons
import { FiRefreshCw } from "react-icons/fi";
import { MdClose } from "react-icons/md";
// Import toast from react-toastify
import { toast } from "react-toastify";

function Products() {
    const token = localStorage.getItem("token");
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);


    const initialForm = {
        name: "",
        cost: "",
        price: "",
        quantity: "",
        inStock: true,
    }
    const [formData, setFormData] = useState(initialForm);

    const handleEdit = (product) => {
        setFormData(product);
        setShowForm(true);
    }

    const openDeleteConfirm = (id) => {
        setSelectedProduct(id);
        setShowDeleteConfirm(true);
    }

    // Add and edit product form submit handler
    const handleAddEdit = async () => {
        if (formData._id) {
            // Edit product
            await axios.put(`http://localhost:5000/api/products/${formData._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Product updated successfully");
        } else {
            // Add product
            await axios.post('http://localhost:5000/api/products', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Product added successfully");
        }

        setShowForm(false);
        setFormData(initialForm);
        fetchProducts();
    }

    const handleDelete = async (id) => {
        try {
            setDeleteLoading(true);

            await axios.delete(`http://localhost:5000/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setShowDeleteConfirm(false);
            setSelectedProduct(null);

            toast.success("Product deleted successfully");

            fetchProducts();
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete product");
        } finally {
            setDeleteLoading(false);
        }
    }

    const fetchProducts = async () => {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/products', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        setProducts(res.data.products);
        setLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    // if (loading) {
    //     return <div className="text-center py-10"><Spinner /></div>;
    // }

    // Auto Open modal
    useEffect(() => {
        if (location.state?.openModal) {
            setShowForm(true);
        }
    }, [location.state]);

    return (
        <>
            <div className="w-full h-full flex items-center justify-between mb-5">
                <div>
                    <h1 className="text-[25px] font-bold">Products Page</h1>
                    <p className="text-gray-600">Here you can manage your products easily one by one.</p>
                </div>
                <div className="">
                    <button onClick={() => setShowForm(true)} className="bg-gray-900 hover:bg-gray-700 transition-all duration-300 ease-in-out text-white px-4 py-2 rounded cursor-pointer">Add Product</button>
                    {/* Refresh Icon */}
                    <button onClick={fetchProducts} className="bg-gray-900 hover:bg-gray-700 transition-all duration-300 ease-in-out text-white px-4 py-3 rounded cursor-pointer ml-2">
                        {loading ? <Spinner size="sm" /> : <FiRefreshCw />}
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
                            <th className="p-4">Avaible</th>
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
                        ) : products.length === 0 ? (
                            <tr>
                                <td colSpan="6">
                                    <EmptyState
                                        message="No products found"
                                        action={{
                                            label: "Add Product",
                                            onClick: () => setShowForm(true),
                                        }}
                                    />
                                </td>
                            </tr>
                        ) : (
                            products.map((product, index) => (
                                <tr key={product._id} className="border-b border-gray-200 even:bg-gray-100 hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out">
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4">{product.name}</td>
                                    <td className="p-4">{Number(product.cost).toLocaleString()} RWF</td>
                                    <td className="p-4">{Number(product.price).toLocaleString()} RWF</td>
                                    <td className="p-4">{product.quantity}</td>
                                    <td className="p-4">{product.inStock ? <span className="bg-green-500 text-white p-1 rounded">Yes</span> : <span className="bg-red-300 text-white px-4 rounded-xl">No</span>}</td>
                                    <td className="p-4">
                                        <button onClick={() => handleEdit(product)} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer">Edit</button>
                                        <button onClick={() => openDeleteConfirm(product._id)} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer ml-2">Delete</button>
                                    </td>
                                </tr>
                            )))}
                    </tbody>
                </table>
            </div>


            {showForm && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-145">
                        <div className="flex justify-between">
                            <h2 className="text-[20px] font-bold mb-4">{formData._id ? "Edit Product" : "Add Product"}</h2>
                            <span onClick={() => setShowForm(false)} className="cursor-pointer">
                                <MdClose />
                            </span>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Product Name</label>
                            <input
                                type="text"
                                placeholder="Product name..."
                                className="w-full p-2 border rounded"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-between gap-2">
                            <div className="mb-4 w-full">
                                <label className="block mb-1">Cost</label>
                                <input
                                    type="number"
                                    placeholder="Cost..."
                                    className="w-full p-2 border rounded"
                                    value={formData.cost}
                                    onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) })}
                                />
                            </div>
                            <div className="mb-4 w-full">
                                <label className="block mb-1">Price</label>
                                <input
                                    type="number"
                                    placeholder="Price..."
                                    className="w-full p-2 border rounded"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                />
                            </div>
                            <div className="mb-4 w-full">
                                <label className="block mb-1">In Stock</label>
                                <select className="w-full p-2 border rounded" name="inStock" value={formData.inStock} onChange={(e) => setFormData({ ...formData, inStock: e.target.value === "true" })}>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Quantity</label>
                            <input
                                type="number"
                                placeholder="Quantity..."
                                className="w-full p-2 border rounded"
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="flex justify-end w-full">
                            <button onClick={() => setShowForm(false)} className="w-full bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer mr-2">
                                Close
                            </button>
                            <button
                                onClick={handleAddEdit}
                                disabled={saveLoading}
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
                            >
                                {saveLoading ? <> <Spinner size="sm" /> </> : formData._id ? "Update Product" : "Add Product"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center">
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
                                onClick={() => handleDelete(selectedProduct)}
                                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
                            >
                                {deleteLoading ? <Spinner size="sm" /> : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Products