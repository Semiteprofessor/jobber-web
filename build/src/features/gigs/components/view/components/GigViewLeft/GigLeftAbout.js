import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from 'react';
import { GigContext } from 'src/features/gigs/context/GigContext';
// import HtmlParser from 'src/shared/html-parser/HtmlParser';
import { v4 as uuidv4 } from 'uuid';
const GigLeftAbout = () => {
    const { gig } = useContext(GigContext);
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "font-semibold text-lg mt-10 pb-6", children: "About This Gig" }), _jsx("div", { className: "pb-6", children: gig.description }), _jsx("hr", { className: "border-grey my-3" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-y-4", children: [_jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-[#95979d]", children: "Main Categories" }), _jsx("span", { className: "font-normal", children: gig.categories })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-[#95979d]", children: "Sub Categories" }), _jsx("div", { className: "flex flex-col", children: gig?.subCategories.map((category, index) => (_jsxs("span", { className: "font-normal", children: [`${category}${index !== gig.subCategories.length - 1 ? ',' : ''}`, "\u00A0"] }, uuidv4()))) })] })] }), _jsx("hr", { className: "border-grey my-3" })] }));
};
export default GigLeftAbout;
