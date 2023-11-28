import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useRequestedAssets = () => {
    
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: requestedassets, isLoading, refetch } = useQuery({
        queryKey: ['requestedasset', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requestedassets/${user?.email}`);
            return res.data;
        }
    })
    return [ requestedassets, isLoading, refetch ];
};

export default useRequestedAssets;