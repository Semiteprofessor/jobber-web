import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { find } from 'lodash';
import { useEffect, useRef } from 'react';
import { FaPencilAlt, FaRegStar, FaStar } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate } from 'react-router-dom';
import { rating, replaceAmpersandAndDashWithSpace } from 'src/shared/utils/util.service';
import { socket, socketService } from 'src/sockets/socket.service';
import { useAppSelector } from 'src/store/store';
import { lowerCase, replaceSpacesWithDash } from '../utils/util.service';
const GigCardDisplayItem = ({ gig, linkTarget, showEditIcon }) => {
    const seller = useAppSelector((state) => state.seller);
    const authUser = useAppSelector((state) => state.authUser);
    const sellerUsername = useRef('');
    const title = replaceSpacesWithDash(gig.title);
    const navigate = useNavigate();
    const navigateToEditGig = (gigId) => {
        navigate(`/manage_gigs/edit/${gigId}`, { state: gig });
    };
    const saveGigTitle = (gig) => {
        if (authUser?.username) {
            const category = replaceAmpersandAndDashWithSpace(gig.categories);
            socket.emit('category', category, authUser.username);
        }
    };
    useEffect(() => {
        socketService.setupSocketConnection();
        socket.emit('getLoggedInUsers', '');
        socket.on('online', (data) => {
            sellerUsername.current = find(data, (name) => name === gig.username);
        });
    }, [authUser.username, gig.username]);
    return (_jsx("div", { className: "rounded", children: _jsxs("div", { className: "mb-8 flex cursor-pointer flex-col gap-2", children: [_jsx(Link, { to: `/gig/${lowerCase(`${gig.username}`)}/${title}/${gig.sellerId}/${gig.id}/view`, onClick: () => saveGigTitle(gig), children: _jsx(LazyLoadImage, { src: gig.coverImage, alt: "Gig cover image", className: "w-full rounded-lg", wrapperClassName: "bg-center", placeholderSrc: "https://placehold.co/330x220?text=Profile+Image", effect: "opacity" }) }), _jsxs("div", { className: "flex items-center gap-2 relative", children: [_jsx(LazyLoadImage, { src: gig.profilePicture, alt: "Profile image", className: "h-7 w-8 rounded-full object-cover", wrapperClassName: "bg-center", placeholderSrc: "https://placehold.co/330x220?text=Profile+Image", effect: "opacity" }), sellerUsername.current === gig.username && (_jsx("span", { className: "bottom-0 left-5 absolute w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" })), _jsxs("div", { className: "flex w-full justify-between", children: [_jsx("span", { className: "text-md hover:underline", children: linkTarget ? (_jsx(Link, { to: `/seller_profile/${lowerCase(`${gig.username}`)}/${gig.sellerId}/${seller.username === gig.username ? 'edit' : 'view'}`, children: _jsx("strong", { className: "text-sm font-medium md:text-base", children: gig.username }) })) : (_jsx("strong", { className: "text-sm font-medium md:text-base", children: gig.username })) }), showEditIcon && _jsx(FaPencilAlt, { className: "mr-2 flex self-center", size: 15, onClick: () => navigateToEditGig(`${gig.id}`) })] })] }), _jsx("div", { children: _jsx(Link, { to: `/gig/${lowerCase(`${gig.username}`)}/${title}/${gig.sellerId}/${gig.id}/view`, onClick: () => saveGigTitle(gig), children: _jsx("p", { className: "line-clamp-2 text-sm text-[#404145] hover:underline md:text-base", children: gig.basicDescription }) }) }), _jsxs("div", { className: "flex items-center gap-1 text-yellow-400", children: [parseInt(`${gig.ratingsCount}`) > 0 ? _jsx(FaStar, {}) : _jsx(FaRegStar, {}), _jsxs("strong", { className: "text-sm font-bold", children: ["(", rating(parseInt(`${gig.ratingSum}`) / parseInt(`${gig.ratingsCount}`)), ")"] })] }), _jsx("div", { children: _jsxs("strong", { className: "text-sm font-bold md:text-base", children: ["From $", gig.price] }) })] }) }));
};
export default GigCardDisplayItem;
