import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
const SellerSocialLinksFields = ({ socialFields, setSocialFields }) => {
    const adSocialLinkFields = () => {
        if (setSocialFields && socialFields) {
            setSocialFields([...socialFields, '']);
        }
    };
    const removeSocialLinkFields = (index) => {
        if (socialFields && setSocialFields && socialFields.length > 1) {
            const data = [...socialFields];
            data.splice(index, 1);
            setSocialFields([...data]);
        }
    };
    const handleSocialLinksFieldsChange = (event, index) => {
        if (setSocialFields && socialFields) {
            const target = event.target;
            const data = [...socialFields];
            data[index] = target.value;
            setSocialFields([...data]);
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "flex w-full flex-col px-6 pb-3 pt-6", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("h2", { className: "pb-4 text-xl font-bold", children: "Social Links" }), _jsx(Button, { onClick: adSocialLinkFields, className: "md:text-md h-7 rounded bg-sky-500 px-6 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-8", label: "Add More" })] }), socialFields?.map((input, index) => (_jsxs("div", { children: [_jsx(TextInput, { className: "border-grey w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none", placeholder: "Social media link", type: "text", name: "url", value: input, onChange: (event) => handleSocialLinksFieldsChange(event, index) }), _jsx("div", { className: "my-4", children: socialFields.length > 1 && index > 0 && (_jsx(Button, { className: "md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-8", onClick: () => removeSocialLinkFields(index), label: "Delete" })) })] }, index)))] }) }));
};
export default SellerSocialLinksFields;
