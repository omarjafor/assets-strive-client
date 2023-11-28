import { useQuery } from "@tanstack/react-query";
import useMyData from "./useMyData";
import useAxiosSecure from "./useAxiosSecure";


const useMyTeam = () => {
    const axiosSecure = useAxiosSecure();
    const [myData] = useMyData();
    const { company } = myData || {};

    const { data: myTeam, isLoading, refetch } = useQuery({
        queryKey: ['myteam', company],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?company=${company}`);
            return res.data;
        }
    })

    return [myTeam, isLoading, refetch];
};

export default useMyTeam;