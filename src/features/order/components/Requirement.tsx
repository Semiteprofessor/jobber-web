import { PDFDownloadLink } from '@react-pdf/renderer';
import { ChangeEvent, FC, ReactElement, useRef, useState } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { useGetGigByIdQuery } from 'src/features/gigs/services/gigs.service';
import Button from 'src/shared/button/Button';
import TextAreaInput from 'src/shared/inputs/TextAreaInput';
import { IResponse } from 'src/shared/shared.interface';
import { TimeAgo } from 'src/shared/utils/timeago.utils';
import { deleteFromLocalStorage, generateRandomNumber, getDataFromLocalStorage, showErrorToast } from 'src/shared/utils/utils.service';
import { useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

import { OrderContext } from '../context/OrderContext';
import { IOffer, IOrderDocument, IOrderInvoice } from '../interfaces/order.interface';
import { useCreateOrderMutation } from '../services/order.service';
import Invoice from './Invoice/Invoice';

const Requirement = () => {
  return <div>Requirement</div>;
};

export default Requirement;
