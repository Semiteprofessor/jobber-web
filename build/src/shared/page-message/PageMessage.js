import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
const PageMessage = ({ header, body }) => {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "flex justify-center items-center h-full flex-col", children: [_jsx("h1", { className: "font-extrabold text-xl md:text-2xl lg:text-4xl text-center", children: header }), _jsx("p", { className: "text-base mt-4 md:text-lg text-center w-1/3", children: body }), _jsx(Button, { onClick: () => navigate('/'), disabled: false, className: "mt-5 rounded bg-sky-500 px-6 py-3 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-4 md:py-2 md:text-base", label: "Go Back" })] }));
};
export default PageMessage;
