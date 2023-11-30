import { useState } from "react";
import useMyData from "../../../Hooks/useMyData";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Helmet } from 'react-helmet-async';
import Swal from "sweetalert2";


const AssetList = () => {
    const [filterAvailability, setFilterAvailability] = useState('');
    const [filterType, setFilterType] = useState('');
    const [search, setSearch] = useState(null);
    const [myData, isLoading] = useMyData();
    const [showModal, setShowModal] = useState(false);
    const { company } = myData || {};
    const [item, setItem] = useState({});
    const { name, quantity, type, _id } = item || {};

    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm()

    const { data: allAssets, isLoading: allAssetsLoading, refetch } = useQuery({
        queryKey: ['customRequest', company],
        enabled: company && !isLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/assets/admin/${company}`);
            return res.data;
        }
    })
    console.log(myData, allAssets);

    const handleUpdate = (row) => {
        console.log(row);
        setItem(row);
        setShowModal(true);
    }

    const onSubmit = async (data) => {
        const updateAsset = {
            name: data.name,
            quantity: data.quantity,
            type: data.type
        }
        console.log(updateAsset);
        const toastId = toast.loading('Your Asset Updating....')
        setShowModal(false);
        const updateRes = await axiosSecure.patch(`/assets/admin/${_id}`, updateAsset);
        if (updateRes.data.modifiedCount > 0) {
            refetch();
            reset();
            toast.success(`${data.name} is Updated`, { id: toastId });
            setShowModal(false);
        } else {
            toast.error(`${data.name} Not Updated`, { id: toastId });
        }
    };

    const handleDelete = (row) => {
        console.log(row);
        Swal.fire({
            title: "Are you sure?",
            text: `${row.name} will be Deleted!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, Delete ${row.name}`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/assets/admin/${row._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top",
                                icon: "success",
                                title: `${row.name} is Removed!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        });
    }

    if (isLoading || allAssetsLoading) return (
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

    const filteredData = allAssets.filter((item) => {
        const nameMatch = search ? item.name == search : true;
        const availableMatch = (filterAvailability == 'Available' ? item?.quantity > 0 : (filterAvailability == 'Out of stock') ? item?.quantity == 0 : true );
        const typeMatch = filterType ? item?.type == filterType : true ;
        console.log(availableMatch, typeMatch);
        return availableMatch && typeMatch && nameMatch ;
    });


    const columns = [
        {
            name: 'Serial Number',
            cell: (row, index) => index + 1,
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
            name: 'Company Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Asset Quantity',
            selector: row => row.quantity,
            sortable: true
        },
        {
            name: 'Date Added',
            selector: row => row.date,
            sortable: true
        },
        {
            name: 'Actions',
            selector: row => <>
                <button onClick={() => handleUpdate(row)} className="btn btn-info btn-outline"> Update </button>
                <button onClick={() => handleDelete(row)} className="btn btn-error btn-outline"> Delete </button>
            </>,
        }
    ];


    return (
        <div>
            <Helmet>
                <title>Asset Strive | Asset List</title>
            </Helmet>
            <div className="flex flex-col w-full items-center pt-4 gap-4 bg-gradient-to-t from-teal-300 via-cyan-500 to-cyan-600" data-aos="zoom-in-up">
                <div className="w-full px-4 flex justify-end flex-col lg:flex-row gap-4 pb-2">
                
                    <div className="flex flex-col lg:flex-row gap-2">
                        <div>
                            <select value={filterAvailability} onChange={(e) => setFilterAvailability(e.target.value)}
                                className="select select-bordered w-full">
                                <option value=''>Select Availability</option>
                                <option value="Available">Available</option>
                                <option value="Out of stock">Out of stock</option>
                            </select>
                        </div>
                        <div>
                            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
                                className="select select-bordered w-full">
                                <option value=''>Select a Type</option>
                                <option value="Returnable">Returnable</option>
                                <option value="Non-returnable">Non-returnable</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-12 lg:px-24 lg:py-5'>
                <DataTable
                    title='All Assets List'
                    columns={columns}
                    data={filteredData}
                    fixedHeader
                    pagination
                    highlightOnHover
                    subHeader
                    subHeaderComponent={
                        <input
                            type="text" className="w-1/4 bottom-2 border-teal-600 input input-bordered form-control" placeholder="Search......" value={search} onChange={(e) => setSearch(e.target.value)} />
                    }
                />
            </div>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <h3 className="text-xl pt-2 font-semibold">
                                    {name} Update
                                </h3>
                                <form onSubmit={handleSubmit(onSubmit)} className="mx-12">
                                    <div className="form-control w-full my-6">
                                        <label className="label">
                                            <span className="label-text">Asset Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Asset Name"
                                            defaultValue={name}
                                            {...register('name', { required: true })}
                                            required
                                            className="input input-bordered w-full" />
                                    </div>
                                    <div className="form-control w-full my-6">
                                        <label className="label">
                                            <span className="label-text">Asset Quantity</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Asset Quantity"
                                            defaultValue={quantity}
                                            {...register('quantity', { required: true })}
                                            required
                                            className="input input-bordered w-full" />
                                    </div>
                                    <div className="form-control w-full my-6">
                                        <label className="label">
                                            <span className="label-text">Asset Type</span>
                                        </label>
                                        <select defaultValue={type} {...register('type', { required: true })}
                                            className="select select-bordered w-full">
                                            <option disabled value="default">Select a Type</option>
                                            <option value="Returnable">Returnable</option>
                                            <option value="Non-returnable">Non-returnable</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => {
                                                setShowModal(false)
                                                reset()
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    );
};

export default AssetList;