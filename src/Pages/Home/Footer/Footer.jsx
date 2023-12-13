import { Link } from "react-router-dom";
import logo from './../../../../public/logo.png';


const Footer = () => {
    return (
        <div className="flex items-end w-full">

            <footer className="w-full text-gray-700 bg-gradient-to-br from-teal-400 via-cyan-500 to-cyan-900 hover:bg-gradient-to-tl body-font dark:from-gray-700 dark:via-gray-900 dark:to-black">
                <div
                    className="container flex flex-col flex-wrap p-5 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
                    <div className="flex-shrink-0 w-72 mx-auto text-center md:mx-0 md:text-left">
                        <Link to='/'><img src={logo} alt="" className="h-32" /></Link>
                        <div className="mt-4">
                            <span className="flex lg:justify-start justify-items-center mt-2 justify-center">

                                <a className="text-white cursor-pointer hover:text-gray-700" href="https://www.facebook.com/omarjaforchy" target="blank">
                                    <img src="https://i.ibb.co/w0ZjxMz/facebook.png" alt="" className="w-10 h-10" />
                                </a>
                                <a className="ml-3 text-white cursor-pointer hover:text-gray-700">
                                    <img src="https://i.ibb.co/Rjk4dw2/instagram.png" alt="" className="w-10 h-10" />
                                </a>
                                <a className="ml-3 text-white cursor-pointer hover:text-gray-700" target="blank" href="https://www.linkedin.com/in/omarjaforchy">
                                    <img src="https://i.ibb.co/1JGFPJk/linkedin.png" alt="" className="w-10 h-10" />
                                </a>
                                <a className="ml-3 text-white cursor-pointer hover:text-gray-700">
                                    <img src="https://i.ibb.co/8PKZfxC/youtube.png" alt="" className="w-10 h-10" />
                                </a>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
                        <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                            <h2 className="mb-3 text-sm font-bold tracking-widest text-black dark:text-white uppercase title-font">About</h2>
                            <nav className="mb-10 list-none">
                                <li className="mt-3">
                                    <a className="text-white cursor-pointer hover:text-gray-900">Company</a>
                                </li>
                                <li className="mt-3">
                                    <a className="text-white cursor-pointer hover:text-gray-900">Careers</a>
                                </li>
                                <li className="mt-3">
                                    <a className="text-white cursor-pointer hover:text-gray-900">Blog</a>
                                </li>
                            </nav>
                        </div>
                        <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                            <h2 className="mb-3 text-sm font-bold tracking-widest text-black dark:text-white uppercase title-font">Support</h2>
                            <nav className="mb-10 list-none">
                                <li className="mt-3">
                                    <a className="text-white cursor-pointer hover:text-gray-900">Contact Support</a>
                                </li>
                                <li className="mt-3">
                                    <a className="text-white cursor-pointer hover:text-gray-900">Help Resources</a>
                                </li>
                                <li className="mt-3">
                                    <a className="text-white cursor-pointer hover:text-gray-900">Release Updates</a>
                                </li>
                            </nav>
                        </div>
                        <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                            <h2 className="mb-3 text-sm font-bold tracking-widest text-black dark:text-white uppercase title-font">Platform
                            </h2>
                            <nav className="mb-10 list-none">
                                <li className="mt-3">
                                    <a className="text-white cursor-pointer hover:text-gray-900">Terms &amp; Privacy</a>
                                </li>
                                <li className="mt-3">
                                    <a className="text-white cursor-pointer hover:text-gray-900">Pricing</a>
                                </li>
                                <li className="mt-3">
                                    <a className="text-white cursor-pointer hover:text-gray-900">FAQ</a>
                                </li>
                            </nav>
                        </div>
                        <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                            <h2 className="mb-3 text-sm font-bold tracking-widest text-black dark:text-white uppercase title-font">Contact</h2>
                            <nav className="mb-10 list-none">
                                <li className="mt-3">
                                    <a className="text-white cursor-pointer hover:text-gray-900">Send a Message</a>
                                </li>
                                <li className="mt-3">
                                    <a className="text-white cursor-pointer hover:text-gray-900">Request a Quote</a>
                                </li>
                                <li className="mt-3">
                                    <a className="text-white cursor-pointer hover:text-gray-900">+880123-456-7890</a>
                                </li>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-green-300 via-blue-500 to-teal-600 dark:bg-gradient-to-l dark:from-gray-700 dark:via-gray-900 dark:to-black">
                    <div className="container px-5 py-4 mx-auto">
                        <p className="text-sm text-white font-medium capitalize text-center">© 2023 All rights reserved by OMAR JAFOR</p>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default Footer;