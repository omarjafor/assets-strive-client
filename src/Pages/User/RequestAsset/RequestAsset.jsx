import { Helmet } from "react-helmet-async";
import useAssets from "../../../Hooks/useAssets";
import DataTable from 'react-data-table-component';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { BsSearch } from "react-icons/bs";

const RequestAsset = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);
    const [item, setItem] = useState({});
    const [assets, isLoading] = useAssets();
    const [data, setData] = useState(assets);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterAvailability, setFilterAvailability] = useState('');
    const [filterType, setFilterType] = useState('');

    useEffect(() => {
        if( assets && !isLoading ){
            setData(assets);
        }
    }, [assets, isLoading])

    const { register, handleSubmit, reset } = useForm()

    const handleRequest = item => {
        setItem(item);
        setShowModal(true);
    }

    const handleSearch = async () => {
        const res = await axiosSecure.get(`/assets/search?query=${searchQuery}`);
        setData(res.data);
    }

    const handleFilter = async() => {
        const res = await axiosSecure.get(`/assets/filter?availability=${filterAvailability}&type=${filterType}`);
        setData(res.data);
    }

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `${year}-${month < 10 ? 0 + month : month}-${day < 10 ? 0 + day : day}`;

    const onSubmit = async (data) => {
        const requestInfo = {
            assetname: item.name,
            assetid: item.assetid,
            type: item.type,
            email: user?.email,
            sendername: user?.displayName,
            requestdate: currentDate,
            additionalnote: data.additionalnote,
            status: 'pending'
        }
        const toastId = toast.loading('Asset Request Adding....')
        setShowModal(false);
        const reqassetres = await axiosSecure.post(`/requestedassets`, requestInfo);
        if (reqassetres.data.insertedId) {
            reset();
            toast.success(`${item.name} is Added to the Request`, { id: toastId });
        }
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
            name: 'Availability',
            selector: row => row.quantity > 0 ? 'Available' : 'Out of Stock',
            sortable: true
        },
        {
            name: 'Action',
            selector: row => row.quantity > 0 ? <button onClick={() => handleRequest(row)} className="btn btn-outline my-1">Request</button> : <button disabled>Request</button>,
        }
    ];

    const newData = data.map((asset, index) => ({
        id: index + 1,
        name: asset.name,
        type: asset.type,
        quantity: asset.quantity,
        assetid: asset._id
    }))

    return (
        <div>
            <Helmet>
                <title>Assets Strive | Request Asset</title>
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
                            <select value={filterAvailability} onChange={(e) => setFilterAvailability(e.target.value)}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select Availability</option>
                                <option value="Available">Available</option>
                                <option value="Out of stock">Out of stock</option>
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
                    title='Request For An Asset'
                    columns={columns}
                    data={newData}
                    fixedHeader
                    pagination
                    highlightOnHover
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
                                    Asset {item.name}
                                </h3>
                                <form onSubmit={handleSubmit(onSubmit)} className="mx-12">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-bold">Additional Note:</span>
                                        </label>
                                        <textarea {...register('additionalnote')} className="textarea textarea-bordered h-24" placeholder="Additional notes type here"></textarea>
                                    </div>
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Send Request
                                        </button>
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
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

export default RequestAsset;