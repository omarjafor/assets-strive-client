import { useEffect, useState } from "react";
import useRequestedAssets from "../../../Hooks/useRequestedAssets";
import DataTable from 'react-data-table-component';
import { Helmet } from "react-helmet-async";
import { BsSearch } from "react-icons/bs";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useMyData from "../../../Hooks/useMyData";

const MyAssets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [requestedassets, isLoading, refetch] = useRequestedAssets();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterType, setFilterType] = useState('');
    
    const [myData] = useMyData();
    const { companylogo, company } = myData || {};

    console.log(requestedassets);
    useEffect(() => {
        if (requestedassets && !isLoading) {
            setData(requestedassets);
        }
    }, [isLoading, requestedassets]);

    const handleSearch = async () => {
        const res = await axiosSecure.get(`/requestedassets/search?query=${searchQuery}`);
        console.log(res.data);
        setData(res.data);
    }

    const handleFilter = async () => {
        const res = await axiosSecure.get(`/requestedassets/filter?status=${filterStatus}&type=${filterType}`);
        setData(res.data);
    }

    const handleReturn = row => {
        axiosSecure.patch(`/requestedassets/${row._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: `${row.name} is an returned Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleCancel = row => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/requestedassets/${row._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Cancel!",
                                text: "Your Request has been Canceled",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handlePrint = (row) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print</title></head><body>');
        printWindow.document.write(`<div >
                    <img src=${companylogo} alt="" className="h-16 w-16" />
                    <h2>Comapny : ${company} </h2>
                    <h4 class="text-2xl">User Name : ${user?.displayName} </h4>
                    <h4>User Email : ${user?.email} </h4>
                    <h4>Asset Name : ${row?.name} </h4>
                    <h4>Asset Status : ${row?.status} </h4>
                    <h4>Asset Type: ${row?.type} </h4>
                    <h4>Asset Approved Date: ${row?.approvedate} </h4>
                    <h4>Asset Request Date: ${row?.requestdate} </h4>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h4>Print Date: ${ now } </h4>
                </div>`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    if (isLoading) return (
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


    const columns = [
        {
            name: 'Serial Number',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'Asset Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Asset Type',
            selector: row => row.type,
            sortable: true
        },
        {
            name: 'Request Date',
            selector: row => row.requestdate,
            sortable: true
        },
        {
            name: 'Approved Date',
            selector: row => row.approvedate,
            sortable: true
        },
        {
            name: 'Request Status',
            selector: row => row.status,
            sortable: true
        },
        {
            name: 'Action',
            selector: row => <div className="flex gap-1">
                {row.status == 'pending' ? <button onClick={() => handleCancel(row)} className="btn btn-outline my-1">Cancel</button> : <button onClick={() => handlePrint(row)} className="btn btn-primary my-1">Print</button>}
                {(row.status == 'approved' && row.type == 'Returnable') && <button onClick={() => handleReturn(row)} className="btn btn-outline my-1">Return</button>}
                {row.status == 'returned' && <button className="btn btn-outline my-1" disabled>Return</button>}
            </div>,
        }
    ];

    const newData = data.map((asset, index) => ({
        id: index + 1,
        _id: asset._id,
        name: asset.assetname,
        type: asset.type,
        requestdate: asset.requestdate,
        approvedate: asset.approvedate,
        status: asset.status
    }))

    const now = new Date().toDateString();

    return (
        <div>
            <Helmet>
                <title>Assets Strive | My Assets</title>
            </Helmet>
            <div className="flex flex-col w-full items-center pt-4 gap-4 bg-gradient-to-t from-teal-300 via-cyan-500 to-cyan-600" data-aos="zoom-in-up">
                <div className="w-full px-4 flex justify-between flex-col lg:flex-row gap-4 pb-2">
                    <div className="relative">
                        <input type="text" name="search" className="relative w-full border h-12 shadow p-4 rounded-full placeholder:ml-4 cu" placeholder="Search Asset by Names" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
                        <button onClick={handleSearch} type="submit" className="absolute right-4 top-4">
                            <BsSearch></BsSearch>
                        </button>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2">
                        <div>
                            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                            </select>
                        </div>
                        <div>
                            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a Type</option>
                                <option value="Returnable">Returnable</option>
                                <option value="Non-returnable">Non-returnable</option>
                            </select>
                        </div>
                        <button className="btn btn-outline" onClick={handleFilter}>Filter</button>
                    </div>
                </div>
            </div>
            <div className='p-12 lg:px-24 lg:py-5'>
                <DataTable
                    title='My Requested Assets'
                    columns={columns}
                    data={newData}
                    fixedHeader
                    pagination
                    highlightOnHover
                />
            </div>
        </div>
    );
};

export default MyAssets;