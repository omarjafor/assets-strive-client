import { useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useCustomRequest from "../../../../Hooks/useCustomRequest";
import DataTable from 'react-data-table-component';
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyCustomRequest = () => {
    const { user } = useAuth();
    const { customRequest, isLoading, refetch } = useCustomRequest();
    const [showModal, setShowModal] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const [item, setItem] = useState({});
    const { name, whyneed, type, additional, price, image, status, date, _id } = item || {};

    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const handleDetails = item => {
        setItem(item);
        setShowModal(true);
    }

    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const requestInfo = {
                name: data.name,
                whyneed: data.whyneed,
                type: data.type,
                additional: data.addinfo,
                price: parseInt(data.price),
                image: res.data.data.display_url
            }
            // console.log(requestInfo);
            const customRes = await axiosSecure.patch(`/customrequests/${_id}`, requestInfo);
            if (customRes.data.modifiedCount > 0) {
                refetch();
                toast.success(`${data.name} is updated to the menu.`);
                setShowModal(false);
            }
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
            cell: (row, index) => index + 1,
            sortable: true
        },
        {
            name: 'Asset Name',
            selector: row => row.name,
            sortable: true
        }, 
        {
            name: 'Asset Price',
            selector: row => row.price,
            sortable: true
        }, 
        {
            name: 'Asset Status',
            selector: row => row.status,
            sortable: true
        },
        {
            name: 'Asset Type',
            selector: row => row.type,
            sortable: true
        },
        {
            name: 'View Details',
            selector: row => <button
                onClick={ () =>  handleDetails(row)}
                className="btn btn-ghost btn-lg"> Details
            </button>,
        }
    ];

    return (
        <div className="mx-12">
            <div className="text-left my-4 items-center">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    {user?.displayName}&apos;s Home Section
                </h1>
            </div>
            
            {
                customRequest.length > 0 && (
                    <div className='p-12 lg:px-24 lg:py-5'>
                        <DataTable
                            title='Custom Request Section'
                            columns={columns}
                            data={customRequest}
                            fixedHeader
                            pagination
                            highlightOnHover
                        />
                    </div>
                )
            }
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {name}
                                    </h3>
                                    <h3 className="text-3xl font-semibold">
                                        $ {price}
                                    </h3>
                                </div>
                                {/*Body Section*/}
                                {updateMode &&
                                    <>
                                        <form onSubmit={handleSubmit(onSubmit)} className="mx-12">
                                            <div className="flex gap-6">
                                            <div className="form-control w-full my-6" key={name}>
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

                                            <div className="form-control w-full my-6" key={whyneed} >
                                                    <label className="label">
                                                        <span className="label-text">Why You Need This</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Why You Need"
                                                        defaultValue={whyneed}
                                                        {...register('whyneed', { required: true })}
                                                        required
                                                        className="input input-bordered w-full" />
                                                </div>

                                            </div>
                                            <div className="flex gap-6">
                                            <div className="form-control w-full my-6" key={type}>
                                                    <label className="label">
                                                        <span className="label-text">Asset Type</span>
                                                    </label>
                                                    <select defaultValue={type} {...register('type', { required: true })}
                                                    className="select select-bordered w-full">
                                                        <option disabled value="default">{type}</option>
                                                        <option value="Returnable">Returnable</option>
                                                        <option value="Non-returnable">Non-returnable</option>
                                                    </select>
                                                </div>

                                                <div className="form-control w-full my-6" key={price}>
                                                    <label className="label">
                                                        <span className="label-text">Price</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder="Price"
                                                    defaultValue={price}
                                                        {...register('price', { required: true })}
                                                        className="input input-bordered w-full" />
                                                </div>

                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Additional information</span>
                                                </label>
                                                <textarea {...register('addinfo')} defaultValue={additional} className="textarea textarea-bordered h-24" placeholder="Additional information type here"></textarea>
                                            </div>

                                            <div className="form-control w-full items-center my-6">
                                                <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                                            </div>

                                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                <button
                                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="submit"
                                                >
                                                    Save Changes
                                                </button>
                                                <button
                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => setUpdateMode(!updateMode)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                }{updateMode ||
                                    <>
                                        <div className="relative p-6 flex-auto">
                                            <div className="card w-full glass">
                                                <figure><img src={image} /></figure>
                                                <div className="card-body">
                                                    <div className="flex justify-between">
                                                        <p className="text-left">Needed For: {whyneed} </p>
                                                        <p className="text-right">Request Date: {date} </p>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <p className="text-left">Status: {status} </p>
                                                        <p className="text-right">Type: {type} </p>
                                                    </div>
                                                    <p className="my-2 text-blueGray-500 text-lg leading-relaxed">
                                                        {additional}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setUpdateMode(!updateMode)}
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
                                                Close
                                            </button>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    );
};

export default MyCustomRequest;