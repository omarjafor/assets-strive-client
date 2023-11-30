import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Rectangle } from 'recharts';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const StaticsBarCharts = () => {
    const axiosSecure = useAxiosSecure();

    const { data: state = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/service-state');
            return res.data;
        }
    })

    const { users, assets, requests, customrequests } = state || {};

    const data = [
        {
            name: 'Users',
            uv: users,
        },
        {
            name: 'Assets',
            uv: assets,
        },
        {
            name: 'Requests',
            uv: requests,
        },
        {
            name: 'Custom',
            uv: customrequests,
        }
    ];

    return (
        <div>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pv" fill="#0088FE" activeBar={<Rectangle fill="#00C49F" stroke="blue" />} />
                <Bar dataKey="uv" fill="#00C49F" activeBar={<Rectangle fill="#0088FE" stroke="purple" />} />
            </BarChart>
        </div>
    );
};

export default StaticsBarCharts;