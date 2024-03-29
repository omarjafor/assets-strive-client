import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const ServiceStatistics = () => {

    const axiosSecure = useAxiosSecure();

    const { data: state = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/service-state');
            return res.data;
        }
    })

    console.log(state);
    const { users, assets, requests, customrequests } = state || {} ;

    return (
        <div>
            <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Service Statistics</h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mt-4">
                    <div className="bg-white overflow-hidden shadow sm:rounded-lg">
                        <div className="px-4 py-5 flex gap-3 justify-center sm:p-6">
                            <dl>
                                <img src="https://i.postimg.cc/9FpmFVk2/asset-3.png" alt="" className="h-12" />
                            </dl>
                            <dl>
                                <dt className="text-sm leading-5 font-medium text-gray-500 truncate">Total Assets</dt>
                                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600">{assets}</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow sm:rounded-lg">
                        <div className="px-4 py-5 flex gap-3 justify-center sm:p-6">
                            <dl>
                                <img src="https://i.postimg.cc/4NZ4gnBw/reqs.png" alt="" className="h-12" />
                            </dl>
                            <dl>
                                <dt className="text-sm leading-5 font-medium text-gray-500 truncate">Total Request</dt>
                                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600"> {requests}</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow sm:rounded-lg">
                        <div className="px-4 py-5 flex gap-3 justify-center sm:p-6">
                            <dl>
                                <img src="https://i.postimg.cc/wjj61ZKm/cusreq.png" alt="" className="h-12" />
                            </dl>
                            <dl>
                                <dt className="text-sm leading-5 font-medium text-gray-500 truncate">Total Custom Request</dt>
                                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600"> {customrequests}</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow sm:rounded-lg">
                        <div className="px-4 py-5 flex gap-3 justify-center sm:p-6">
                            <dl>
                                <img src="https://i.ibb.co/1qJYtT4/users.png" alt="" className="h-12" />
                            </dl>
                            <dl>
                                <dt className="text-sm leading-5 font-medium text-gray-500 truncate">Total Users</dt>
                                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600"> {users}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default ServiceStatistics;