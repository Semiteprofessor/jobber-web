import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { createSearchParams, Link } from 'react-router-dom';
import { GigContext } from 'src/features/gigs/context/GigContext';
import { replaceSpacesWithDash } from 'src/shared/utils/util.service';
import { v4 as uuidv4 } from 'uuid';
const GigRelatedTags = () => {
    const { gig } = useContext(GigContext);
    return (_jsxs("div", { className: "border-grey mb-8 border", children: [_jsx("div", { className: "flex border-b px-4 py-2", children: _jsx("h4", { className: "font-bold", children: "Related tags" }) }), _jsx("div", { className: "flex min-h-full flex-wrap gap-x-2 gap-y-5 px-2 py-4", children: gig?.tags.map((tag) => (_jsx(Link, { to: `/search/gigs?${createSearchParams({ query: `${replaceSpacesWithDash(`${tag}`.trim())}` })}`, children: _jsx("span", { className: "text-medium left-0 top-0 rounded-md bg-[#edeef3] p-2 font-bold text-[#55545b] hover:underline hover:text-sky-400", children: tag }) }, uuidv4()))) })] }));
};
export default GigRelatedTags;
