import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import JoinEmployee from "../Pages/JoinEmployee/JoinEmployee";
import JoinAdmin from "../Pages/JoinAdmin/JoinAdmin";
import Login from "../Pages/Login/Login";

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