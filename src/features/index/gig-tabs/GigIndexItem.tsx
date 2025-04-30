import React, { FC, ReactElement } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { IGigsProps, ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { replaceSpacesWithDash } from 'src/shared/utils/util.service';

const GigIndexItem: FC<IGigsProps> = ({ gig }): ReactElement => {
  const gigData: ISellerGig = gig as ISellerGig;
  const title: string = replaceSpacesWithDash(gigData.title);
  return (
    <div className="rounded">
      <div className="mb-8 flex cursor-pointer flex-col gap-2">
        <Link to={`/gig/${gigData.id}/${title}`}>
          <LazyLoadImage
            src={gigData.coverImage}
            alt="Gig cover image"
            className="w-full rounded-lg"
            placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
            effect="blur"
          />
        </Link>
      </div>
    </div>
  );
};

export default GigIndexItem;
