import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from 'react-router-dom';
import { applicationLogout, lowerCase } from 'src/shared/utils/util.service';
import { useAppDispatch } from 'src/store/store';
import { updateCategoryContainer } from '../reducers/category.reducer';
import { updateHeader } from '../reducers/header.reducer';
const SettingsDropdown = ({ seller, authUser, buyer, type, setIsDropdownOpen }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const onLogout = () => {
        if (setIsDropdownOpen) {
            setIsDropdownOpen(false);
        }
        applicationLogout(dispatch, navigate);
    };
    return (_jsxs("div", { className: "border-grey w-44 divide-y divide-gray-100 rounded border bg-white shadow-md", children: [_jsxs("ul", { className: "text-gray-700s py-2 text-sm", "aria-labelledby": "avatarButton", children: [buyer && buyer.isSeller && (_jsx("li", { className: "mx-3 mb-1", children: _jsx(Link, { to: `${type === 'buyer' ? `/${lowerCase(`${authUser?.username}`)}/${seller?._id}/seller_dashboard` : '/'}`, onClick: () => {
                                if (setIsDropdownOpen) {
                                    setIsDropdownOpen(false);
                                }
                                dispatch(updateHeader('sellerDashboard'));
                                dispatch(updateCategoryContainer(true));
                            }, className: "block w-full cursor-pointer rounded bg-sky-500 px-4s py-2 text-center font-bold text-white hover:bg-sky-400 focus:outline-none", children: type === 'buyer' ? 'Switch to Selling' : 'Switch to Buying' }) })), buyer && buyer.isSeller && type === 'buyer' && (_jsx("li", { children: _jsx(Link, { to: `/manage_gigs/new/${seller?._id}`, className: "block px-4 py-2 hover:text-sky-400", onClick: () => {
                                if (setIsDropdownOpen) {
                                    setIsDropdownOpen(false);
                                }
                                dispatch(updateHeader('home'));
                                dispatch(updateCategoryContainer(true));
                            }, children: "Add a new gig" }) })), type === 'buyer' && (_jsx("li", { children: _jsx(Link, { to: `/users/${buyer?.username}/${buyer?._id}/orders`, className: "block px-4 py-2 hover:text-sky-400", onClick: () => {
                                if (setIsDropdownOpen) {
                                    setIsDropdownOpen(false);
                                }
                                dispatch(updateHeader('home'));
                                dispatch(updateCategoryContainer(true));
                            }, children: "Dashboard" }) })), buyer && buyer.isSeller && type === 'buyer' && (_jsx("li", { children: _jsx(Link, { to: `/seller_profile/${lowerCase(`${seller?.username}`)}/${seller?._id}/edit`, className: "block px-4 py-2 hover:text-sky-400", onClick: () => {
                                if (setIsDropdownOpen) {
                                    setIsDropdownOpen(false);
                                }
                                dispatch(updateHeader('home'));
                                dispatch(updateCategoryContainer(true));
                            }, children: "Profile" }) })), _jsx("li", { children: _jsx(Link, { to: `${lowerCase(`${buyer?.username}/edit`)}`, className: "block px-4 py-2 hover:text-sky-400", onClick: () => {
                                if (setIsDropdownOpen) {
                                    setIsDropdownOpen(false);
                                }
                                dispatch(updateHeader('home'));
                                dispatch(updateCategoryContainer(false));
                            }, children: "Settings" }) })] }), _jsx("div", { className: "py-1", children: _jsx("div", { onClick: () => onLogout(), className: "block px-4 py-2 text-sm hover:text-sky-400", children: "Sign out" }) })] }));
};
export default SettingsDropdown;
