

const About = () => {
    return (
        <div className="sm:flex items-center max-w-screen-xl mx-auto  p-12 lg:p-6 dark:bg-gray-900 dark:text-white">
            <div className="sm:w-1/2 p-10">
                <div className="image object-center text-center">
                    <img src="https://i.ibb.co/SPz2bzj/about.png" />
                </div>
            </div>
            <div className="sm:w-1/2">
                <div className="text">
                    <span className="text-gray-500 dark:text-gray-200 border-b-2 border-indigo-600 uppercase">About us</span>
                    <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">About <span className="text-indigo-600">Asset Strive</span>
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                        At Asset Strive, we empower businesses to take control of their assets seamlessly. Our platform offers a comprehensive solution for companies of all sizes, providing a centralized hub for efficient asset management. Whether you&apos;re a growing startup or an established enterprise, our user-friendly interface allows companies to join as administrators, gaining access to robust tools for asset oversight, maintenance, and optimization.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;