import About from "./About/About";
import Banner from "./Banner/Banner";
import Packages from "./Packages/Packages";
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div className="dark:bg-gray-900">
            <Helmet>
                <title> Asset Strive | Home </title>
            </Helmet>
            <Banner></Banner>
            <About></About>
            <Packages></Packages>
        </div>
    );
};

export default Home;