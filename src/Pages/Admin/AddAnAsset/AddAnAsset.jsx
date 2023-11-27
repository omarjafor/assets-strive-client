import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { MdFormatListBulletedAdd } from "react-icons/md";

const AddAnAsset = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset } = useForm()

    const onSubmit = async (data) => {
        const assetInfo = {
            email: user?.email,
            name: data.name,
            quantity: data.quantity,
            type: data.type
        }
        const assetRes = await axiosSecure.post('/assets', assetInfo);
        if (assetRes.data.insertedId) {
            reset();
            toast.success(`${data.name} is Added To Assets List`)
        }
    };

    return (
        <div className="lg:mx-24 dark:bg-gray-900">
            <div className="mx-auto text-center md:w-4/12 my-8">
                <p className="text-teal-600 mb-2">Add an Assets Here for Admin</p>
                <h3 className="text-3xl uppercase border-y-4 py-4">Add An Asset</h3>
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