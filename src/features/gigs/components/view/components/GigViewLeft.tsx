import { FC, ReactElement, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GigContext } from 'src/features/gigs/context/GigContext';
import { IGigViewReviewsProps } from 'src/features/gigs/interfaces/gig.interface';
import { IRatingCategories, IRatingCategoryItem, IReviewDocument } from 'src/features/order/interfaces/review.interface';
import { useGetReviewsByGigIdQuery } from 'src/features/order/services/review.service';
import StarRating from 'src/shared/rating/StarRating';
import { ratingTypes } from 'src/shared/utils/static-data';
import { TimeAgo } from 'src/shared/utils/timeago.utils';
import { rating, shortenLargeNumbers } from 'src/shared/utils/utils.service';
import { v4 as uuidv4 } from 'uuid';

const GigViewReviews: FC<IGigViewReviewsProps> = ({ showRatings, reviews, hasFetchedReviews }): ReactElement => {
  const { gigId } = useParams<string>();
  const { gig } = useContext(GigContext);
  const { data, isSuccess } = useGetReviewsByGigIdQuery(`${gigId}`, { skip: hasFetchedReviews });
  if (isSuccess && !hasFetchedReviews) {
    reviews = data.reviews as IReviewDocument[];
  }

  const percentage = (partialValue: number, totalValue: number): number => {
    return (100 * partialValue) / totalValue;
  };

  return <div>GigViewLeft</div>;
};

export default GigViewLeft;
