import './CheckoutForm.scss';

import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Stripe, StripeElements, StripePaymentElement } from '@stripe/stripe-js';
import { FC, FormEvent, ReactElement, useEffect, useState } from 'react';
import { createSearchParams } from 'react-router-dom';
import Button from 'src/shared/button/Button';

import { ICheckoutProps } from '../../interfaces/order.interface';
import CheckoutFormSkeleton from './CheckoutFormSkeleton';

const CLIENT_ENDPOINT = import.meta.env.VITE_CLIENT_ENDPOINT;

const CheckoutForm: FC<ICheckoutProps> = ({ gigId, offer }): ReactElement => {
  const [isStripeLoading, setIsStripeLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const stripe: Stripe | null = useStripe();
  const elements: StripeElements | null = useElements();

  useEffect(() => {
    if (elements) {
      const element = elements.getElement(PaymentElement) as StripePaymentElement;
      if (element) {
        setIsStripeLoading(false);
      }
    }
  }, [elements]);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret: string = new URLSearchParams(window.location.search).get('payment_intent_client_secret') as string;
    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  return <div>CheckoutForm</div>;
};

export default CheckoutForm;
