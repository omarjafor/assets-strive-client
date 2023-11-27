import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAssets = () => {
    const axiosSecure = useAxiosSecure();

    const { data: assets =[], isLoading, refetch } = useQuery({
        queryKey: ['asset'],
        queryFn: async () => {
            const res = await axiosSecure.get('/assets');
            return res.data;
        }
    })
    return [ assets, isLoading, refetch];
};

export default useAssets;