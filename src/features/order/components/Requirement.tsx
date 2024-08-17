import { PDFDownloadLink } from '@react-pdf/renderer';
import { ChangeEvent, FC, ReactElement, useRef, useState } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { useGetGigByIdQuery } from 'src/features/gigs/services/gigs.service';
import Button from 'src/shared/button/Button';
import TextAreaInput from 'src/shared/inputs/TextAreaInput';
import { IResponse } from 'src/shared/shared.interface';
import { TimeAgo } from 'src/shared/utils/timeago.util';
import { deleteFromLocalStorage, generateRandomNumber, getDataFromLocalStorage, showErrorToast } from 'src/shared/utils/utils.service';
import { useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

import { OrderContext } from '../context/OrderContext';
import { IOffer, IOrderDocument, IOrderInvoice } from '../interfaces/order.interface';
import { useCreateOrderMutation } from '../services/order.service';
import Invoice from './Invoice/Invoice';

const Requirement: FC = (): ReactElement => {
  const buyer = useAppSelector((state: IReduxState) => state.buyer);
  const [requirement, setRequirement] = useState<string>('');
  const { gigId } = useParams<string>();
  const [searchParams] = useSearchParams({});
  const gigRef = useRef<ISellerGig>();
  const placeholder = 'https://placehold.co/330x220?text=Placeholder';
  const offer: IOffer = JSON.parse(`${searchParams.get('offer')}`);
  const order_date = `${searchParams.get('order_date')}`;
  const serviceFee: number = offer.price < 50 ? (5.5 / 100) * offer.price + 2 : (5.5 / 100) * offer.price;
  const navigate: NavigateFunction = useNavigate();
  const orderId = `JO${generateRandomNumber(11)}`;
  const invoiceId = `JI${generateRandomNumber(11)}`;
  const { data, isSuccess } = useGetGigByIdQuery(`${gigId}`);
  const [createOrder] = useCreateOrderMutation();

  if (isSuccess) {
    gigRef.current = data.gig;
  }
  const orderInvoice: IOrderInvoice = {
    invoiceId,
    orderId,
    date: `${new Date()}`,
    buyerUsername: `${buyer.username}`,
    orderService: [
      {
        service: `${gigRef?.current?.title}`,
        quantity: 1,
        price: offer.price
      },
      {
        service: 'Service Fee',
        quantity: 1,
        price: serviceFee
      }
    ]
  };

  const startOrder = async (): Promise<void> => {
    try {
      const paymentIntentId = getDataFromLocalStorage('paymentIntentId');
      const order: IOrderDocument = {
        offer: {
          gigTitle: offer.gigTitle,
          price: offer.price,
          description: offer.description,
          deliveryInDays: offer.deliveryInDays,
          oldDeliveryDate: offer.oldDeliveryDate,
          newDeliveryDate: offer.newDeliveryDate,
          accepted: true,
          cancelled: offer.cancelled
        },
        gigId: `${gigId}`,
        sellerId: `${gigRef?.current?.sellerId}`,
        sellerImage: `${gigRef?.current?.profilePicture}`,
        sellerUsername: `${gigRef?.current?.username}`,
        sellerEmail: `${gigRef?.current?.email}`,
        gigCoverImage: `${gigRef?.current?.coverImage}`,
        gigMainTitle: `${gigRef?.current?.title}`,
        gigBasicTitle: `${gigRef?.current?.basicTitle}`,
        gigBasicDescription: `${gigRef?.current?.basicDescription}`,
        buyerId: `${buyer._id}`,
        buyerUsername: `${buyer.username}`,
        buyerImage: `${buyer.profilePicture}`,
        buyerEmail: `${buyer.email}`,
        status: 'in progress',
        orderId,
        invoiceId,
        quantity: 1,
        dateOrdered: `${new Date()}`,
        price: offer.price,
        requirements: requirement,
        paymentIntent: `${paymentIntentId}`,
        events: {
          placeOrder: order_date, // this should be the date after successful payment
          requirements: `${new Date()}`,
          orderStarted: `${new Date()}`
        }
      };
      const response: IResponse = await createOrder(order).unwrap();
      navigate(`/orders/${orderId}/activities`, { state: response?.order });
      deleteFromLocalStorage('paymentIntent');
    } catch (error) {
      showErrorToast('Error starting your order.');
    }
  };

  return <div>Requirement</div>;
};

export default Requirement;
