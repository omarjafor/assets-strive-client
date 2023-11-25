import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";


const AdminLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default AdminLayout;