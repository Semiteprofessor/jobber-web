import React, { FC } from 'react';
import { IGigPaginateProps } from 'src/features/gigs/interfaces/gig.interface';

const GigPaginate: FC<IGigPaginateProps> = ({
  gigs,
  totalGigs,
  showNumbers,
  itemsPerPage,
  setItemFrom,
  setPaginationType
}): ReactElement => {
  return <div>GigPaginate</div>;
};

export default GigPaginate;
