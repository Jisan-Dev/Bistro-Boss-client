import React, { useEffect, useState } from 'react';
import SectionHeader from '../../../components/SectionHeader';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import useCart from '../../../hooks/useCart';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  // const [clientSecret, setClientSecret] = useState('');
  // const axiosSecure = useAxiosSecure();
  // const [cart] = useCart();

  // const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);
  // useEffect(() => {
  //   axiosSecure.post('/create-payment-intent', { price: totalPrice }).then((res) => {
  //     console.log(res.data);
  //     setClientSecret(res.data.clientSecret);
  //   });
  // }, [axiosSecure, totalPrice]);

  // const appearance = {
  //   theme: 'stripe',
  // };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };

  return (
    <div>
      <SectionHeader heading="Payment" subHeading="Please pay to eat" />(
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      )
    </div>
  );
};

export default Payment;
