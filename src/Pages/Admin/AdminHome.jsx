import useMyData from "../../Hooks/useMyData";
import { Helmet } from 'react-helmet-async';

const AdminHome = () => {
    const [myData] = useMyData()
    return (
        <div>
            <Helmet>
                <title>Asset Strive | Admin Home </title>
            </Helmet>
            <div className="text-center items-center mx-auto py-3">
                <img src="https://i.ibb.co/jJpm8sY/admin.png" alt="" className="h-12 mx-auto" />
            </div>
            <div className="text-center mb-4 items-center mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Welcome Back, {myData?.name} !
                </h1>

                <p className="mt-1.5 text-sm text-gray-500">
                    Let&apos;s manage your employee & explore your assets 🎉
                </p>
            </div>
        </div>
    );
};

export default AdminHome;