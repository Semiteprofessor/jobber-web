import { jsx as _jsx } from "react/jsx-runtime";
import { FaCircleNotch } from 'react-icons/fa';
const CircularPageLoader = () => {
    return (_jsx("div", { className: "bg-white/[0.8] flex justify-center items-center z-50 left-0 top-0 absolute h-full w-full", children: _jsx(FaCircleNotch, { className: "animate-spin h-10 w-10 mr-3", size: 40, color: "#50b5ff" }) }));
};
export default CircularPageLoader;
