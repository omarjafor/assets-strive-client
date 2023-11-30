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
import PrivateRoute from "./PrivateRoute";
import AssetList from "../Pages/Admin/AssetList/AssetList";
import AddAnAsset from "../Pages/Admin/AddAnAsset/AddAnAsset";
import AllRequests from "../Pages/Admin/AllRequests/AllRequests";
import CustomRequestList from "../Pages/Admin/CustomRequestList/CustomRequestList";
import EmployeeList from "../Pages/Admin/EmployeeList/EmployeeList";
import AddAnEmployee from "../Pages/Admin/AddAnEmployee/AddAnEmployee";
import Profile from "../Pages/Profile/Profile";
import Payment from "../Pages/Payment/Payment";
import IncreaseLimit from "../Pages/Admin/AddAnEmployee/IncreaseLimit";

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
            },
            {
                path: 'assetlist',
                element: <AssetList></AssetList>
            },
            {
                path: 'addanasset',
                element: <AddAnAsset></AddAnAsset>
            },
            {
                path: 'allrequests',
                element: <AllRequests></AllRequests>
            },
            {
                path: 'customrequestlist',
                element: <CustomRequestList></CustomRequestList>
            },
            {
                path: 'employeelist',
                element: <EmployeeList></EmployeeList>
            },
            {
                path: 'addemployee',
                element: <AddAnEmployee></AddAnEmployee>
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            },
            {
                path: 'payment/:price',
                element: <Payment></Payment>
            },
            {
                path: 'increaselimit',
                element: <IncreaseLimit></IncreaseLimit>
            }
        ]
    },
    {
        path: '/user',
        element: <UserLayout></UserLayout>,
        children: [
            {
                path:'home',
                element: <PrivateRoute><UserHome></UserHome></PrivateRoute>
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
            },
            {
                path: 'profile',
                element: <Profile></Profile>
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