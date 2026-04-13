import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

function Product() {
    const token = localStorage.getItem("token");
    const [showAddForm, setShowAddForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const initialForm = { name: "", cost: "", price: "", quantity: "", category: "", inStock: true };
    const [formData, setFormData] = useState(initialForm);


    const handleEdit = async (product) => {
        setFormData(product);
        setShowAddForm(true);
    }

    const handleFormOperation = async () => {

        try {
            if (formData._id) {
                await axios.put(`http://localhost:5000/api/products/${formData._id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                toast.success("Product updated successfully");
            } else {
                await axios.post("http://localhost:5000/api/products", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                toast.success("Product added successfully");
            }
        } catch (err) {
            toast.error("Failed", err);
        } finally {
            setFormData(initialForm);
            setShowAddForm(false);
            fetchProducts();
        }
    }

    const handleShowDeleteModal = (product) => {
        setSelectedProduct(product);
        setShowDeleteConfirm(true);
        // console.log(product);
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Product deleted successfully");
        } catch (err) {
            console.log(err);
            toast.success("Failed to delete product");
        } finally {
            setShowDeleteConfirm(false);
            fetchProducts();
        }
    }

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:5000/api/products", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProducts(res.data.products);
            // console.log(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
            console.log(products);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    }

    return (
        <>
            <div className="w-full flex justify-between items-center mb-6">
                <div className="left-container">
                    <h2 className="text-gray-900 text-[30px] font-bold">Product's Page</h2>
                    <p className="text-gray-600">Here you can manage your products easily one by one.</p>
                </div>
                <div className="right-container">
                    <button onClick={() => toggleAddForm()} className="bg-gray-900 text-white rounded px-4 py-2 cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-in-out">Add Product</button>
                    <button onClick={() => fetchProducts()} className="bg-blue-900 text-white rounded px-4 py-2 cursor-pointer hover:bg-blue-700 transition-all duration-300 ease-in-out ml-2">{loading ? 'Refreshing...' : 'Refresh'}</button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-900 text-white text-left">
                            <th className="p-4 rounded-tl-2xl">#</th>
                            <th className="p-4">Product Name</th>
                            <th className="p-4">Cost</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Quantity</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Available</th>
                            <th className="p-4 rounded-tr-2xl">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="9" className="p-4 text-center">Loading products...</td>
                            </tr>
                        ) : products.map((product, index) => (
                            <tr key={product._id}>
                                <td className="p-4">{index + 1}</td>
                                <td className="p-4">{product.name}</td>
                                <td className="p-4">{product.cost?.toLocaleString()} RWF</td>
                                <td className="p-4">{product.price?.toLocaleString()} RWF</td>
                                <td className="p-4">{product.quantity}</td>
                                <td className="p-4">{product.category}</td>
                                <td className="p-4">{product.inStock ? "Yes" : "No"}</td>
                                <td className="p-4">
                                    <button onClick={() => handleEdit(product)} className="bg-blue-700 text-white hover:bg-blue-600 px-4 py-2 trans-all ease-in-out duration-300 rounded cursor-pointer">Update</button>
                                    <button onClick={() => handleShowDeleteModal(product._id)} className="bg-red-500 text-white hover:bg-red-400 px-4 py-2 trans-all ease-in-out duration-300 rounded cursor-pointer ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {showAddForm && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-120 items-center mb-6 p-4 rounded">
                        <div className="flex justify-between mb-4">
                            <div className="left-container">
                                <h2 className="font-bold text-[22px]">{formData._id ? "Edit Product" : "New Product"}</h2>
                                <p>Be carefully while {formData._id ? `updating ${formData.name} product.` : "adding a new product."}</p>
                            </div>
                            <div className="right-container cursor-pointer" onClick={() => toggleAddForm()}>
                                X
                            </div>
                        </div>

                        <form onSubmit={() => handleSubmit()} className="w-full">
                            <div className="wrap-fields">
                                <div className="field mb-2">
                                    <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-900 rounded px-4 py-2" placeholder="Product name..." />
                                </div>
                            </div>
                            <div className="flex gap-2 justify-between mb-2">
                                <div className="field">
                                    <input type="number" value={formData.cost} onChange={(e) => setFormData({ ...formData, cost: e.target.value })} className="w-full border border-gray-900 rounded px-4 py-2" name="cost" placeholder="Cost..." />
                                </div>
                                <div className="field">
                                    <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full border border-gray-900 rounded px-4 py-2" name="price" placeholder="Price..." />
                                </div>
                            </div>
                            <div className="flex gap-2 justify-between mb-2">
                                <div className="field">
                                    <input type="number" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} className="w-full border border-gray-900 rounded px-4 py-2" name="quantity" placeholder="Quantity..." />
                                </div>
                                <div className="field">
                                    <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full border border-gray-900 rounded px-4 py-2" name="category" placeholder="Category..." />
                                </div>
                            </div>
                            <select name="inStock" value={formData.inStock} onChange={(e) => setFormData({ ...formData, inStock: e.target.value === "true" })} className="w-full border border-gray-900 rounded px-4 py-2 mb-4">
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>

                            <div className="flex gap-2 justify-between">
                                <button type="button" onClick={handleFormOperation} className="w-full cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{formData._id ? "Edit" : "Add"} Product</button>
                                <button type="button" onClick={() => toggleAddForm()} className="w-full cursor-pointer bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Close</button>
                            </div>
                        </form>

                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-120 items-center mb-6 p-4 rounded">
                        <div className="left-container">
                            <h2 className="font-bold text-[22px]">Delete Product</h2>
                            <p className="pt-5">Are you sure you want to delete this product?</p>
                        </div>
                        <div className="flex gap-2 justify-between mt-5">
                            <button type="button" onClick={() => setShowDeleteConfirm(false)} className="w-full cursor-pointer bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Close</button>
                            <button type="button" onClick={() => handleDelete(selectedProduct)} className="w-full cursor-pointer bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default Product;