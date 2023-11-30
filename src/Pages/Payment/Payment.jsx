import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {

    const { price } = useParams();
    console.log(price);

    return (
        <div className="lg:mx-96 lg:p-10">
            <Helmet>
                <title>Asset Strive | Make Payment </title>
            </Helmet>
            <div className="text-center py-10">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-5xl">
                    Please Pay Your Package Amount
                </h2>
            </div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm 
                        price={price}
                    ></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;