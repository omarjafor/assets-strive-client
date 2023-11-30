import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { FaStripe } from "react-icons/fa";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useMyData from "../../Hooks/useMyData";

const CheckoutForm = ({ price }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [myData] = useMyData();
    const { email, name } = myData || {};
    // const price = parseInt(amount);

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, price])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('Payment Error', error);
            setError(error.message);
        } else {
            console.log('Payment Method', paymentMethod);
            setError('');
        }

        // confirm payment 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: email || 'anonymous',
                    name: name || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('Confirm Error');
        } else {
            console.log('Payment Intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('Transaction ID', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                //Now Save the payment in the database
                const payment = {
                    email: email,
                    payment: parseInt(price),
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    role: 'admin'
                }

                const res = await axiosSecure.put('/users/payment', payment);
                console.log(res.data);
                if (res.data?.modifiedCount > 0) {
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Thank You for the Payment",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/admin/home')
                }
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            ></CardElement>
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                <FaStripe className="text-2xl"></FaStripe> Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}

        </form>
    );
};

export default CheckoutForm;