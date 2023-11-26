import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useCustomRequest = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: customRequest, isLoading, refetch } = useQuery({
        queryKey: [user?.email, user],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/customrequests?email=${user.email}`);
            return res.data;
        }
    })

    return { customRequest, isLoading, refetch };
};

export default useCustomRequest;