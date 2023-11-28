import useMyTeam from "../../../Hooks/useMyTeam";
import DataTable from 'react-data-table-component';
import { FaUserTie } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";

const TeamMemberList = () => {

    const [myTeam, isLoading] = useMyTeam();

    if (isLoading) return (
        <div className="mx-auto items-center text-center">
            <div className="animate-pulse block-item shadow-md max-w-xl mx-auto mt-20">
                <div className="bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black h-6 rounded-t-3xl"></div>
                <div className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                        <div className="h-7 w-7 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-full"></div>
                        <div className="h-3 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-full w-1/3"></div>
                    </div>
                    <div className="my-6">
                        <div className="h-5 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-full w-3/4"></div>
                        <div className="my-4">
                            <div className="h-3 my-2 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-full w-full"></div>
                            <div className="h-3 my-2 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-full w-5/6"></div>
                            <div className="h-3 my-2 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-full w-4/6"></div>
                            <div className="h-3 my-2 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-full w-5/6"></div>
                            <div className="h-3 my-2 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-full w-3/6"></div>
                            <div className="h-3 my-2 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-full w-2/6"></div>
                        </div>
                    </div>
                    <div className="my-4">
                        <div className="h-11 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-lg w-full"></div>
                        <div className="h-3 my-4 mx-auto bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 dark:from-gray-500 dark:via-gray-900 dark:to-black rounded-full w-1/2"></div>
                    </div>
                </div>
            </div>
        </div>);

    const columns = [
        {
            name: 'Serial Number',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'Profile Photo',
            selector: row => <div className="avatar">
                <div className="w-16 rounded-3xl">
                    <img src={row.profile} />
                </div>
            </div>,
            sortable: true
        },
        {
            name: 'Profile Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Member Type',
            selector: row => <div>
                {row.role == 'employee' && <><FaUserTie className="text-3xl ml-3"></FaUserTie> Employee</>}
                {row.role == 'admin' && <><RiAdminFill className="text-3xl ml-3"></RiAdminFill> Admin</>}
            </div>,
            sortable: true
        }
    ];
    console.log(myTeam);
    const newData = myTeam.map((member, index) => ({
        id: index + 1,
        profile: member.img,
        name: member.name,
        birthday: member.birthdate,
        role: member.role
    }))

    return (
        <div>
            <div className='p-12 lg:px-24 lg:py-5'>
                <DataTable
                    title='Team Member List Sections'
                    columns={columns}
                    data={newData}
                    fixedHeader
                    pagination
                    highlightOnHover
                />
            </div>
        </div>
    );
};

export default TeamMemberList;