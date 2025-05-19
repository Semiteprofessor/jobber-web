import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useOutletContext } from 'react-router-dom';
import Button from 'src/shared/button/Button';
import { updateHeader } from 'src/shared/header/reducers/header.reducer';
import { useAppDispatch } from 'src/store/store';
import ProfileHeader from '../profile/components/ProfileHeader';
import DashboardMain from './components/DashboardMain';
const SellerDashboard = () => {
    const { seller } = useOutletContext();
    const dispatch = useAppDispatch();
    return (_jsxs("div", { className: "container mx-auto px-2 md:px-0", children: [_jsxs("div", { className: "mt-10 flex flex-col justify-between gap-y-4", children: [_jsx(ProfileHeader, { showHeaderInfo: false, showEditIcons: false, sellerProfile: seller }), _jsx("div", { className: "self-end", children: _jsx(Button, { onClick: () => dispatch(updateHeader('home')), className: "bg-green-transparent w-full rounded-md text-center text-xs font-bold text-green-500 hover:text-green-600 focus:outline-none md:bg-green-500 md:px-3 md:py-2 md:text-sm md:text-white hover:md:bg-green-600 hover:md:text-white", label: _jsx(Link, { to: `/manage_gigs/new/${seller?._id}`, children: "Create a new gig" }) }) })] }), _jsx(DashboardMain, {})] }));
};
export default SellerDashboard;
