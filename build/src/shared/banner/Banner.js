import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaExclamationTriangle } from 'react-icons/fa';
const Banner = ({ bgColor, text, showLink, linkText, onClick }) => {
    return (_jsx("div", { className: `left-0 top-0 z-50 flex w-full justify-between p-4 ${bgColor}`, children: _jsx("div", { className: "mx-auto flex items-center", children: _jsxs("div", { className: "flex items-center text-sm font-bold text-white", children: [_jsx("span", { className: "mr-1 inline-flex rounded-full p-1", children: _jsx(FaExclamationTriangle, { className: "h-4 w-4 text-white" }) }), _jsxs("span", { className: "flex gap-2", children: [text, showLink && (_jsx("div", { onClick: onClick, className: "cursor-pointer inline font-medium text-blue-500 no-underline hover:underline", children: linkText }))] })] }) }) }));
};
export default Banner;
