import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyData = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: myData, isLoading, refetch } = useQuery({
        queryKey: [ 'myData', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    })

    return [myData, isLoading, refetch];
};

export default useMyData;