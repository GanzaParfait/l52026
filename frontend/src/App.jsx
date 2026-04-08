import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard";
import Layout from "./Layout/Layout";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Products from "./components/Products";
import Reports from "./components/Reports";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/reports" element={<Reports />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
