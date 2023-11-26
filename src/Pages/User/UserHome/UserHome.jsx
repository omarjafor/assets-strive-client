import useAuth from "../../../Hooks/useAuth";
import MyCustomRequest from "./MyCustomRequest/MyCustomRequest";


const UserHome = () => {
    const {user} = useAuth();

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
            <MyCustomRequest></MyCustomRequest>
        </div>
    );
};

export default UserHome;