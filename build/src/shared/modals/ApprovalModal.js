import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Button from '../button/Button';
import ModalBg from './ModalBg';
const ApprovalModal = ({ approvalModalContent, hideCancel = false, onClick, onClose }) => {
    const { header, body, btnText, btnColor } = approvalModalContent;
    return (_jsx(ModalBg, { children: _jsx("div", { className: "fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center", children: _jsxs("div", { className: "relative bottom-auto left-auto right-auto top-auto max-h-[90vh] max-w-[400px] bg-white p-4 text-[#404145]", children: [_jsx("div", { className: "border-grey mb-[10px] w-full border-b text-left", children: _jsx("h4", { className: "text-[17px] font-bold", children: header }) }), _jsx("div", { className: "mb-5 text-base", children: body }), _jsxs("div", { className: "flex justify-end gap-3", children: [!hideCancel && (_jsx(Button, { className: "rounded bg-gray-200 px-6 py-3 text-center text-sm font-bold text-black focus:outline-none md:px-4 md:py-2 md:text-base", label: "Cancel", onClick: onClose })), _jsx(Button, { className: `${btnColor} rounded px-6 py-3 text-center text-sm font-bold text-white focus:outline-none md:px-4 md:py-2 md:text-base`, label: `${btnText}`, onClick: onClick })] })] }) }) }));
};
export default ApprovalModal;
