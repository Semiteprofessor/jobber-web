import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, useParams } from 'react-router-dom';
import { useGetGigsBySellerIdQuery, useGetSellerPausedGigsQuery } from 'src/features/gigs/services/gigs.service';
import { useGetOrdersBySellerIdQuery } from 'src/features/order/services/order.service';
import DashboardHeader from 'src/shared/header/components/DashboardHeader';
import { useGetSellerByIdQuery } from '../../services/seller.service';
const Seller = () => {
    const { sellerId } = useParams();
    const { data, isSuccess } = useGetSellerByIdQuery(`${sellerId}`);
    const { data: sellerGigs, isSuccess: isSellerGigsSuccess } = useGetGigsBySellerIdQuery(`${sellerId}`);
    const { data: sellerPausedGigs, isSuccess: isSellerPausedGigsSuccess } = useGetSellerPausedGigsQuery(`${sellerId}`);
    const { data: sellerOrders, isSuccess: isSellerOrdersSuccess } = useGetOrdersBySellerIdQuery(`${sellerId}`);
    let gigs = [];
    let pausedGigs = [];
    let orders = [];
    let seller = undefined;
    if (isSuccess) {
        seller = data?.seller;
    }
    if (isSellerGigsSuccess) {
        gigs = sellerGigs?.gigs;
    }
    if (isSellerPausedGigsSuccess) {
        pausedGigs = sellerPausedGigs?.gigs;
    }
    if (isSellerOrdersSuccess) {
        orders = sellerOrders?.orders;
    }
    return (_jsxs("div", { className: "relative w-screen", children: [_jsx(DashboardHeader, {}), _jsx("div", { className: "m-auto px-6 w-screen xl:container md:px-12 lg:px-6 relative min-h-screen", children: _jsx(Outlet, { context: { seller, gigs, pausedGigs, orders } }) })] }));
};
export default Seller;
