import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import JoinEmployee from "../Pages/JoinEmployee/JoinEmployee";
import JoinAdmin from "../Pages/JoinAdmin/JoinAdmin";
import Login from "../Pages/Login/Login";
import AdminHome from "../Pages/Admin/AdminHome";
import AdminLayout from "../Layout/adminlayout";
import UserLayout from "../Layout/UserLayout";
import MyAssets from "../Pages/User/MyAssets/MyAssets";
import MyTeam from "../Pages/User/MyTeam/MyTeam";
import RequestAsset from "../Pages/User/RequestAsset/RequestAsset";
import CustomRequest from "../Pages/User/CustomRequest/CustomRequest";
import UserHome from "../Pages/User/UserHome/UserHome";

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
            },
            {
                path: 'myassets',
                element: <MyAssets></MyAssets>
            },
            {
                path: 'myteam',
                element: <MyTeam></MyTeam>
            },
            {
                path: 'requestasset',
                element: <RequestAsset></RequestAsset>
            },
            {
                path: 'customrequest',
                element: <CustomRequest></CustomRequest>
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