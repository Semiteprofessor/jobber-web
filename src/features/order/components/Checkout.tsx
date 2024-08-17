import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { FaCog, FaRegClock, FaRegMoneyBillAlt } from 'react-icons/fa';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { IResponse } from 'src/shared/shared.interface';
import { saveToLocalStorage, showErrorToast } from 'src/shared/utils/utils.service';

import { IOffer } from '../interfaces/order.interface';
import { useCreateOrderIntentMutation } from '../services/order.service';
import CheckoutForm from './checkout-form/CheckoutForm';

const Checkout: FC = (): ReactElement => {
  const stripePromise = useMemo(() => loadStripe(import.meta.env.VITE_STRIPE_KEY), []);
  const [clientSecret, setClientSecret] = useState<string>('');
  const { gigId } = useParams<string>();
  const [searchParams] = useSearchParams({});
  const { state }: { state: ISellerGig } = useLocation();
  const [offer] = useState<IOffer>(JSON.parse(`${searchParams.get('offer')}`));
  const serviceFee: number = offer.price < 50 ? (5.5 / 100) * offer.price + 2 : (5.5 / 100) * offer.price;
  const [createOrderIntent] = useCreateOrderIntentMutation();

  const createBuyerOrderIntent = async (): Promise<void> => {
    try {
      const response: IResponse = await createOrderIntent(offer.price).unwrap();
      setClientSecret(`${response.clientSecret}`);
      saveToLocalStorage('paymentIntentId', JSON.stringify(`${response.paymentIntentId}`));
    } catch (error) {
      showErrorToast('Error with checkout.');
    }
  };
  return <div>Checkout</div>;
};

export default Checkout;
