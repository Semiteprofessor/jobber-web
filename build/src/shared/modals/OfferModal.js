import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSaveChatMessageMutation } from 'src/features/chat/services/chat.service';
import Button from '../button/Button';
import Dropdown from '../dropdown/Dropdown';
import TextAreaInput from '../inputs/TextAreaInput';
import TextInput from '../inputs/TextInput';
import { expectedGigDelivery, showErrorToast } from '../utils/util.service';
import ModalBg from './ModalBg';
const OfferModal = ({ header, gigTitle, receiver, authUser, singleMessage, cancelBtnHandler }) => {
    const [offer, setOffer] = useState({
        description: '',
        price: '',
        delivery: 'Expected delivery',
        deliveryDate: ''
    });
    const [saveChatMessage] = useSaveChatMessageMutation();
    const sendGigOffer = async () => {
        try {
            const messageBody = {
                conversationId: `${singleMessage?.conversationId}`,
                hasConversationId: true,
                body: "Here's your custom offer",
                gigId: singleMessage?.gigId,
                sellerId: singleMessage?.sellerId,
                buyerId: singleMessage?.buyerId,
                senderUsername: `${authUser?.username}`,
                senderPicture: `${authUser?.profilePicture}`,
                receiverUsername: receiver?.username,
                receiverPicture: receiver?.profilePicture,
                isRead: false,
                hasOffer: true,
                offer: {
                    gigTitle: `${gigTitle}`,
                    price: parseInt(offer.price),
                    description: offer.description,
                    deliveryInDays: parseInt(offer.delivery),
                    oldDeliveryDate: offer.deliveryDate,
                    newDeliveryDate: offer.deliveryDate,
                    accepted: false,
                    cancelled: false
                }
            };
            await saveChatMessage(messageBody).unwrap();
            if (cancelBtnHandler) {
                cancelBtnHandler();
            }
        }
        catch (error) {
            showErrorToast('Error sending gig offer.');
        }
    };
    return (_jsx(ModalBg, { children: _jsx("div", { className: "fixed bottom-0 left-0 right-0 top-0 z-[30] flex w-full items-center justify-center", children: _jsxs("div", { className: "relative bottom-auto left-auto right-auto top-auto max-h-[90vh] min-w-[500px] bg-white p-4", children: [_jsx("div", { className: "relative px-5 py-5", children: _jsxs("div", { className: "flex justify-between text-2xl font-bold ", children: [_jsx("h1", { className: "flex w-full justify-center", children: header }), _jsx(Button, { onClick: cancelBtnHandler, className: "cursor-pointer rounded text-gray-400 hover:text-gray-600", role: "button", label: _jsx(FaTimes, { className: "" }) })] }) }), _jsxs("div", { className: "relative mb-16 px-5", children: [_jsx("div", { className: "py-4", children: _jsx("label", { htmlFor: "username", className: "text-[20px] font-medium leading-tight tracking-normal", children: gigTitle }) }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "description", className: "text-sm font-bold leading-tight tracking-normal", children: ["Description", _jsx("sup", { className: "top-[-0.1em] text-base text-red-500", children: "*" })] }), _jsx(TextAreaInput, { className: "border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none", placeholder: "Write a description...", name: "description", value: offer.description, rows: 5, onChange: (event) => setOffer({ ...offer, description: event.target.value }) })] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "price", className: "text-sm font-bold leading-tight tracking-normal", children: ["Price", _jsx("sup", { className: "top-[-0.1em] text-base text-red-500", children: "*" })] }), _jsx("div", { className: "relative mb-5 mt-2", children: _jsx(TextInput, { id: "price", name: "price", type: "number", value: offer.price, className: "flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none", placeholder: "Enter custom price", onChange: (event) => {
                                                const value = event.target.value;
                                                setOffer({ ...offer, price: parseInt(value) > 0 ? value : '' });
                                            } }) })] }), _jsxs("div", { className: "mb-6", children: [_jsxs("label", { htmlFor: "country", className: "text-sm font-bold leading-tight tracking-normal", children: ["Delivery", _jsx("sup", { className: "top-[-0.1em] text-base text-red-500", children: "*" })] }), _jsx("div", { id: "country", className: "relative mb-5 mt-2", children: _jsx(Dropdown, { text: offer.delivery, maxHeight: "200", mainClassNames: "absolute bg-white z-50", showSearchInput: false, values: expectedGigDelivery(), onClick: (item) => {
                                                const deliveryInDays = parseInt(item);
                                                const newDate = new Date();
                                                newDate.setDate(newDate.getDate() + deliveryInDays);
                                                setOffer({ ...offer, deliveryDate: `${newDate}`, delivery: item });
                                            } }) })] })] }), _jsx("div", { className: "px-5 py-4", children: _jsx("div", { className: "ml-2 flex w-full justify-center text-sm font-medium", children: _jsx(Button, { className: "rounded bg-sky-500 px-6 py-3 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-4 md:py-2 md:text-base", disabled: !offer.description || !offer.price || !offer.delivery, label: "Send Offer", onClick: sendGigOffer }) }) })] }) }) }));
};
export default OfferModal;
