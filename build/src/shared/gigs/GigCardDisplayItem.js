import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { useAppSelector } from 'src/store/store';
import { lowerCase, replaceAmpersandAndDashWithSpace, replaceSpacesWithDash } from '../utils/util.service';
import { Link, useNavigate } from 'react-router-dom';
import { socket, socketService } from 'src/sockets/socket.service';
import { find } from 'lodash';
import { LazyLoadImage } from 'react-lazy-load-image-component';
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
    return (_jsx("div", { className: "rounded", children: _jsx("div", { children: _jsx(Link, { to: `/gig/${lowerCase(`${gig.username}`)}/${title}/${gig.sellerId}/${gig.id}/view`, onClick: () => saveGigTitle(gig), children: _jsx(LazyLoadImage, { src: gig.coverImage, alt: "Gig cover image", className: "w-full rounded-lg", wrapperClassName: "bg-center", placeholderSrc: "https://placehold.co/330x220?text=Profile+Image", effect: "opacity" }) }) }) }));
};
export default GigCardDisplayItem;
