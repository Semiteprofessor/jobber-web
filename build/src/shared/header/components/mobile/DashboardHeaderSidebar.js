import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from 'react-router-dom';
import { applicationLogout, lowerCase } from 'src/shared/utils/util.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { updateCategoryContainer } from '../../reducers/category.reducer';
import { updateHeader } from '../../reducers/header.reducer';
const DashboardHeaderSideBar = ({ setOpenSidebar }) => {
    const authUser = useAppSelector((state) => state.authUser);
    const seller = useAppSelector((state) => state.seller);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onLogout = async () => {
        applicationLogout(dispatch, navigate);
    };
    return (_jsx("div", { className: 'fixed left-0 top-0 z-[150] flex h-screen w-full bg-black/40 transition-all duration-500', onClick: () => {
            if (setOpenSidebar) {
                setOpenSidebar(false);
            }
        }, children: _jsx("div", { className: 'absolute left-0 top-0 z-20 flex h-screen w-[250px] flex-col items-start justify-start gap-4 bg-white p-6', children: _jsxs("div", { className: "z-2 sticky top-0 flex w-full flex-col items-start justify-start gap-6 bg-white", children: [_jsxs("div", { className: "flex cursor-pointer gap-4 py-3 text-base font-semibold transition-all duration-300", children: [_jsx("img", { src: `${authUser?.profilePicture}`, alt: "profile", className: "h-10 w-10 rounded-full object-cover" }), _jsx("span", { className: "text-blacks flex self-center", children: authUser?.username })] }), _jsx("div", { onClick: () => {
                            if (setOpenSidebar) {
                                setOpenSidebar(false);
                                dispatch(updateHeader('sellerDashboard'));
                                dispatch(updateCategoryContainer(true));
                            }
                        }, className: "cursor-pointer text-base font-medium text-gray-400", children: _jsx(Link, { to: `/${lowerCase(`${seller?.username}`)}/${seller?._id}/seller_dashboard`, children: "Seller Dashboard" }) }), _jsx("div", { onClick: (event) => {
                            event.stopPropagation();
                            if (setOpenSidebar) {
                                setOpenSidebar(false);
                            }
                        }, className: "cursor-pointer text-base font-medium text-gray-400", children: _jsx(Link, { to: `/${lowerCase(`${seller?.username}`)}/${seller?._id}/manage_orders`, children: "Orders" }) }), _jsx("div", { onClick: (event) => {
                            event.stopPropagation();
                            if (setOpenSidebar) {
                                setOpenSidebar(false);
                            }
                        }, className: "cursor-pointer text-base font-medium text-gray-400", children: _jsx(Link, { to: `/${lowerCase(`${seller?.username}`)}/${seller?._id}/manage_earnings`, children: "Earnings" }) }), _jsx("div", { onClick: (event) => {
                            event.stopPropagation();
                            if (setOpenSidebar) {
                                setOpenSidebar(false);
                                dispatch(updateHeader('home'));
                                dispatch(updateCategoryContainer(true));
                            }
                        }, className: "cursor-pointer text-base font-medium text-gray-400", children: _jsx(Link, { to: "/", children: "Switch to Buying" }) }), _jsx("div", { onClick: (event) => {
                            event.stopPropagation();
                            if (setOpenSidebar) {
                                setOpenSidebar(false);
                                dispatch(updateHeader('home'));
                                dispatch(updateCategoryContainer(true));
                            }
                        }, className: "cursor-pointer text-base font-medium text-gray-400", children: _jsx(Link, { to: `/${lowerCase(`${seller?.username}`)}/edit`, children: "Settings" }) }), _jsx("div", { onClick: (event) => {
                            event.stopPropagation();
                            if (setOpenSidebar) {
                                setOpenSidebar(false);
                                onLogout();
                            }
                        }, className: "cursor-pointer text-base font-medium text-gray-400", children: "Logout" })] }) }) }));
};
export default DashboardHeaderSideBar;
