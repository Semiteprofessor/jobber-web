import React, { FC, ReactElement } from 'react';
import { IGigsProps, ISellerGig } from 'src/features/gigs/interfaces/gig.interface';

const GigIndexItem: FC<IGigsProps> = ({ gig }): ReactElement => {
  const gigData: ISellerGig = gig as ISellerGig;
  return <div>GigIndexItem</div>;
};

export default GigIndexItem;
