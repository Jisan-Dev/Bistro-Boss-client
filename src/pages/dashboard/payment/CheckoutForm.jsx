import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';

const CheckoutForm = () => {
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cart] = useCart();

  const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);
  console.log(totalPrice);

  useEffect(() => {
    axiosSecure.post('/create-payment-intent', { price: totalPrice }).then((res) => {
      console.log('eta');
      console.log(res.data);
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[paymentError]', error);
      setError(error.message);
    } else {
      console.log('[paymentMethod]', paymentMethod);
      setError('');
    }

    // confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.name || 'anonymous',
        },
      },
    });
    if (confirmError) {
      console.log('confirmError ', confirmError);
    } else {
      console.log('paymentIntent ', paymentIntent.id);
      console.log('transaction id', paymentIntent.id);
      setTransactionId(paymentIntent.id);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-6 shadow-lg rounded-lg w-[800px] mx-auto">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '20px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
              iconColor: '#f59300',
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button className="px-6 py-2 rounded-lg mt-4 bg-orange-600 hover:bg-orange-500 text-white" type="submit" disabled={!stripe}>
        PAY
      </button>
      {transactionId && (
        <p className="text-green-500">
          Payment confirmed. Your transaction id is : <strong> {transactionId} </strong>
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
