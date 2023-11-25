import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import JoinEmployee from "../Pages/JoinEmployee/JoinEmployee";
import JoinAdmin from "../Pages/JoinAdmin/JoinAdmin";
import Login from "../Pages/Login/Login";
import UserHome from "../Pages/UserHome/UserHome";
import AdminHome from "../Pages/AdminHome/AdminHome";
import AdminLayout from "../Layout/adminlayout";
import UserLayout from "../Layout/UserLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout></AdminLayout>,
        children: [
            {
                path: 'home',
                element: <AdminHome></AdminHome>
            }
        ]
    },
    {
        path: '/user',
        element: <UserLayout></UserLayout>,
        children: [
            {
                path:'home',
                element: <UserHome></UserHome>
            }
        ]
    },
    {
        path: '/joinemployee',
        element: <JoinEmployee></JoinEmployee>
    },
    {
        path: '/joinadmin',
        element: <JoinAdmin></JoinAdmin>
    },
    {
        path: '/login',
        element: <Login></Login>
    }
]);

export default router;