import useMyTeam from "../../../Hooks/useMyTeam";
import DataTable from 'react-data-table-component';

const UpcomingEvents = () => {

    const [myTeam, isLoading] = useMyTeam();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const todayDate = `${year}-${month < 10 ? 0 + month : month}-${day < 10 ? 0 + day : day}`;

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

    function remainngDays (birthday, today) {
        const birthdate = new Date(birthday);
        const currentDate = new Date(today);
        const currentYear = currentDate.getFullYear();
        const nextBirthday = new Date(currentYear, birthdate.getMonth(), birthdate.getDate());
        const differenceInMilliseconds = nextBirthday - currentDate;
        const daysUntilBirthday = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        return daysUntilBirthday;
    }

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
            name: 'Date of Birth',
            selector: row => row.birthday,
            sortable: true
        },
        {
            name: 'Remaining Days',
            selector: row => <div>
                {`${remainngDays(row.birthday, todayDate)}` == 0 && 'Birthday is Today' }
                {`${remainngDays(row.birthday, todayDate)}` > 0 && `${remainngDays(row.birthday, todayDate)} Days`}
                {`${remainngDays(row.birthday, todayDate)}` < 0 && 'Birthday is Gone'}
            </div>,
            sortable: true
        },
    ];

    const newData = myTeam.filter(data => {
        const birthMonth = new Date(data.birthdate).getMonth();
        return birthMonth == currentMonth;
    }).map((member, index) => ({
        id: index + 1,
        profile: member.img,
        name: member.name,
        birthday: member.birthdate,
    }))

    return (
        <div>
            <div className='p-12 lg:px-24 lg:py-5'>
                <DataTable
                    title='Upcoming Events Sections'
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

export default UpcomingEvents;