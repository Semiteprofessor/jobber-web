import { jsx as _jsx } from "react/jsx-runtime";
const ModalBg = ({ children }) => {
    return (_jsx("div", { className: "fixed left-0 top-0 right-0 bottom-0 h-full w-full z-50 overflow-hidden", children: _jsx("div", { className: "py-2 z-10 absolute top-0 right-0 left-0 bottom-0 bg-black/[.65]", children: children }) }));
};
export default ModalBg;
