import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { v4 as uuidv4 } from 'uuid';
import { socket } from 'src/sockets/socket.service';
import { Link } from 'react-router-dom';
import GigCardDisplayItem from 'src/shared/gigs/GigCardDisplayItem';
import { replaceSpacesWithDash } from 'src/shared/utils/util.service';
const HomeGigsView = ({ gigs, title, subTitle, category }) => {
    return (_jsxs("div", { className: "border-grey mx-auto my-8 flex flex-col overflow-hidden rounded-lg border", children: [_jsx("div", { className: "flex items-center px-6 py-6 sm:items-start", children: _jsxs("div", { className: "flex w-full flex-col justify-between", children: [_jsxs("div", { className: "flex flex-col gap-2 md:flex-row", children: [_jsx("h2", { className: "flex self-center text-base font-bold md:text-lg lg:text-2xl", children: title }), category && (_jsx("span", { className: "flex self-center text-base font-bold cursor-pointer text-sky-500 md:text-lg lg:text-2xl hover:text-sky-400 hover:underline", children: _jsx(Link, { onClick: () => socket.emit('getLoggedInUsers', ''), to: `/categories/${replaceSpacesWithDash(category)}`, children: category }) }))] }), _jsx("h4", { className: "pt-1 text-center text-sm sm:text-left", children: subTitle })] }) }), _jsx("div", { className: "flex w-full flex-nowrap items-center justify-center overflow-x-hidden px-6 md:overflow-x-auto lg:overflow-x-hidden", children: _jsx("div", { className: "grid justify-center gap-x-8 pt-3 sm:h-full sm:w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5", children: gigs.map((gig) => (_jsx(GigCardDisplayItem, { gig: gig, linkTarget: false, showEditIcon: false }, uuidv4()))) }) })] }));
};
export default HomeGigsView;
