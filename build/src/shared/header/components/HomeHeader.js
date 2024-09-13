import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Transition } from '@headlessui/react';
import { filter, find } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaBars, FaRegBell, FaRegEnvelope, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { addAuthUser } from 'src/features/auth/reducers/auth.reducer';
import { useResendEmailMutation } from 'src/features/auth/services/auth.service';
import { useGetNotificationsByIdQuery } from 'src/features/order/services/notification.service';
import Banner from 'src/shared/banner/Banner';
import Button from 'src/shared/button/Button';
import useDetectOutsideClick from 'src/shared/hooks/useDetectOutsideClick';
import { categories, replaceSpacesWithDash, showErrorToast, showSuccessToast } from 'src/shared/utils/util.service';
import { socket, socketService } from 'src/sockets/socket.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { v4 as uuidv4 } from 'uuid';
import { updateCategoryContainer } from '../reducers/category.reducer';
import { updateHeader } from '../reducers/header.reducer';
import { updateNotification } from '../reducers/notification.reducer';
import HeaderSearchInput from './HeaderSearchInput';
import MessageDropdown from './MessageDropdown';
import HomeHeaderSideBar from './mobile/HomeHeaderSidebar';
import MobileHeaderSearchInput from './mobile/MobileHeaderSearchInput';
import NotificationDropdown from './NotificationDropdown';
import OrderDropdown from './OrderDropdown';
import SettingsDropdown from './SettingsDropdown';
const HomeHeader = ({ showCategoryContainer }) => {
    const authUser = useAppSelector((state) => state.authUser);
    const seller = useAppSelector((state) => state.seller);
    const logout = useAppSelector((state) => state.logout);
    const buyer = useAppSelector((state) => state.buyer);
    const notification = useAppSelector((state) => state.notification);
    const settingsDropdownRef = useRef(null);
    const messageDropdownRef = useRef(null);
    const notificationDropdownRef = useRef(null);
    const orderDropdownRef = useRef(null);
    const navElement = useRef(null);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [authUsername, setAuthUsername] = useState('');
    const dispatch = useAppDispatch();
    const { data, isSuccess } = useGetNotificationsByIdQuery(`${authUser.username}`, { refetchOnMountOrArgChange: true });
    const [resendEmail] = useResendEmailMutation();
    const [isSettingsDropdown, setIsSettingsDropdown] = useDetectOutsideClick(settingsDropdownRef, false);
    const [isMessageDropdownOpen, setIsMessageDropdownOpen] = useDetectOutsideClick(messageDropdownRef, false);
    const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useDetectOutsideClick(notificationDropdownRef, false);
    const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useDetectOutsideClick(orderDropdownRef, false);
    const onResendEmail = async () => {
        try {
            const result = await resendEmail({ userId: authUser.id, email: `${authUser.email}` }).unwrap();
            dispatch(addAuthUser({ authInfo: result.user }));
            showSuccessToast('Email sent successfully.');
        }
        catch (error) {
            showErrorToast('Error sending email.');
        }
    };
    const toggleDropdown = () => {
        setIsSettingsDropdown(!isSettingsDropdown);
        setIsMessageDropdownOpen(false);
        setIsNotificationDropdownOpen(false);
        setIsOrderDropdownOpen(false);
    };
    const toggleMessageDropdown = () => {
        setIsMessageDropdownOpen(!isMessageDropdownOpen);
        setIsNotificationDropdownOpen(false);
        setIsOrderDropdownOpen(false);
        setIsSettingsDropdown(false);
        dispatch(updateHeader('home'));
        dispatch(updateCategoryContainer(true));
    };
    const toggleOrdersDropdown = () => {
        setIsOrderDropdownOpen(!isOrderDropdownOpen);
        setIsMessageDropdownOpen(false);
        setIsNotificationDropdownOpen(false);
        setIsSettingsDropdown(false);
        dispatch(updateHeader('home'));
        dispatch(updateCategoryContainer(true));
    };
    const toggleNotificationDropdown = () => {
        setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
        setIsOrderDropdownOpen(false);
        setIsMessageDropdownOpen(false);
        setIsSettingsDropdown(false);
        dispatch(updateHeader('home'));
        dispatch(updateCategoryContainer(true));
    };
    const slideLeft = () => {
        if (navElement.current) {
            const maxScrollLeft = navElement.current.scrollWidth + navElement.current.clientWidth; // maximum scroll position
            navElement.current.scrollLeft = navElement.current.scrollLeft < maxScrollLeft ? navElement.current.scrollLeft - 1000 : maxScrollLeft;
        }
    };
    const slideRight = () => {
        if (navElement.current) {
            const maxScrollLeft = navElement.current.scrollWidth - navElement.current.clientWidth; // maximum scroll position
            navElement.current.scrollLeft = navElement.current.scrollLeft < maxScrollLeft ? navElement.current.scrollLeft + 1000 : maxScrollLeft;
        }
    };
    useEffect(() => {
        socketService.setupSocketConnection();
        socket.emit('getLoggedInUsers', '');
        if (isSuccess) {
            const list = filter(data.notifications, (item) => !item.isRead && item.userTo === authUser?.username);
            dispatch(updateNotification({ hasUnreadNotification: list.length > 0 }));
        }
    }, [isSuccess, authUser.username, data?.notifications, dispatch]);
    useEffect(() => {
        socket.on('message received', (data) => {
            // only for receiver
            if (data.receiverUsername === `${authUser.username}` && !data.isRead) {
                dispatch(updateNotification({ hasUnreadMessage: true }));
            }
        });
        socket.on('order notification', (_, data) => {
            // only for receiver
            if (data.userTo === `${authUser.username}` && !data.isRead) {
                dispatch(updateNotification({ hasUnreadNotification: true }));
            }
        });
        socket.on('online', (data) => {
            const username = find(data, (name) => name === authUser.username);
            setAuthUsername(`${username}`);
        });
    }, [authUser.username, dispatch]);
    return (_jsxs(_Fragment, { children: [openSidebar && _jsx(HomeHeaderSideBar, { setOpenSidebar: setOpenSidebar }), _jsx("header", { children: _jsxs("nav", { className: "navbar peer-checked:navbar-active relative z-[120] w-full border-b bg-white shadow-2xl shadow-gray-600/5 backdrop-blur dark:shadow-none", children: [!logout && authUser && !authUser.emailVerified && (_jsx(Banner, { bgColor: "bg-warning", showLink: true, linkText: "Resend email", text: "Please verify your email before you proceed.", onClick: onResendEmail })), _jsx("div", { className: "m-auto px-6 xl:container md:px-12 lg:px-6", children: _jsxs("div", { className: "flex flex-wrap items-center justify-between gap-6 md:gap-0 md:py-3 lg:py-5", children: [_jsxs("div", { className: "flex w-full gap-x-4 lg:w-6/12", children: [_jsxs("div", { className: "hidden w-full md:flex", children: [_jsx("label", { htmlFor: "hbr", className: "peer-checked:hamburger relative z-20 -ml-4 block cursor-pointer p-6 lg:hidden", children: _jsx(Button, { className: "m-auto flex h-0.5 w-5 items-center rounded transition duration-300", onClick: () => setOpenSidebar(!openSidebar), label: _jsx(_Fragment, { children: openSidebar ? _jsx(FaTimes, { className: "h-6 w-6 text-sky-500" }) : _jsx(FaBars, { className: "h-6 w-6 text-sky-500" }) }) }) }), _jsxs("div", { className: "w-full gap-x-4 md:flex", children: [_jsx(Link, { to: "/", onClick: () => {
                                                                    dispatch(updateHeader('home'));
                                                                    dispatch(updateCategoryContainer(true));
                                                                }, className: "relative z-10 flex cursor-pointer justify-center self-center text-2xl font-semibold text-black lg:text-3xl", children: "Jobber" }), _jsx(HeaderSearchInput, {})] })] }), _jsx(MobileHeaderSearchInput, { setOpenSidebar: setOpenSidebar })] }), _jsx("div", { className: "navmenu mb-16 hidden w-full cursor-pointer flex-wrap items-center justify-end space-y-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-6/12 lg:space-y-0 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none", children: _jsx("div", { className: "text-[#74767e] lg:pr-4", children: _jsxs("ul", { className: "flex text-base font-medium", children: [_jsxs("li", { className: "relative z-50 flex cursor-pointer items-center", children: [_jsx(Button, { className: "px-4", onClick: toggleNotificationDropdown, label: _jsxs(_Fragment, { children: [_jsx(FaRegBell, {}), notification && notification.hasUnreadNotification && (_jsx("span", { className: "absolute -top-0 right-0 mr-3 inline-flex h-[6px] w-[6px] items-center justify-center rounded-full bg-[#ff62ab]" }))] }) }), _jsx(Transition, { ref: notificationDropdownRef, show: isNotificationDropdownOpen, enter: "transition ease-out duration-200", enterFrom: "opacity-0 translate-y-1", enterTo: "opacity-100 translate-y-0", leave: "transition ease-in duration-150", leaveFrom: "opacity-100 translate-y-0", leaveTo: "opacity-0 translate-y-1", children: _jsx("div", { className: "absolute right-0 mt-5 w-96", children: _jsx(NotificationDropdown, { setIsNotificationDropdownOpen: setIsNotificationDropdownOpen }) }) })] }), _jsxs("li", { className: "relative z-50 flex cursor-pointer items-center", children: [_jsx(Button, { className: "relative px-4", onClick: toggleMessageDropdown, label: _jsxs(_Fragment, { children: [_jsx(FaRegEnvelope, {}), notification && notification.hasUnreadMessage && (_jsx("span", { className: "absolute -top-1 right-0 mr-2 inline-flex h-[6px] w-[6px] items-center justify-center rounded-full bg-[#ff62ab]" }))] }) }), _jsx(Transition, { ref: messageDropdownRef, show: isMessageDropdownOpen, enter: "transition ease-out duration-200", enterFrom: "opacity-0 translate-y-1", enterTo: "opacity-100 translate-y-0", leave: "transition ease-in duration-150", leaveFrom: "opacity-100 translate-y-0", leaveTo: "opacity-0 translate-y-1", children: _jsx("div", { className: "absolute right-0 mt-5 w-96", children: _jsx(MessageDropdown, { setIsMessageDropdownOpen: setIsMessageDropdownOpen }) }) })] }), _jsxs("li", { className: "relative z-50 flex cursor-pointer items-center", onClick: toggleOrdersDropdown, children: [_jsx(Button, { className: "px-3", label: _jsx(_Fragment, { children: _jsx("span", { children: "Orders" }) }) }), _jsx(Transition, { ref: orderDropdownRef, show: isOrderDropdownOpen, enter: "transition ease-out duration-200", enterFrom: "opacity-0 translate-y-1", enterTo: "opacity-100 translate-y-0", leave: "transition ease-in duration-150", leaveFrom: "opacity-100 translate-y-0", leaveTo: "opacity-0 translate-y-1", children: _jsx("div", { className: "absolute right-0 mt-5 w-96", children: _jsx(OrderDropdown, { buyer: buyer, setIsOrderDropdownOpen: setIsOrderDropdownOpen }) }) })] }), buyer && !buyer.isSeller && (_jsx("li", { className: "relative flex items-center", children: _jsx(Link, { to: "/seller_onboarding", className: "relative ml-auto flex h-9 items-center justify-center rounded-full bg-sky-500 text-white font-bold sm:px-6 hover:bg-sky-400", children: _jsx("span", { children: "Become a Seller" }) }) })), _jsxs("li", { className: "relative z-50 flex cursor-pointer items-center", children: [_jsx(Button, { className: "relative flex gap-2 px-3 text-base font-medium", onClick: toggleDropdown, label: _jsxs(_Fragment, { children: [_jsx("img", { src: `${authUser.profilePicture}`, alt: "profile", className: "h-7 w-7 rounded-full object-cover" }), authUsername === authUser.username && (_jsx("span", { className: "absolute bottom-0 left-8 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-400" })), _jsx("span", { className: "flex self-center", children: authUser.username })] }) }), _jsx(Transition, { ref: settingsDropdownRef, show: isSettingsDropdown, enter: "transition ease-out duration-200", enterFrom: "opacity-0 translate-y-1", enterTo: "opacity-100 translate-y-0", leave: "transition ease-in duration-150", leaveFrom: "opacity-100 translate-y-0", leaveTo: "opacity-0 translate-y-1", children: _jsx("div", { className: "absolute -right-48 z-50 mt-5 w-96", children: _jsx(SettingsDropdown, { seller: seller, buyer: buyer, authUser: authUser, type: "buyer", setIsDropdownOpen: setIsSettingsDropdown }) }) })] })] }) }) })] }) }), showCategoryContainer && (_jsx("div", { className: "border-grey z-40 hidden w-full border border-x-0 border-b-0 sm:flex", children: _jsxs("div", { className: "justify-left md:justify-left container mx-auto flex px-6 lg:justify-center", children: [_jsx("span", { onClick: slideLeft, className: "flex w-auto cursor-pointer self-center pr-1 xl:hidden", children: _jsx(FaAngleLeft, { size: 20 }) }), _jsx("div", { ref: navElement, className: "relative inline-block h-full w-full items-center gap-6 overflow-x-auto scroll-smooth whitespace-nowrap py-2 text-sm font-medium lg:flex lg:justify-between", children: categories().map((category) => (_jsx("span", { className: "mx-4 cursor-pointer first:ml-0 hover:text-sky-400 lg:mx-0", children: _jsx(Link, { to: `/categories/${replaceSpacesWithDash(category)}`, children: category }) }, uuidv4()))) }), _jsx("span", { onClick: slideRight, className: "flex w-auto cursor-pointer self-center pl-1 xl:hidden", children: _jsx(FaAngleRight, { size: 20 }) })] }) }))] }) })] }));
};
export default HomeHeader;
