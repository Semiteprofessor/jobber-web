import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { socket } from 'src/sockets/socket.service';
import GigCardDisplayItem from './GigCardDisplayItem';
import GigIndexItem from 'src/features/index/gig-tabs/GigIndexItem';
import { replaceSpacesWithDash } from '../utils/util.service';
const TopGigsView = ({ gigs, title, subTitle, category, width, type }) => {
    const navElement = useRef(null);
    const [scroll, setScroll] = useState({
        start: false,
        end: false
    });
    const slideLeft = () => {
        if (navElement.current) {
            const maxScrollLeft = navElement.current.scrollWidth + navElement.current.clientWidth;
            navElement.current.scrollLeft = navElement.current.scrollLeft < maxScrollLeft ? navElement.current.scrollLeft - 1000 : maxScrollLeft;
            const maxWidth = navElement.current.scrollLeft + navElement.current.clientWidth;
            setScroll({ start: maxWidth === navElement.current.scrollWidth, end: false });
        }
    };
    const slideRight = () => {
        if (navElement.current) {
            const maxScrollLeft = navElement.current.scrollWidth - navElement.current.clientWidth;
            navElement.current.scrollLeft = navElement.current.scrollLeft < maxScrollLeft ? navElement.current.scrollLeft + 1000 : maxScrollLeft;
            const maxWidth = navElement.current.scrollLeft + navElement.current.clientWidth - 1000;
            setScroll({ start: true, end: maxWidth === navElement.current.clientWidth });
        }
    };
    return (_jsxs("div", { className: "mx-auto my-8 flex flex-col overflow-hidden rounded-lg", children: [title && (_jsx("div", { className: "flex items-start py-6", children: _jsxs("div", { className: "flex w-full flex-col justify-between", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("h2", { className: "text-base font-bold md:text-lg lg:text-2xl", children: title }), category && (_jsx("span", { className: "flex self-center text-base font-bold cursor-pointer text-sky-500 md:text-lg lg:text-2xl hover:text-sky-400 hover:underline", children: _jsx(Link, { onClick: () => socket.emit('getLoggedInUsers', ''), to: `/categories/${replaceSpacesWithDash(category)}`, children: category }) }))] }), _jsx("h4", { className: "pt-1 text-left text-sm", children: subTitle })] }) })), _jsxs("div", { className: "m-auto flex h-96 w-full overflow-x-auto", ref: navElement, children: [scroll.start && gigs.length > 2 && (_jsx("span", { onClick: slideLeft, className: "absolute left-2 z-50 flex cursor-pointer justify-start self-center rounded-full bg-sky-400 sm:left-3 md:left-7 lg:left-0", children: _jsx(FaAngleLeft, { className: "text-3xl text-white sm:text-3xl md:text-4xl lg:text-4xl" }) })), _jsx("div", { className: "relative flex gap-x-8 pt-3", children: gigs.map((gig) => (_jsx("div", { className: `${width}`, children: type === 'home' ? _jsx(GigCardDisplayItem, { gig: gig, linkTarget: false, showEditIcon: false }) : _jsx(GigIndexItem, { gig: gig }) }, uuidv4()))) }), !scroll.end && gigs.length > 2 && (_jsx("span", { onClick: slideRight, className: "absolute right-2 flex max-w-4xl cursor-pointer justify-end self-center rounded-full bg-sky-400 sm:right-3 md:right-7 lg:right-0", children: _jsx(FaAngleRight, { className: "text-3xl text-white sm:text-3xl md:text-4xl lg:text-4xl" }) }))] })] }));
};
export default TopGigsView;
