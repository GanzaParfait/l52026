import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/products", { state: { openModal: true } });
  }

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setProducts(res.data.products);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // Calculate profit for each product
  products.forEach(product => {
    product.profit = (product.price - product.cost) * product.quantity;
  });

  return (
    <>
      <div className="cards flex flex-row gap-2 w-full justify-between">
        {/* Change cards with total products, value, until four cards filled */}
        <div className="bg-green-900 text-white p-6 rounded w-full">
          <p>Total Products</p>
          <span className="text-[22px] font-bold">{products.length}</span>
        </div>
        <div className="bg-gray-800 text-white p-6 rounded w-full">
          <p>Total Value</p>
          <span className="text-[22px] font-bold">{products.reduce((total, product) => total + (product.price * product.quantity), 0).toLocaleString()} RWF</span>
        </div>
        <div className="bg-gray-500 text-white p-6 rounded w-full">
          <p>Total Profit</p>
          <span className="text-[22px] font-bold">{products.reduce((total, product) => total + product.profit, 0).toLocaleString()} RWF</span>
        </div>
        <div className="bg-yellow-900 text-white p-6 rounded w-full">
          <p>New Products</p>
          <span className="text-[22px] font-bold">{products.filter(product => new Date(product.date).toDateString() === new Date().toDateString()).length}</span>
        </div>
      </div>

      <div className="preview mt-4">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-[25px] pb-5">Today's Sales</h2>
          <button onClick={() => handleRedirect()} className='bg-amber-100 rounded h-10 px-4 font-semibold cursor-pointer'>New Product</button>
        </div>

        <div className="table-responsive">
          <table className="w-full bg-white rounded-xl">
            <thead className="bg-gray-900 text-white text-left">
              <tr>
                <th className="p-4 rounded-tl-xl">#</th>
                <th className="p-4">Product</th>
                <th className="p-4">Cost</th>
                <th className="p-4">Price</th>
                <th className="p-4">Quantity</th>
                <th className="p-4 rounded-tr-xl">Profit</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id} className="hover:bg-gray-100 cursor-pointer transition-all duration-3 ease-in-out">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{Number(product.cost).toLocaleString()} RWF</td>
                  <td className="p-4">{Number(product.price).toLocaleString()} RWF</td>
                  <td className="p-4">{product.quantity}</td>
                  <td className="p-4">+{Number(product.profit).toLocaleString()} RWF</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
