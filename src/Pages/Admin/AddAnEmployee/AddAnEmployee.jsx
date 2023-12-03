import { Link, useNavigate } from "react-router-dom";
import useMyData from "../../../Hooks/useMyData";
import useMyTeam from "../../../Hooks/useMyTeam";
import DataTable from "react-data-table-component";
import { FaUserTie } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


const AddAnEmployee = () => {
    const [ids, setIds] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [myData, isLoading] = useMyData();
    const { company, companylogo, limit, payment } = myData || {};
    const [ myTeam ] = useMyTeam();
    const navigate = useNavigate();

    const { data: allUsers, isLoading: allUsersLoading, refetch } = useQuery({
        queryKey: ['allUser', company],
        enabled: company && !isLoading,
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/users');
            return res.data;
        }
    })

    if (allUsersLoading) return (
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

    const handleAdd = async (row) => {
        if(myTeam?.length == limit){
            return Swal.fire({
                position: "top",
                icon: "error",
                title: `Your limit ${limit} is Full`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        Swal.fire({
            title: "Are you sure?",
            text: `${row.name} will be employee!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${row.name} Joining Team`
        }).then((result) => {
            if (result.isConfirmed) {
                const userInfo = { company, companylogo }
                axiosSecure.patch(`/admin/users/${row._id}`, userInfo)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top",
                                icon: "success",
                                title: `${row.name} is in Team!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/admin/employeelist')
                        }
                    })
            }
        });
    }

    const columns = [
        {
            name: 'Serial Number',
            cell: (row, index) => index + 1,
            sortable: true
        },
        {
            name: 'Profile Photo',
            selector: row => <div className="avatar">
                <div className="w-16 rounded-3xl">
                    <img src={row.img} />
                </div>
            </div>,
            sortable: true
        },
        {
            name: 'Profile Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Member Type',
            selector: row => <> <FaUserTie className="text-3xl ml-3"></FaUserTie> {row.role} </>,
            sortable: true
        },
        {
            name: 'Actions',
            selector: row => <> <button onClick={() => handleAdd(row)} className="btn btn-info btn-outline"> ADD To Team </button> </>,
        }
    ];

    const handleAllSelect = ({ selectedRows }) => {
        console.log(selectedRows);
        const ids = selectedRows.map(item => item._id);
        setIds(ids);
    }
    console.log(ids);

    const makeAllEmployee = () => {
        if (ids.length < 2 ) {
            return Swal.fire({
                position: "top",
                icon: "error",
                title: `First Select Some Employee`,
                showConfirmButton: false,
                timer: 1500
            });
        }else if (myTeam?.length + ids.length > limit) {
            return Swal.fire({
                position: "top",
                icon: "error",
                title: `Your limit is ${limit}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        Swal.fire({
            title: "Are you sure?",
            text: `All will be employee!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, Add To Team`
        }).then((result) => {
            if (result.isConfirmed) {
                const updateInfo = { company, companylogo }
                const data = { updateInfo, ids };
                axiosSecure.put('/admin/users/makeallemployee', data )
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top",
                                icon: "success",
                                title: `All Added To Team!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/admin/employeelist')
                        }
                    })
            }
        });
    }

    return (
        <div className="my-10">
            <Helmet>
                <title>Asset Strive | Add Employee </title>
            </Helmet>
            <section className="bg-white">
                <div className="mx-auto max-w-screen-xl px-4">
                    <div className="my-8">
                        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div
                                className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center"
                            >
                                <dt className="order-last text-lg font-medium text-gray-500">
                                    Last Payment
                                </dt>

                                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                                    ${payment}
                                </dd>
                            </div>

                            <div
                                className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center"
                            >
                                <dt className="order-last text-lg font-medium text-gray-500">
                                    Employee Count
                                </dt>

                                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl"> {myTeam?.length} </dd>
                            </div>

                            <div
                                className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center"
                            >
                                <dt className="order-last text-lg font-medium text-gray-500">
                                    Your Limit
                                </dt>

                                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl"> {limit} </dd>
                            </div>
                        </dl>
                    </div>
                    <Link to='/admin/increaselimit' className="btn btn-info text-lg">Increase Limit</Link>
                </div>
            </section>
            <div className='p-12 lg:px-24 lg:py-5'>
                <DataTable
                    title='All the users who are not employees'
                    columns={columns}
                    data={allUsers}
                    fixedHeader
                    pagination
                    highlightOnHover
                    selectableRows
                    selectableRowsHighlight
                    onSelectedRowsChange={handleAllSelect}
                />
            </div>
            <button className="btn btn-info" onClick={makeAllEmployee}>Add Selected Members to the Team</button>
        </div>
    );
};

export default AddAnEmployee;