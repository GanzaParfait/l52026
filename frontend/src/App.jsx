import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard";
import Layout from "./Layout/Layout";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Products from "./components/Products";
import Reports from "./components/Reports";
import Profile from "./components/Profile";
import Product from "./components/product";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}></Route>
            <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>}></Route>
            <Route path="/product" element={<ProtectedRoute><Product /></ProtectedRoute>}></Route>
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>}></Route>
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
