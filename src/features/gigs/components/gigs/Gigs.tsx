import { find } from 'lodash';
import { FC, useRef, useState } from 'react';
import { Location, useLocation, useParams, useSearchParams } from 'react-router-dom';
import GigCardDisplayItem from 'src/shared/gigs/GigCardDisplayItem';
import GigPaginate from 'src/shared/gigs/GigPaginate';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import PageMessage from 'src/shared/page-message/PageMessage';
import {
  categories,
  getDataFromLocalStorage,
  lowerCase,
  replaceAmpersandAndDashWithSpace,
  replaceDashWithSpaces,
  replaceSpacesWithDash,
  saveToLocalStorage
} from 'src/shared/utils/utils.service';
import { v4 as uuidv4 } from 'uuid';

import { IGigsProps, ISellerGig } from '../../interfaces/gig.interface';
import { useSearchGigsQuery } from '../../services/search.service';
import BudgetDropdown from './components/BudgetDropdown';
import DeliveryTimeDropdown from './components/DeliveryTimeDropdown';

const ITEMS_PER_PAGE = 10;

const Gigs = () => {
  return <div>Gigs</div>;
};

export default Gigs;
