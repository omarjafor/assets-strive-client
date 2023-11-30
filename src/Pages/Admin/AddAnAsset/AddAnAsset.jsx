import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { MdFormatListBulletedAdd } from "react-icons/md";
import useMyData from "../../../Hooks/useMyData";
import { Helmet } from 'react-helmet-async';

const AddAnAsset = () => {
    const [myData] = useMyData();
    const { company } = myData || {};
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const todayDate = `${year}-${month < 10 ? 0 + month : month}-${day < 10 ? 0 + day : day}`;

    const { register, handleSubmit, reset } = useForm()

    const onSubmit = async (data) => {
        const assetInfo = {
            email: user?.email,
            name: data.name,
            quantity: parseInt(data.quantity),
            type: data.type,
            date: todayDate,
            company
        }
        const assetRes = await axiosSecure.post('/assets', assetInfo);
        if (assetRes.data.insertedId) {
            reset();
            toast.success(`${data.name} is Added To Assets List`)
        }
    };

    return (
        <div className="lg:mx-24 dark:bg-gray-900">
            <Helmet>
                <title>Asset Strive | Add Asset </title>
            </Helmet>
            <div className="text-center py-10">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-5xl">
                    Add An Asset
                </h2>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="justify-items-center grid">
                    <div className="form-control w-1/3 my-6">
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

                    <div className="form-control w-1/3 my-6">
                        <label className="label">
                            <span className="label-text">Asset Quantity</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Asset Quantity"
                            {...register('quantity', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>

                    <div className="form-control w-1/3 my-6">
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

                    <button className="btn">
                        Add Asset Now <MdFormatListBulletedAdd className="ml-4 text-2xl" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAnAsset;