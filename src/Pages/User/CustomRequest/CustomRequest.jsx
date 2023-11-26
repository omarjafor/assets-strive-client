import { useForm } from "react-hook-form";
import { IoIosSend } from "react-icons/io";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CustomRequest = () => {

    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

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
                date: currentDate
            }
            console.log(requestInfo);
            const customRes = await axiosSecure.post('/customrequests', requestInfo);
            if (customRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is Added To Custom Request`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    return (
        <div className="lg:mx-24 dark:bg-gray-900">
            <div className="mx-auto text-center md:w-4/12 my-8">
                <p className="text-teal-600 mb-2">Add a custom request here</p>
                <h3 className="text-3xl uppercase border-y-4 py-4">Make a Custom Request</h3>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-6">
                        {/* category */}
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

                        {/* price */}
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
                        {/* category */}
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

                        {/* price */}
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
                    {/* recipe details */}
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