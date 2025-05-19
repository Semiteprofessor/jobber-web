import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useState } from 'react';
import { FaArrowRight, FaRegClock } from 'react-icons/fa';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { GigContext } from 'src/features/gigs/context/GigContext';
import Button from 'src/shared/button/Button';
import ApprovalModal from 'src/shared/modals/ApprovalModal';
import { useAppSelector } from 'src/store/store';
const GigPackage = () => {
    const authUser = useAppSelector((state) => state.authUser);
    const { gig } = useContext(GigContext);
    const [approvalModalContent, setApprovalModalContent] = useState();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const continueToCheck = () => {
        const deliveryInDays = parseInt(gig.expectedDelivery.split(' ')[0]);
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + deliveryInDays);
        const offerParams = {
            gigTitle: gig.title,
            description: gig.basicDescription,
            price: gig.price,
            deliveryInDays,
            oldDeliveryDate: `${newDate}`,
            newDeliveryDate: `${newDate}`,
            accepted: false,
            cancelled: false
        };
        navigate(`/gig/checkout/${gig.id}?${createSearchParams({ offer: JSON.stringify(offerParams) })}`, { state: gig });
    };
    return (_jsxs(_Fragment, { children: [showModal && _jsx(ApprovalModal, { approvalModalContent: approvalModalContent, hideCancel: true, onClick: () => setShowModal(false) }), _jsxs("div", { className: "border-grey mb-8 border", children: [_jsx("div", { className: "flex border-b px-4 py-2", children: _jsxs("h4", { className: "font-bold", children: ["$", gig.price] }) }), _jsxs("ul", { className: "mb-0 list-none px-4 py-2", children: [_jsx("li", { className: "flex justify-between", children: _jsx("div", { className: "ml-15 flex w-full pb-3", children: _jsx("div", { className: "text-base font-bold", children: gig.basicTitle }) }) }), _jsx("li", { className: "flex justify-between", children: _jsx("div", { className: "ml-15 flex w-full pb-4", children: _jsx("div", { className: "text-sm font-normal", children: gig.basicDescription }) }) }), _jsx("li", { className: "flex justify-between", children: _jsxs("div", { className: "ml-15 flex w-full pb-3", children: [_jsx(FaRegClock, { className: "flex self-center" }), " ", _jsx("span", { className: "ml-3 text-sm font-semibold", children: gig.expectedDelivery })] }) }), _jsx("li", { className: "flex justify-between", children: _jsx("div", { className: "ml-15 flex w-full py-1", children: _jsx(Button, { disabled: authUser.username === gig.username, className: `text-md flex w-full justify-between rounded bg-sky-500 px-8 py-2 font-bold text-white focus:outline-none
                ${authUser.username === gig.username ? 'opacity-20 cursor-not-allowed' : 'hover:bg-sky-400 cursor-pointer'}
                `, label: _jsxs(_Fragment, { children: [_jsx("span", { className: "w-full", children: "Continue" }), _jsx(FaArrowRight, { className: "flex self-center" })] }), onClick: () => {
                                            if (authUser && !authUser.emailVerified) {
                                                setApprovalModalContent({
                                                    header: 'Email Verification Notice',
                                                    body: 'Please verify your email before you continue.',
                                                    btnText: 'OK',
                                                    btnColor: 'bg-sky-500 hover:bg-sky-400'
                                                });
                                                setShowModal(true);
                                            }
                                            else {
                                                continueToCheck();
                                            }
                                        } }) }) })] })] })] }));
};
export default GigPackage;
