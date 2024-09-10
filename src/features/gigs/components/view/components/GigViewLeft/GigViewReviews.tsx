import { FC, ReactElement, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GigContext } from 'src/features/gigs/context/GigContext';
import { IGigViewReviewsProps } from 'src/features/gigs/interfaces/gig.interface';
import { IRatingCategories, IRatingCategoryItem, IReviewDocument } from 'src/features/order/interfaces/review.interface';
import { useGetReviewsByGigIdQuery } from 'src/features/order/services/review.service';
import StarRating from 'src/shared/rating/StarRating';
import { ratingTypes } from 'src/shared/utils/static-data';
import { TimeAgo } from 'src/shared/utils/timeago.util';
import { rating, shortenLargeNumbers } from 'src/shared/utils/util.service';
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

  return (
    <>
      {showRatings && gig && (
        <>
          <div className="mb-10">
            <h2 className="mb-4 text-lg font-bold">Reviews</h2>
            <div className="flex flex-col gap-y-3 pt-2 lg:flex-row lg:gap-x-6">
              <div className="w-full">
                {Object.entries(gig?.ratingCategories as IRatingCategories).map((rating: [string, IRatingCategoryItem]) => (
                  <div key={uuidv4()} className="mb-8 flex flex-col gap-y-2 lg:flex-row lg:gap-x-2">
                    <div className="w-full truncate text-sm lg:w-1/12">
                      {ratingTypes[`${rating[0]}`]} Star{rating[0] === 'one' ? '' : 's'}
                    </div>
                    <div className="flex h-2.5 w-full self-center rounded-full bg-slate-200 lg:w-full">
                      <div
                        className="h-2.5 rounded-full bg-orange-400"
                        style={{ width: `${percentage(rating[1].value, parseInt(`${gig?.ratingSum}`))}%` }}
                      ></div>
                    </div>
                    <div className="w-full text-start text-sm lg:w-1/12 lg:text-end">({shortenLargeNumbers(rating[1].count)})</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr className="border-grey my-3" />
        </>
      )}
    </>
  );
};

export default GigViewReviews;
