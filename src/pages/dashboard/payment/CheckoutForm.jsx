import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
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
    } else {
      console.log('[paymentMethod]', paymentMethod);
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
      <button className="px-6 py-2 rounded-lg mt-4 bg-orange-600 hover:bg-orange-500 text-white" type="submit" disabled={!stripe}>
        PAY
      </button>
    </form>
  );
};

export default CheckoutForm;
