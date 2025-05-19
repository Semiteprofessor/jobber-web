import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaRegClock } from 'react-icons/fa';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Button from 'src/shared/button/Button';
import { showErrorToast } from 'src/shared/utils/util.service';
import { useUpdateOfferMutation } from '../../services/chat.service';
const ChatOffer = ({ message, seller, gig }) => {
    const navigate = useNavigate();
    const [updateOffer] = useUpdateOfferMutation();
    const messageOffer = message.offer;
    const updateBuyerOffer = async (messageId, type, offer) => {
        try {
            await updateOffer({ messageId, type });
            const offerParams = {
                gigTitle: offer.gigTitle,
                description: offer.description,
                price: offer.price,
                deliveryInDays: offer.deliveryInDays,
                oldDeliveryDate: offer.oldDeliveryDate,
                newDeliveryDate: offer.newDeliveryDate,
                accepted: offer.accepted,
                cancelled: offer.cancelled
            };
            if (type === 'accepted') {
                navigate(`/gig/checkout/${message.gigId}?${createSearchParams({ offer: JSON.stringify(offerParams) })}`, { state: gig });
            }
        }
        catch (error) {
            showErrorToast('Error updating buyer offer.');
        }
    };
    return (_jsx("div", { className: "z-1 border-grey mt-2 flex h-72 max-w-xl flex-col overflow-hidden rounded border", children: _jsxs("div", { className: "w-full", children: [_jsxs("div", { className: "border-grey flex flex-row justify-between border-b bg-[#fafafa] p-4 text-sm font-bold md:text-base", children: [_jsx("span", { className: "", children: message.offer?.gigTitle }), _jsxs("span", { children: ["$", message.offer?.price] })] }), _jsx("div", { className: "border-grey h-28 max-h-28 overflow-y-scroll border-b px-4 py-3", children: messageOffer.description }), _jsxs("div", { className: "border-grey flex flex-row gap-x-2 border-b px-4 py-3 text-sm font-bold md:text-base", children: [_jsx(FaRegClock, { className: "self-center" }), " ", messageOffer.deliveryInDays, " Day", parseInt(`${messageOffer.deliveryInDays}`) > 1 ? 's' : '', " Delivery"] }), _jsxs("div", { className: "relative top-[5%] mr-3 flex flex-row justify-end gap-4", children: [_jsx(Button, { className: `rounded px-6 py-3 text-center text-sm font-bold text-white focus:outline-none md:px-4 md:py-2 md:text-base ${messageOffer.accepted || messageOffer.cancelled
                                ? 'cursor-not-allowed bg-red-200 hover:bg-red-200'
                                : 'bg-red-500 hover:bg-red-400'}`, disabled: messageOffer.accepted || messageOffer.cancelled, label: "Cancel Offer", onClick: () => updateBuyerOffer(`${message._id}`, 'cancelled', messageOffer) }), seller && seller._id !== message.sellerId && (_jsx(Button, { className: `rounded px-6 py-3 text-center text-sm font-bold text-white focus:outline-none md:px-4 md:py-2 md:text-base ${messageOffer.accepted || messageOffer.cancelled
                                ? 'cursor-not-allowed bg-sky-200 hover:bg-sky-200'
                                : 'bg-sky-500 hover:bg-sky-400'}`, disabled: messageOffer.accepted || messageOffer.cancelled, label: "Accept Offer", onClick: () => updateBuyerOffer(`${message._id}`, 'accepted', messageOffer) }))] })] }) }));
};
export default ChatOffer;
