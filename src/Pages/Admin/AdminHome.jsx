import useMyData from "../../Hooks/useMyData";
import { Helmet } from 'react-helmet-async';
import TopMostRequest from "./AdminHome/TopMost/TopMostRequest";
import MaxPendingRequest from "./AdminHome/TopPending/MaxPendingRequest";
import LimitedStock from "./AdminHome/LimitedStock/LimitedStock";
import PieChartDisplay from "./AdminHome/PieChart/PieChartDisplay";
import ServiceStatistics from "./AdminHome/ServiceStatus/ServiceStatistics";
import StaticsBarCharts from "./AdminHome/BarCharts/StaticsBarCharts";

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
            <ServiceStatistics></ServiceStatistics>
            <MaxPendingRequest></MaxPendingRequest>
            <TopMostRequest></TopMostRequest>
            <LimitedStock></LimitedStock>
            <div className="grid gap-5 items-center justify-center justify-items-center grid-cols-1 lg:grid-cols-2 mx-12">
                <StaticsBarCharts></StaticsBarCharts>
                <PieChartDisplay></PieChartDisplay>
            </div>
        </div>
    );
};

export default AdminHome;