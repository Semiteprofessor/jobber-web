import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import GigViewReviews from 'src/features/gigs/components/view/components/GigViewLeft/GigViewReviews';
import { useGetGigsBySellerIdQuery } from 'src/features/gigs/services/gigs.service';
import { useGetReviewsBySellerIdQuery } from 'src/features/order/services/review.service';
import Breadcrumb from 'src/shared/breadcrumb/Breadcrumb';
import GigCardDisplayItem from 'src/shared/gigs/GigCardDisplayItem';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import { v4 as uuidv4 } from 'uuid';
import { useGetSellerByIdQuery } from '../../services/seller.service';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import SellerOverview from './components/SellerOverview';
const SellerProfile = () => {
    const [type, setType] = useState('Overview');
    const { sellerId } = useParams();
    const { data: sellerData, isLoading: isSellerLoading, isSuccess: isSellerSuccess } = useGetSellerByIdQuery(`${sellerId}`);
    const { data: gigData, isSuccess: isSellerGigSuccess, isLoading: isSellerGigLoading } = useGetGigsBySellerIdQuery(`${sellerId}`);
    const { data: sellerReviewsData, isSuccess: isGigReviewSuccess, isLoading: isGigReviewLoading } = useGetReviewsBySellerIdQuery(`${sellerId}`);
    let reviews = [];
    if (isGigReviewSuccess) {
        reviews = sellerReviewsData.reviews;
    }
    const isLoading = isSellerGigLoading && isSellerLoading && isGigReviewLoading && !isSellerSuccess && !isSellerGigSuccess && !isGigReviewSuccess;
    return (_jsxs("div", { className: "relative w-full pb-6", children: [_jsx(Breadcrumb, { breadCrumbItems: ['Seller', `${sellerData && sellerData.seller ? sellerData.seller.username : ''}`] }), isLoading ? (_jsx(CircularPageLoader, {})) : (_jsxs("div", { className: "container mx-auto px-2 md:px-0", children: [_jsx(ProfileHeader, { sellerProfile: sellerData?.seller, showHeaderInfo: true, showEditIcons: false }), _jsx("div", { className: "my-4 cursor-pointer", children: _jsx(ProfileTabs, { type: type, setType: setType }) }), _jsxs("div", { className: "flex flex-wrap bg-white", children: [type === 'Overview' && _jsx(SellerOverview, { sellerProfile: sellerData?.seller, showEditIcons: false }), type === 'Active Gigs' && (_jsx("div", { className: "grid gap-x-6 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5", children: gigData?.gigs &&
                                    gigData?.gigs.map((gig) => (_jsx(GigCardDisplayItem, { gig: gig, linkTarget: false, showEditIcon: false }, uuidv4()))) })), type === 'Ratings & Reviews' && _jsx(GigViewReviews, { showRatings: false, reviews: reviews, hasFetchedReviews: true })] })] }))] }));
};
export default SellerProfile;
