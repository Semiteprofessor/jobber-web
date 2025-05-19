import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useState } from 'react';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import Button from 'src/shared/button/Button';
import TextAreaInput from 'src/shared/inputs/TextAreaInput';
const Description = () => {
    const { sellerProfile, setSellerProfile, showEditIcons } = useContext(SellerContext);
    const [showDescriptionEditForm, setShowDescriptionEditForm] = useState(false);
    const [description, setDescription] = useState(sellerProfile?.description ? `${sellerProfile?.description}` : '');
    return (_jsxs("div", { className: "border-grey border bg-white", children: [_jsxs("div", { className: "mb-1 flex justify-between border-b", children: [_jsx("h4", { className: "flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base", children: "DESCRIPTION" }), showEditIcons && !showDescriptionEditForm && (_jsx("span", { onClick: () => {
                            setShowDescriptionEditForm(!showDescriptionEditForm);
                        }, className: "flex cursor-pointer items-center pr-3.5 text-sm text-[#00698c] md:text-base", children: "Edit Description" }))] }), _jsxs("div", { className: "mb-0 py-1.5", children: [!showDescriptionEditForm && _jsx("div", { className: "px-3.5 text-sm md:text-base", children: sellerProfile?.description }), showDescriptionEditForm && (_jsxs("div", { className: "flex w-full flex-col", children: [_jsx("div", { className: "mb-4 px-3", children: _jsx(TextAreaInput, { className: "border-grey focus:border-grey block w-full rounded border p-2.5 text-sm text-gray-900 focus:ring-blue-500", placeholder: "Write description...", name: "description", value: description, rows: 5, maxLength: 600, onChange: (event) => setDescription(event.target.value) }) }), _jsxs("div", { className: "mx-3 mb-2 flex cursor-pointer justify-start", children: [_jsx(Button, { disabled: !description, className: `md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2
                ${!description ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}
                `, label: "Update", onClick: () => {
                                            if (setSellerProfile) {
                                                setSellerProfile({ ...sellerProfile, description });
                                                setShowDescriptionEditForm(false);
                                            }
                                        } }), "\u00A0\u00A0", _jsx(Button, { className: "md:text-md rounded bg-gray-300 px-6 py-1 text-center text-sm font-bold hover:bg-gray-200 focus:outline-none md:py-2", label: "Cancel", onClick: () => setShowDescriptionEditForm(false) })] })] }))] })] }));
};
export default Description;
