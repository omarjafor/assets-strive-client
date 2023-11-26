import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../public/logo.png';
import useAuth from '../../Hooks/useAuth';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import auth from '../../Firebase/firebase.config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Login = () => {
    const axiosPublic = useAxiosPublic();
    const location = useLocation();

    const { signIn, googleSignIn } = useAuth();
    const emailRef = useRef(null);

    const [registError, setRegistError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        setRegistError('');

        const toastId = toast.loading('Your Login in....')
        signIn(email, password)
            .then(result => {
                console.log(result.user);
                e.target.reset();
                toast.success('Your Login successfull', { id: toastId });
                navigate(location?.state ? location.state : '/user/home');
            })
            .catch(error => {
                console.log(error.message);
                toast.error('Your Login Error', { id: toastId });
                setRegistError('Check Your Email or Password');
            })
    }

    const handleGoogleSignIn = () => {

        const toastId = toast.loading('Your Login in....')
        googleSignIn()
            .then(res => {
                console.log(res.user)
                const userInfo = {
                    email: res.user?.email,
                    name: res.user?.displayName,
                    img: res.user?.photoURL,
                    role: 'user'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/user/home')
                    })
                toast.success('Your Login successfull', { id: toastId });
                navigate(location?.state ? location.state : '/');
            })
            .catch(err => {
                console.log(err.message)
                toast.error('Your Login Error', { id: toastId });
            })
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setEmailError('');

        if (!email) {
            setEmailError('First give your email');
        } else if (!emailPattern.test(email)) {
            setEmailError('Write a valid email address');
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success('Please Check Your Email');
            })
            .catch(error => {
                console.log(error.message);
            })
    }

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
                                <button onClick={handleGoogleSignIn}
                                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 text-white hover:bg-gradient-to-l flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                    <div className="bg-white p-2 rounded-full">
                                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                                            <path
                                                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                fill="#4285f4" />
                                            <path
                                                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                fill="#34a853" />
                                            <path
                                                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                fill="#fbbc04" />
                                            <path
                                                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                fill="#ea4335" />
                                        </svg>
                                    </div>
                                    <span className="ml-4">
                                        Sign In with Google
                                    </span>
                                </button>

                            </div>

                            <div className="my-3 border-b text-center">
                                <div
                                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Or sign In with AssetStrive E-mail
                                </div>
                            </div>

                            <form onSubmit={handleLogin} className="mx-auto max-w-xs">
                                    <div className="flex flex-col gap-4 p-6">
                                        <div className="relative h-11 w-full">
                                            <input
                                                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                placeholder=" " name="email" type="email" ref={emailRef} required
                                            />
                                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                Email
                                            </label>
                                        </div>
                                        <div className="relative h-11 w-full">
                                            <input
                                                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                placeholder=" " name="password" type={showPass ? "text" : "password"} required
                                            />
                                            <span className="cursor-pointer absolute right-2 top-4" onClick={() => setShowPass(!showPass)}>
                                                {
                                                    showPass ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiFillEye></AiFillEye>
                                                }
                                            </span>
                                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                Password
                                            </label>
                                        </div>
                                        <div className="-ml-2.5">
                                        <div className="text-left ml-6 cursor-pointer text-sm font-normal">
                                                <a onClick={handleForgetPassword}>Forget Password?</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                    <button type="submit"
                                        className="tracking-wide font-semibold bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 text-white hover:bg-gradient-to-l text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-2">
                                            Sign In
                                        </span>
                                    </button>
                                        {
                                            registError && <p className="text-red-600"> {registError} </p>
                                        }
                                        {
                                            emailError && <p className="text-red-600"> {emailError} </p>
                                        }
                                        <p className="mt-6 mb-2 flex justify-center font-sans text-sm font-normal leading-normal text-inherit antialiased">
                                            Don&apos;t have an account?
                                            <Link to='/joinemployee'
                                                href="#signup"
                                                className="ml-1 block font-sans text-sm font-bold leading-normal text-blue-500 hover:text-green-800 antialiased"
                                            >
                                                Sign up
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    I agree to abide by Asset Strive &nbsp;
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Terms of Service &nbsp;
                                    </a>
                                    and its &nbsp;
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Privacy Policy
                                    </a>
                                </p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-gradient-to-r from-teal-400 via-cyan-500 to-cyan-900 text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat bg-[url('https://i.ibb.co/jW4TZGW/login.png')]"
                        >
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;