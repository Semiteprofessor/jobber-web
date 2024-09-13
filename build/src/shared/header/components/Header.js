import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { lazy, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import LoginModal from '../../../features/auth/components/Login';
import { Link } from 'react-router-dom';
import { saveToLocalStorage } from '../../utils/util.service';
import RegisterModal from 'src/features/auth/components/Register';
const Button = lazy(() => import('../../../shared/button/Button'));
const Header = ({ navClass }) => {
    const [showModal, setShowModal] = useState({
        login: false,
        register: false,
        forgotPassword: false
    });
    const [openSidebar, setOpenSidebar] = useState(false);
    return (_jsxs(_Fragment, { children: [showModal.login && (_jsx(LoginModal, { onClose: () => setShowModal((item) => ({
                    ...item,
                    login: false
                })), onToggle: () => setShowModal((item) => ({
                    ...item,
                    login: false,
                    register: true
                })), onTogglePassword: () => setShowModal((item) => ({
                    ...item,
                    login: false,
                    forgotPassword: true
                })) })), showModal.login && (_jsx(RegisterModal, { onClose: () => setShowModal((item) => ({
                    ...item,
                    login: false
                })), onToggle: () => setShowModal((item) => ({
                    ...item,
                    login: false,
                    register: true
                })), onTogglePassword: () => setShowModal((item) => ({
                    ...item,
                    login: false,
                    forgotPassword: true
                })) })), showModal.register && (_jsx(LoginModal, { onClose: () => setShowModal((item) => ({
                    ...item,
                    register: false
                })), onToggle: () => setShowModal((item) => ({
                    ...item,
                    login: true,
                    register: false
                })) })), showModal.forgotPassword && (_jsx(LoginModal, { onClose: () => setShowModal((item) => ({
                    ...item,
                    forgotPassword: false
                })), onToggle: () => setShowModal((item) => ({
                    ...item,
                    login: true,
                    forgotPassword: false
                })) })), _jsx("header", { children: _jsx("nav", { className: navClass, children: _jsx("div", { className: "m-auto px-6 xl:container md:px-12 lg:px-6", children: _jsxs("div", { className: "flex flex-wrap items-center justify-between gap-6 md:gap-0 md:py-3 lg:py-5", children: [_jsxs("div", { className: "flex w-full items-center justify-between lg:w-auto", children: [_jsx(Link, { to: "/", className: "relative z-10 cursor-pointer text-3xl font-semibold text-white", children: "Jobber" }), _jsx("div", { className: "peer-checked:hamburger relative z-20 -mr-6 block cursor-pointer p-6 lg:hidden", children: _jsx(Button, { className: "m-auto h-0.5 w-5 rounded transition duration-300", onClick: () => setOpenSidebar(!openSidebar), label: _jsx(_Fragment, { children: openSidebar ? _jsx(FaTimes, { className: "h-6 w-6 text-sky-500" }) : _jsx(FaBars, { className: "h-6 w-6 text-sky-500" }) }) }) })] }), _jsxs("div", { className: "navmenu mb-16 hidden w-full cursor-pointer flex-wrap items-center justify-end space-y-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-7/12 lg:space-y-0 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none", children: [_jsx("div", { className: "text-gray-600 dark:text-gray-300 lg:pr-4", children: _jsx("ul", { className: "space-y-6 text-base font-medium tracking-wide lg:flex lg:space-y-0 lg:text-sm", children: _jsx("li", { children: _jsx("div", { onClick: () => {
                                                            setShowModal((item) => ({
                                                                ...item,
                                                                register: true
                                                            }));
                                                            saveToLocalStorage('becomeASeller', JSON.stringify(true));
                                                        }, className: "hover:text-primary dark:hover:text-primaryLight block transition md:px-4", children: _jsx("span", { children: "Become a Seller" }) }) }) }) }), _jsxs("div", { className: "border-primary/10 -ml-1 flex w-full flex-col space-y-2 dark:border-gray-700 sm:flex-row md:w-max lg:space-y-0 lg:border-l", children: [_jsx("div", { onClick: () => setShowModal((item) => ({
                                                        ...item,
                                                        login: true
                                                    })), className: "relative ml-auto flex h-9 items-center justify-center before:absolute\r\n                            before:inset-0 before:rounded-full before:transition before:duration-300\r\n                            hover:before:scale-105 focus:before:bg-sky-600/10 active:duration-75 active:before:scale-95\r\n                            dark:focus:before:bg-sky-400/10 sm:px-6", children: _jsx("span", { className: "relative text-sm font-semibold text-gray-600 dark:text-gray-300", children: "Sign In" }) }), _jsx("div", { onClick: () => setShowModal((item) => ({
                                                        ...item,
                                                        register: true
                                                    })), className: "relative ml-auto flex h-9 items-center justify-center rounded-full bg-sky-500\r\n                            text-white font-bold sm:px-6 hover:bg-sky-400", children: _jsx("span", { className: "relative text-sm font-semibold text-white", children: "Sign Up" }) })] })] })] }) }) }) })] }));
};
export default Header;
