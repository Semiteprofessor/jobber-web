import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import equal from 'react-fast-compare';
import { useParams } from 'react-router-dom';
import GigViewReviews from 'src/features/gigs/components/view/components/GigViewLeft/GigViewReviews';
import { useGetGigsBySellerIdQuery } from 'src/features/gigs/services/gigs.service';
import { useGetReviewsBySellerIdQuery } from 'src/features/order/services/review.service';
import Breadcrumb from 'src/shared/breadcrumb/Breadcrumb';
import Button from 'src/shared/button/Button';
import GigCardDisplayItem from 'src/shared/gigs/GigCardDisplayItem';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import { showErrorToast, showSuccessToast } from 'src/shared/utils/util.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { v4 as uuidv4 } from 'uuid';
import { addSeller } from '../../reducers/seller.reducer';
import { useUpdateSellerMutation } from '../../services/seller.service';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import SellerOverview from './components/SellerOverview';
const CurrentSellerProfile = () => {
    const seller = useAppSelector((state) => state.seller);
    const [sellerProfile, setSellerProfile] = useState(seller);
    const [showEdit, setShowEdit] = useState(true);
    const [type, setType] = useState('Overview');
    const { sellerId } = useParams();
    const dispatch = useAppDispatch();
    const { data, isSuccess: isSellerGigSuccess, isLoading: isSellerGigLoading } = useGetGigsBySellerIdQuery(`${sellerId}`);
    const { data: sellerData, isSuccess: isGigReviewSuccess, isLoading: isGigReviewLoading } = useGetReviewsBySellerIdQuery(`${sellerId}`);
    const [updateSeller, { isLoading }] = useUpdateSellerMutation();
    let reviews = [];
    if (isGigReviewSuccess) {
        reviews = sellerData.reviews;
    }
    const isDataLoading = isSellerGigLoading && isGigReviewLoading && !isSellerGigSuccess && !isGigReviewSuccess;
    const onUpdateSeller = async () => {
        try {
            const response = await updateSeller({ sellerId: `${sellerId}`, seller: sellerProfile }).unwrap();
            dispatch(addSeller(response.seller));
            setSellerProfile(response.seller);
            setShowEdit(false);
            showSuccessToast('Seller profile updated successfully.');
        }
        catch (error) {
            showErrorToast('Error updating profile.');
        }
    };
    useEffect(() => {
        const isEqual = equal(sellerProfile, seller);
        setShowEdit(isEqual);
    }, [seller, sellerProfile]);
    return (_jsxs("div", { className: "relative w-full pb-6", children: [_jsx(Breadcrumb, { breadCrumbItems: ['Seller', `${seller.username}`] }), isLoading || isDataLoading ? (_jsx(CircularPageLoader, {})) : (_jsxs("div", { className: "container mx-auto px-2 md:px-0", children: [_jsx("div", { className: "my-2 flex h-8 justify-end md:h-10", children: !showEdit && (_jsxs("div", { children: [_jsx(Button, { className: "md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2", label: "Update", onClick: onUpdateSeller }), "\u00A0\u00A0", _jsx(Button, { className: "md:text-md rounded bg-red-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-red-500 focus:outline-none md:py-2", label: "Cancel", onClick: () => {
                                        setShowEdit(false);
                                        setSellerProfile(seller);
                                        dispatch(addSeller(seller));
                                    } })] })) }), _jsx(ProfileHeader, { sellerProfile: sellerProfile, setSellerProfile: setSellerProfile, showHeaderInfo: true, showEditIcons: true }), _jsx("div", { className: "my-4 cursor-pointer", children: _jsx(ProfileTabs, { type: type, setType: setType }) }), _jsxs("div", { className: "flex flex-wrap bg-white", children: [type === 'Overview' && (_jsx(SellerOverview, { sellerProfile: sellerProfile, setSellerProfile: setSellerProfile, showEditIcons: true })), type === 'Active Gigs' && (_jsx("div", { className: "grid gap-x-6 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5", children: data?.gigs &&
                                    data?.gigs.map((gig) => (_jsx(GigCardDisplayItem, { gig: gig, linkTarget: false, showEditIcon: true }, uuidv4()))) })), type === 'Ratings & Reviews' && _jsx(GigViewReviews, { showRatings: false, reviews: reviews, hasFetchedReviews: true })] })] }))] }));
};
export default CurrentSellerProfile;
