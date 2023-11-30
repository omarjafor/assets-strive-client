import { Helmet } from "react-helmet-async";
import { AiFillFacebook, AiFillTwitterSquare, AiOutlineInstagram } from 'react-icons/ai';
import useMyData from "../../Hooks/useMyData";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";

const Profile = () => {
    const axiosSecure = useAxiosSecure();
    const [myData, isLoading, refetch] = useMyData();
    const { email, img, name, role, birthdate, _id } = myData || {};
    const [showModal, setShowModal] = useState(false);

    const { register, handleSubmit, reset } = useForm()

    const handleUpdate = () => {
        setShowModal(true);
    }

    const onSubmit = async (data) => {
        const updateData = {
            name: data.name,
            birthdate: data.birthdate,
            img: data.image
        }
        console.log(updateData);
        const toastId = toast.loading('Your Profile Updating....')
        setShowModal(false);
        const updateRes = await axiosSecure.patch(`/users/${_id}`, updateData);
        if (updateRes.data.modifiedCount > 0) {
            refetch();
            reset();
            toast.success(`${data.name} Profile Updated`, { id: toastId });
        }else{
            toast.error(`${data.name} Profile Not Updated`, { id: toastId });
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

    return (
        <>
            <div className="flex justify-center gap-8 dark:bg-gray-900 items-center flex-col my-24 mx-5 lg:flex-row">
                <Helmet>
                    <title>Asset Strive | Profile</title>
                </Helmet>
                <div className="relative flex w-96 flex-col rounded-xl bg-clip-border text-gray-700 dark:text-white shadow-md">
                    <div className="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                        <img src={img} alt="profile-picture" />
                    </div>
                    <div className="p-6 text-center">
                        <h4 className="mb-2 block text-teal-700 text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                            {name}
                        </h4>
                        <p className="block bg-gradient-to-tr from-blue-600 to-blue-800 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
                            {email}
                        </p>
                        <p className="block uppercase bg-gradient-to-tr from-blue-600 to-blue-800 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
                            {role}
                        </p>
                        <p className="block bg-gradient-to-tr from-green-800 to-teal-800 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
                            Birthday : {birthdate}
                        </p>
                    </div>
                    <div className="flex justify-center pb-4 gap-4">
                        <button
                            className="middle none relative h-10 max-h-[40px] w-10 max-w-[40px] rounded-lg bg-[#3b5998] text-center font-sans text-xs font-medium uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            data-ripple-light="true"
                        >
                            <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
                                <AiFillFacebook size={30}></AiFillFacebook>
                            </span>
                        </button>
                        <button
                            className="middle none relative h-10 max-h-[40px] w-10 max-w-[40px] rounded-lg bg-[#00acee] text-center font-sans text-xs font-medium uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            data-ripple-light="true"
                        >
                            <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
                                <AiFillTwitterSquare size={30}></AiFillTwitterSquare>
                            </span>
                        </button>
                        <button
                            className="middle none relative h-10 max-h-[40px] w-10 max-w-[40px] rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-center font-sans text-xs font-medium uppercase text-black shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            data-ripple-light="true"
                        >
                            <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
                                <AiOutlineInstagram size={30}></AiOutlineInstagram>
                            </span>
                        </button>
                    </div>
                    <button onClick={handleUpdate} className="btn btn-success w-2/4 mb-2 mx-auto">
                        Update Profile
                    </button>
                </div>
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
                                    {name} Profile
                                </h3>
                                <form onSubmit={handleSubmit(onSubmit)} className="mx-12">
                                    <div className="form-control flex my-6">
                                        <label className="label">
                                            <span className="label-text">Profile Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={name}
                                            placeholder="Profile Name"
                                            {...register('name', { required: true })}
                                            required
                                            className="input input-bordered w-full" />
                                    </div>
                                    <div className="form-control flex my-6">
                                        <label className="label">
                                            <span className="label-text">Birthdate</span>
                                        </label>
                                        <input
                                            type="date"
                                            defaultValue={birthdate}
                                            placeholder="Birth Date"
                                            {...register('birthdate', { required: true })}
                                            required
                                            className="input input-bordered w-full" />
                                    </div>
                                    <div className="form-control flex my-6">
                                        <label className="label">
                                            <span className="label-text">Profile Photo</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={img}
                                            placeholder="Profile Photo"
                                            {...register('image', { required: true })}
                                            required
                                            className="input input-bordered w-full" />
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
        </>
    );
};

export default Profile;