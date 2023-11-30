import DataTable from "react-data-table-component";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useMyData from "../../../Hooks/useMyData";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from 'react-helmet-async';


const AllRequests = () => {
    const [ search, setSearch ] = useState(null);
    const [myData, isLoading] = useMyData();
    const { company } = myData || {};

    const axiosSecure = useAxiosSecure();

    const { data: allRequest, isLoading: allRequestLoading, refetch } = useQuery({
        queryKey: ['customRequest', company],
        enabled: company && !isLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/requestedassets/admin/${company}`);
            return res.data;
        }
    })

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const todayDate = `${year}-${month < 10 ? 0 + month : month}-${day < 10 ? 0 + day : day}`;

    const handleApprove = (row) => {
        console.log(row);
        const assetInfo = {
            status: 'approved',
            approvedate: todayDate
        }
        axiosSecure.patch(`/requestedassets/admin/${row._id}`, assetInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: `${row.assetname} is Approved Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleReject = (row) => {
        console.log(row);
        const assetInfo = {
            status: 'rejected',
            rejectdate: todayDate
        }
        axiosSecure.patch(`/requestedassets/admin/${row._id}`, assetInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: `${row.assetname} is Rejected!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    if (isLoading || allRequestLoading) return (
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

    const filteredData = allRequest.filter((item) => {
        const nameMatch = search ? item.sendername == search : true;
        const emailMatch = search ? item.email.toLowerCase().includes(search.toLowerCase()) : true;
        console.log(nameMatch, emailMatch);
        return nameMatch || emailMatch;
    });
    
    console.log(search, filteredData);

    const columns = [
        {
            name: 'Serial Number',
            cell: (row, index) => index + 1,
            sortable: true
        },
        {
            name: 'Asset Name',
            selector: row => row.assetname,
            sortable: true
        },
        {
            name: 'Asset Type',
            selector: row => row.type,
            sortable: true
        },
        {
            name: 'Requester Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Requester Name',
            selector: row => row.sendername,
            sortable: true
        }, 
        {
            name: 'Request Date',
            selector: row => row.requestdate,
            sortable: true
        },
        {
            name: 'Additional Information',
            selector: row => row.additionalnote,
            sortable: true
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true
        },
        {
            name: 'Actions',
            selector: row => <>
                {row.status == 'approved' && <buttonc disabled className="btn btn-outline"> Approved  </buttonc> } 
                {row.status == 'rejected' && <buttonc disabled className="btn btn-outline"> Rejected  </buttonc> }
                {row.status == 'pending' && <> 
                    <button onClick={() => handleApprove(row)} className="btn btn-info btn-outline"> Approve </button>
                    <button onClick={() => handleReject(row)} className="btn btn-error btn-outline"> Reject </button>
                </>}  
            </>,
        }
    ];

    return (
        <div>
            <Helmet>
                <title>Asset Strive | All Request </title>
            </Helmet>
            <div className='p-12 lg:py-5'>
                <DataTable
                    title='All Request Section'
                    columns={columns}
                    data={filteredData}
                    fixedHeader
                    pagination
                    highlightOnHover
                    subHeader
                        subHeaderComponent={
                        <input
                                type="text" className="w-1/4 bottom-2 border-teal-600 input input-bordered form-control" placeholder="Search... Requester
name or email" value={search} onChange={(e) => setSearch(e.target.value)} />
                        }
                />
            </div>
        </div>
    );
};

export default AllRequests;