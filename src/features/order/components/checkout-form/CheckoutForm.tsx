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

  return <div>CheckoutForm</div>;
};

export default CheckoutForm;
