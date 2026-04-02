import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Header />
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
