import { Link } from "react-router-dom";


const Banner = () => {

    return (
        <div className="carousel w-full h-[600px]">
            <div id="slide1" className="carousel-item relative w-full">
                <img src='https://i.ibb.co/H24CQkf/asset-banner.jpg' className="w-full" />
                <div className="absolute flex items-center text-left h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <div className='text-white space-y-7 pl-12 w-1/2'>
                        <h2 className='text-2xl lg:text-6xl font-bold'>Join As Admin and Empower Operations, Drive Efficiency!</h2>
                        <p>As an admin, play a pivotal role in supporting your organizations efficiency, managing resources, and contributing to the overall success of your asset operations.</p>
                        <div>
                            <Link to='/joinadmin' className="btn btn-outline btn-info">Join as HR/Admin</Link>
                        </div>
                    </div>
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide4" className="btn btn-circle mr-5">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img src='https://i.ibb.co/nRWxcDh/asset-banner-2.jpg' className="w-full" />
                <div className="absolute flex items-center text-left h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                    <div className='text-white space-y-7 pl-12 w-1/2'>
                        <h2 className='text-2xl lg:text-6xl font-bold'>Join As Employee and Shape the Future!</h2>
                        <p>As an employee, Working on innovative projects, and shaping the future of your organization. Explore our diverse roles and join us in creating impactful solutions that make a difference.</p>
                        <div>
                            <Link to='/joinemployee' className="btn btn-outline btn-info">Join as an Employee</Link>
                        </div>
                    </div>
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide1" className="btn btn-circle mr-5">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Banner;