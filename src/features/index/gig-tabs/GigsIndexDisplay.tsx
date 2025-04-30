import { find, lowerCase } from 'lodash';
import { FC, ReactElement, useRef, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useGetAuthGigsByCategoryQuery } from 'src/features/auth/services/auth.service';
import { IGigsProps, ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import GigPaginate from 'src/shared/gigs/GigPaginate';
import Header from 'src/shared/header/components/Header';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import PageMessage from 'src/shared/page-message/PageMessage';
import { categories, replaceAmpersandAndDashWithSpace, replaceDashWithSpaces, replaceSpacesWithDash } from 'src/shared/utils/utils.service';
import { v4 as uuidv4 } from 'uuid';

import GigIndexItem from './GigIndexItem';

const ITEMS_PER_PAGE = 12;

const GigsIndexDisplay: FC<IGigsProps> = ({ type }): ReactElement => {
  const [itemFrom, setItemFrom] = useState<string>('0');
  const [paginationType, setPaginationType] = useState<string>('forward');
  const gigsCurrent = useRef<ISellerGig[]>([]);
  const { category } = useParams<string>();
  const [searchParams] = useSearchParams({});
  const location = useLocation();
  let gigs: ISellerGig[] = [];
  let totalGigs = 0;
  const updatedSearchParams: URLSearchParams = new URLSearchParams(searchParams.toString());
  const queryType: string =
    type === 'search'
      ? replaceDashWithSpaces(`${updatedSearchParams}`)
      : `query=${replaceAmpersandAndDashWithSpace(`${lowerCase(`${category}`)}`)}&${updatedSearchParams.toString()}`;
  const { data, isSuccess, isLoading, isError } = useGetAuthGigsByCategoryQuery({
    query: `${queryType}`,
    from: itemFrom,
    size: `${ITEMS_PER_PAGE}`,
    type: paginationType
  });
  return <div>GigsIndexDisplay</div>;
};

export default GigsIndexDisplay;
