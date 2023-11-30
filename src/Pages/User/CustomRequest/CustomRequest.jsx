import { useForm } from "react-hook-form";
import { Helmet } from 'react-helmet-async';
import { IoIosSend } from "react-icons/io";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import toast from 'react-hot-toast';
import useMyData from "../../../Hooks/useMyData";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CustomRequest = () => {

    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [myData] = useMyData();
    const { company, companylogo } = myData || {};

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `${year}-${month < 10 ? 0+month : month}-${day < 10 ? 0+day : day }`;

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
                email: user?.email,
                name: data.name,
                whyneed: data.whyneed,
                type: data.type,
                additional: data.addinfo,
                price: parseInt(data.price),
                image: res.data.data.display_url,
                status: 'pending',
                date: currentDate,
                company,
                companylogo
            }
            console.log(requestInfo);
            const customRes = await axiosSecure.post('/customrequests', requestInfo);
            if (customRes.data.insertedId) {
                reset();
                toast.success(`${data.name} is Added To Custom Request`)
            }
        }
    };

    return (
        <div className="lg:mx-24 dark:bg-gray-900">
            <Helmet>
                <title>Asset Strive | Custom Request</title>
            </Helmet>
            <div className="text-center py-10">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-5xl">
                    Make a Custom Request
                </h2>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-6">
                        
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Asset Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Asset Name"
                                {...register('name', { required: true })}
                                required
                                className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Why You Need This</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Why You Need"
                                {...register('whyneed', { required: true })}
                                required
                                className="input input-bordered w-full" />
                        </div>

                    </div>
                    <div className="flex gap-6">
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Asset Type</span>
                            </label>
                            <select defaultValue="default" {...register('type', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a Type</option>
                                <option value="Returnable">Returnable</option>
                                <option value="Non-returnable">Non-returnable</option>
                            </select>
                        </div>

                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Price"
                                {...register('price', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Additional information</span>
                        </label>
                        <textarea {...register('addinfo')} className="textarea textarea-bordered h-24" placeholder="Additional information type here"></textarea>
                    </div>

                    <div className="form-control w-full items-center my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn">
                        Send Request <IoIosSend className="ml-4 text-2xl" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CustomRequest;