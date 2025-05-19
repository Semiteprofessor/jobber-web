import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GigContext } from 'src/features/gigs/context/GigContext';
import { useGetReviewsByGigIdQuery } from 'src/features/order/services/review.service';
import StarRating from 'src/shared/rating/StarRating';
import { ratingTypes } from 'src/shared/utils/static-data';
import { TimeAgo } from 'src/shared/utils/timeago.util';
import { rating, shortenLargeNumbers } from 'src/shared/utils/util.service';
import { v4 as uuidv4 } from 'uuid';
const GigViewReviews = ({ showRatings, reviews, hasFetchedReviews }) => {
    const { gigId } = useParams();
    const { gig } = useContext(GigContext);
    const { data, isSuccess } = useGetReviewsByGigIdQuery(`${gigId}`, { skip: hasFetchedReviews });
    if (isSuccess && !hasFetchedReviews) {
        reviews = data.reviews;
    }
    const percentage = (partialValue, totalValue) => {
        return (100 * partialValue) / totalValue;
    };
    return (_jsxs(_Fragment, { children: [showRatings && gig && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "mb-10", children: [_jsx("h2", { className: "mb-4 text-lg font-bold", children: "Reviews" }), _jsx("div", { className: "flex flex-col gap-y-3 pt-2 lg:flex-row lg:gap-x-6", children: _jsx("div", { className: "w-full", children: Object.entries(gig?.ratingCategories).map((rating) => (_jsxs("div", { className: "mb-8 flex flex-col gap-y-2 lg:flex-row lg:gap-x-2", children: [_jsxs("div", { className: "w-full truncate text-sm lg:w-1/12", children: [ratingTypes[`${rating[0]}`], " Star", rating[0] === 'one' ? '' : 's'] }), _jsx("div", { className: "flex h-2.5 w-full self-center rounded-full bg-slate-200 lg:w-full", children: _jsx("div", { className: "h-2.5 rounded-full bg-orange-400", style: { width: `${percentage(rating[1].value, parseInt(`${gig?.ratingSum}`))}%` } }) }), _jsxs("div", { className: "w-full text-start text-sm lg:w-1/12 lg:text-end", children: ["(", shortenLargeNumbers(rating[1].count), ")"] })] }, uuidv4()))) }) })] }), _jsx("hr", { className: "border-grey my-3" })] })), _jsx("div", { className: "flex flex-col gap-6", children: reviews &&
                    reviews.map((item) => (_jsx("div", { children: _jsxs("div", { className: "flex flex-col gap-y-3 md:flex-row md:gap-x-4", children: [_jsx("img", { className: "flex self-center h-12 w-12 mt-4 rounded-full object-cover md:self-auto", src: item.reviewerImage, alt: "Reviewer Image" }), _jsxs("div", { className: "flex flex-col self-center", children: [_jsx("div", { className: "flex cursor-pointer self-center pt-0 no-underline md:block md:self-start md:pt-4", children: _jsx("span", { className: "text-base font-bold md:mb-5", children: item.reviewerUsername }) }), _jsx("span", { className: "flex self-center text-sm md:block md:self-start", children: item.country }), _jsxs("div", { className: "flex w-full gap-x-1 self-center justify-center md:justify-start", children: [_jsx("div", { className: "mt-1 w-20 gap-x-2", children: _jsx(StarRating, { value: rating(item.rating), size: 14 }) }), _jsxs("div", { className: "ml-2 mt-[1px] flex gap-1 text-sm", children: [_jsx("span", { className: "text-orange-400", children: rating(item.rating) }), "|", _jsx("span", { children: TimeAgo.chatMessageTransform(`${item.createdAt}`) })] })] }), _jsx("p", { className: "mt-2 text-sm text-center md:text-base md:text-left", children: item.review })] })] }) }, uuidv4()))) })] }));
};
export default GigViewReviews;
