import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const MainLayout = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <main className="max-w-6xl mx-auto p-4 bg-white min-h-dvh">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
