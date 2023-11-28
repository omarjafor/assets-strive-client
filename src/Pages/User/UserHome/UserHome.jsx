import { useNavigate } from "react-router-dom";
import useAdmin from "../../../Hooks/useAdmin";
import useAuth from "../../../Hooks/useAuth";
import useEmployee from "../../../Hooks/useEmployee";
import MyCustomRequest from "./MyCustomRequest/MyCustomRequest";
import MyPendingRequest from "./MyPendingRequest/MyPendingRequest";
import MyMonthlyRequest from "./MyMonthlyRequest/MyMonthlyRequest";
import FrequentlyRequested from "./FrequentlyRequested/FrequentlyRequested";


const UserHome = () => {
    const { user, loading } = useAuth();
    const { isEmployee, isEmployeeLoading } = useEmployee();
    const [ isAdmin ] = useAdmin();
    const navigate = useNavigate();
    
    if(isAdmin){
        navigate('/admin/home');
    }

    if ( loading || isEmployeeLoading ) return (
        <div className="mx-auto items-center text-center">
            <div className="animate-pulse block-item shadow-md max-w-xl mx-auto mt-20">
                <div className="bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black h-6 rounded-t-3xl"></div>
                <div className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                        <div className="h-7 w-7 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-full"></div>
                        <div className="h-3 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-full w-1/3"></div>
                    </div>
                    <div className="my-6">
                        <div className="h-5 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-full w-3/4"></div>
                        <div className="my-4">
                            <div className="h-3 my-2 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-full w-full"></div>
                            <div className="h-3 my-2 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-full w-5/6"></div>
                            <div className="h-3 my-2 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-full w-4/6"></div>
                            <div className="h-3 my-2 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-full w-5/6"></div>
                            <div className="h-3 my-2 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-full w-3/6"></div>
                            <div className="h-3 my-2 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-full w-2/6"></div>
                        </div>
                    </div>
                    <div className="my-4">
                        <div className="h-11 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-lg w-full"></div>
                        <div className="h-3 my-4 mx-auto bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-full w-1/2"></div>
                    </div>
                </div>
            </div>
        </div>);

    return (
        <div>
            <div className="text-center my-4 items-center mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Welcome Back, {user?.displayName} !
                </h1>

                <p className="mt-1.5 text-sm text-gray-500">
                    Let&apos;s explore your assets here! 🎉
                </p>
            </div>
            {
                isEmployee ?
                    <>
                        <MyCustomRequest></MyCustomRequest>
                        <MyPendingRequest></MyPendingRequest>
                        <MyMonthlyRequest></MyMonthlyRequest>
                        <FrequentlyRequested></FrequentlyRequested>
                    </>
                    :
                    <>
                        <div className="text-center my-4 items-center">
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                {user?.displayName}, Please Contact with your HR
                            </h1>
                        </div>
                    </>
            }
        </div>
    );
};

export default UserHome;