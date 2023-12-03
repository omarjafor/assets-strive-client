

const About = () => {
    return (
        <div className="mx-40 my-10">
            <div className="text-left mb-4 items-center mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Asset Strive for Asset Management
                </h1>

                <p className="mt-1.5 text-lg text-gray-500">
                    As one of the world&apos;s leading assets managers, help you achieve goals 🎉
                </p>
            </div>
            <div className="sm:flex flex-col lg:flex-row gap-4 items-center justify-evenly mx-auto  p-12 lg:p-6 dark:bg-gray-900 dark:text-white">
                <div className="w-1/2">
                    <div className="image object-center text-center">
                        <img src="https://i.ibb.co/SPz2bzj/about.png" />
                    </div>
                </div>
                <div className="w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-left space-y-3 max-w-md">
                        <img src="https://i.ibb.co/QQQRyyg/man.png" alt="" className="h-16" />
                        <h2 className="text-lg font-semibold">Our Clients at the Center</h2>
                        <p className="text-base">Helping our clients achieve their goals is our first priority.</p>
                    </div>
                    <div className="text-left space-y-3 max-w-md">
                        <img src="https://i.ibb.co/jLY7hkZ/owner.png" alt="" className="h-16" />
                        <h2 className="text-lg font-semibold">Meeting our Clients’ Needs
</h2>
                        <p className="text-base">To best serve our clients’ needs, we have built our business to be global.</p>
                    </div>
                    <div className="text-left space-y-3 max-w-md">
                        <img src="https://i.ibb.co/pxHL2d1/digital.png" alt="" className="h-16" />
                        <h2 className="text-lg font-semibold">Culture of Excellence
</h2>
                        <p className="text-base">We foster a culture of excellence as investors, partners and risk managers.</p>
                    </div>
                    <div className="text-left space-y-3 max-w-md">
                        <img src="https://i.ibb.co/St2PVfm/money.png" alt="" className="h-16" />
                        <h2 className="text-lg font-semibold">Client-Centric Operations</h2>
                        <p className="text-base">At the core of our business model rests to client-centric operations.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;