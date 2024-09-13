import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaAngleRight, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
const Breadcrumb = ({ breadCrumbItems }) => {
    return (_jsx("nav", { className: "flex px-5 py-6 text-white bg-sky-500", children: _jsxs("ol", { className: "container mx-auto px-6 md:px-12 lg:px-6 inline-flex items-center space-x-1 md:space-x-3", children: [_jsx("li", { className: "inline-flex items-center", children: _jsxs(Link, { to: "/", className: "inline-flex items-center text-sm font-bold text-white uppercase hover:text-blue-600 dark:text-white dark:hover:text-white", children: [_jsx(FaHome, { className: "mr-2 h-4 w-4" }), "Home"] }) }), breadCrumbItems.map((item) => (_jsxs("div", { className: "flex items-center", children: [_jsx(FaAngleRight, { className: "h-6 w-6 text-white" }), _jsx("a", { href: "#", className: "ml-1 text-sm font-bold text-white uppercase hover:text-blue-600 dark:text-white dark:hover:text-white md:ml-2", children: item })] }, uuidv4())))] }) }));
};
export default Breadcrumb;
