import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import { useGetSellerByIdQuery } from 'src/features/sellers/services/seller.service';
import TopGigsView from 'src/shared/gigs/TopGigsView';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import StarRating from 'src/shared/rating/StarRating';
import { emptyGigData, emptySellerData } from 'src/shared/utils/static-data';
import { rating, shortenLargeNumbers } from 'src/shared/utils/util.service';
import { GigContext } from '../../../gigs/context/GigContext';
import { useGetGigByIdQuery, useGetMoreGigsLikeThisQuery } from '../../services/gigs.service';
import GigViewLeft from './components/GigViewLeft';
import GigViewRight from './components/GigViewRight';
const GigView = () => {
    const { gigId, sellerId } = useParams();
    const { data: gigData, isSuccess: isGigDataSuccess, isLoading: isGigLoading } = useGetGigByIdQuery(`${gigId}`);
    const { data: sellerData, isSuccess: isSellerDataSuccess, isLoading: isSellerLoading } = useGetSellerByIdQuery(`${sellerId}`);
    const { data: moreGigsData, isSuccess: isMoreGigsSuccess, isLoading: isMoreGigsLoading } = useGetMoreGigsLikeThisQuery(`${gigId}`);
    const gig = useRef(emptyGigData);
    const seller = useRef(emptySellerData);
    const moreGigs = useRef([]);
    const isLoading = isGigLoading && isSellerLoading && isMoreGigsLoading;
    if (isGigDataSuccess) {
        gig.current = gigData.gig;
    }
    if (isSellerDataSuccess) {
        seller.current = sellerData.seller;
    }
    if (isMoreGigsSuccess) {
        moreGigs.current = moreGigsData.gigs;
    }
    return (_jsx(_Fragment, { children: isLoading ? (_jsx(CircularPageLoader, {})) : (_jsxs("main", { className: "max-w-8xl container mx-auto mt-8", children: [_jsx("h2", { className: "mb-4 px-4 text-xl font-bold text-[#404145] lg:text-3xl", children: gig.current.title }), _jsxs("div", { className: "mb-4 flex flex-row gap-x-2 px-4", children: [_jsx("img", { className: "flex h-8 w-8 self-center rounded-full object-cover", src: gig.current.profilePicture, alt: "" }), _jsx("span", { className: "flex self-center font-extrabold", children: gig.current.username }), _jsx(_Fragment, { children: gig.current.ratingSum && gig.current.ratingsCount && gig.current.ratingSum >= 1 && gig.current.ratingsCount >= 1 ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "flex self-center", children: "|" }), _jsxs("div", { className: "flex w-full gap-x-1 self-center", children: [_jsx("div", { className: "mt-1 w-20 gap-x-2", children: _jsx(StarRating, { value: rating(gig.current.ratingSum / gig.current.ratingsCount), size: 14 }) }), _jsxs("div", { className: "ml-2 mt-[1px] flex gap-1 text-sm", children: [_jsx("span", { className: "text-orange-400", children: rating(gig.current.ratingSum / gig.current.ratingsCount) }), _jsxs("span", { className: "", children: ["(", shortenLargeNumbers(gig.current.ratingsCount), ")"] })] })] })] })) : (_jsx(_Fragment, {})) })] }), _jsx(GigContext.Provider, { value: { gig: gig.current, seller: seller.current, isSuccess: isGigDataSuccess, isLoading: isGigLoading }, children: _jsxs("div", { className: "flex flex-wrap", children: [_jsx("div", { className: "order-last w-full p-4 lg:order-first lg:w-2/3", children: _jsx(GigViewLeft, {}) }), _jsx("div", { className: "w-full p-4 lg:w-1/3 ", children: _jsx(StickyBox, { offsetTop: 10, offsetBottom: 10, children: _jsx(GigViewRight, {}) }) })] }) }), moreGigs.current.length > 0 ? (_jsx("div", { className: "m-auto px-6 xl:container md:px-12 lg:px-6", children: _jsx(TopGigsView, { gigs: moreGigs.current, title: "Recommended for you", subTitle: "", width: "w-60", type: "home" }) })) : (_jsx(_Fragment, {}))] })) }));
};
export default GigView;
