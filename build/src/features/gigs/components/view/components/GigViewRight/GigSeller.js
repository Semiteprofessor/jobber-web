import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ChatBox from 'src/features/chat/components/chatbox/ChatBox';
import { GigContext } from 'src/features/gigs/context/GigContext';
import Button from 'src/shared/button/Button';
import ApprovalModal from 'src/shared/modals/ApprovalModal';
import StarRating from 'src/shared/rating/StarRating';
import { TimeAgo } from 'src/shared/utils/timeago.util';
import { lowerCase, rating, shortenLargeNumbers } from 'src/shared/utils/util.service';
import { useAppSelector } from 'src/store/store';
import { v4 as uuidv4 } from 'uuid';
const GigSeller = () => {
    const authUser = useAppSelector((state) => state.authUser);
    const buyer = useAppSelector((state) => state.buyer);
    const { gig, seller } = useContext(GigContext);
    const [approvalModalContent, setApprovalModalContent] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showChatBox, setShowChatBox] = useState(false);
    const chatSeller = {
        username: `${seller.username}`,
        _id: `${seller._id}`,
        profilePicture: `${seller.profilePicture}`,
        responseTime: parseInt(`${seller.responseTime}`)
    };
    const chatBuyer = {
        username: `${buyer.username}`,
        _id: `${buyer._id}`,
        profilePicture: `${buyer.profilePicture}`
    };
    return (_jsxs(_Fragment, { children: [showModal && _jsx(ApprovalModal, { approvalModalContent: approvalModalContent, hideCancel: true, onClick: () => setShowModal(false) }), _jsxs("div", { className: "border-grey mb-8 border", children: [_jsx("div", { className: "flex border-b px-4 py-2", children: _jsx("h4", { className: "font-bold", children: "About The Seller" }) }), _jsxs("div", { className: "mb-0 px-4 pt-2", children: [_jsxs("div", { className: "flex flex-col gap-y-3 md:flex-row md:gap-x-2", children: [_jsx("img", { className: "flex h-24 w-24 self-center rounded-full object-cover", src: gig.profilePicture, alt: "" }), _jsxs("div", { className: "flex flex-col self-center", children: [_jsx(Link, { to: `/seller_profile/${lowerCase(`${gig.username}`)}/${gig.sellerId}/view`, className: "flex cursor-pointer self-center no-underline hover:underline md:block md:self-start", children: _jsx("span", { className: "text-base font-bold md:mb-5", children: gig.username }) }), _jsx("span", { className: "flex self-center text-sm md:block md:self-start", children: seller.oneliner }), _jsx("div", { className: "flex w-full justify-center pt-1 md:justify-start", children: _jsx("div", { className: `flex w-full justify-center md:justify-start ${seller.ratingsCount === 0 ? 'gap-x-[5.8rem]' : 'gap-x-5'}`, children: _jsxs("div", { className: "flex w-full justify-center gap-x-1 md:justify-start", children: [_jsx("div", { className: "mt-1 w-20 gap-x-2", children: _jsx(StarRating, { value: rating(parseInt(`${gig.ratingSum}`) / parseInt(`${gig.ratingsCount}`)), size: 14 }) }), _jsx("div", { className: "ml-2 mt-[1px] flex gap-1 text-sm", children: _jsxs("span", { className: "", children: ["(", shortenLargeNumbers(gig?.ratingsCount), ")"] }) })] }) }) })] })] }), _jsx("hr", { className: "border-grey my-3" }), _jsxs("div", { className: "grid grid-cols-1 gap-y-4 lg:grid-cols-2", children: [_jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "", children: "From" }), _jsx("span", { className: "font-bold", children: seller.country })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "", children: "Member since" }), _jsx("span", { className: "font-bold", children: TimeAgo.formatDateToMonthAndYear(`${seller.createdAt}`) })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "", children: "Avg. resp time" }), _jsxs("span", { className: "font-bold", children: [seller.responseTime, " hour", `${seller.responseTime > 1 ? 's' : ''}`, ' '] })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "", children: "Languages" }), _jsx("div", { className: "flex flex-wrap", children: seller?.languages &&
                                                    seller?.languages.map((language, index) => (_jsxs("span", { className: "font-bold", children: [`${language.language}${index !== seller.languages.length - 1 ? ',' : ''}`, "\u00A0"] }, uuidv4()))) })] })] }), _jsx("hr", { className: "border-grey my-2" }), _jsx("div", { className: "ml-15 mb-2 flex w-full py-1", children: _jsx(Button, { disabled: authUser.username === gig.username, className: `text-md flex w-full justify-between rounded bg-sky-500 px-8 py-2 font-bold text-white focus:outline-none
              ${authUser.username === gig.username ? 'opacity-20 cursor-not-allowed' : 'hover:bg-sky-400 cursor-pointer'}
              `, label: _jsxs(_Fragment, { children: [_jsx("span", { className: "w-full", children: "Contact Me" }), _jsx(FaArrowRight, { className: "flex self-center" })] }), onClick: () => {
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
                                            setShowChatBox((item) => !item);
                                        }
                                    } }) })] }), showChatBox && _jsx(ChatBox, { seller: chatSeller, buyer: chatBuyer, gigId: `${gig.id}`, onClose: () => setShowChatBox(false) })] })] }));
};
export default GigSeller;
