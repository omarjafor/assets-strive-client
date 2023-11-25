import logo from '../../../public/logo.png';

const JoinAdmin = () => {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        <img src={logo}
                            className="w-mx-auto" />
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-full flex-1">
                            <div className="flex flex-col items-center">
                                <h2
                                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 text-white hover:text-black hover:bg-gradient-to-l flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                    Join as HR/Admin
                                </h2>
                            </div>

                            <div className="mx-auto mt-12 max-w-xs">
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat bg-[url('https://i.ibb.co/hsvTd7Z/admin.png')]"
                    >
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinAdmin;