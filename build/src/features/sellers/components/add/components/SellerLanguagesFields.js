import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
import { languageLevel } from 'src/shared/utils/util.service';
import Dropdown from '../../../../../shared/dropdown/Dropdown';
const SellerLanguageFields = ({ languageFields, setLanguageFields }) => {
    const addLanguageFields = () => {
        const newfield = {
            language: '',
            level: 'Level'
        };
        if (languageFields && setLanguageFields) {
            setLanguageFields([...languageFields, newfield]);
        }
    };
    const removeLanguageFields = (index) => {
        if (setLanguageFields && languageFields && languageFields.length > 1) {
            const data = [...languageFields];
            data.splice(index, 1);
            setLanguageFields([...data]);
        }
    };
    const handleLanguageFieldsChange = (event, index) => {
        if (languageFields && setLanguageFields) {
            const target = event.target;
            const data = [...languageFields];
            data[index][target.name] = target.value;
            setLanguageFields([...data]);
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "border-grey flex w-full flex-col border-b px-6 pb-3 pt-6", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("h2", { className: "pb-4 text-xl font-bold", children: "Languages" }), _jsx(Button, { className: "md:text-md h-7 rounded bg-sky-500 px-6 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-8", onClick: addLanguageFields, label: "Add More" })] }), languageFields?.map((input, index) => (_jsxs("div", { className: "grid grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-x-2", children: [_jsx("div", { className: "", children: _jsx(TextInput, { className: "border-grey w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none", type: "text", name: "language", value: input.language, placeholder: "Language", onChange: (event) => handleLanguageFieldsChange(event, index) }) }), _jsx("div", { className: "relative", children: _jsx(Dropdown, { text: input.level, maxHeight: "300", mainClassNames: `absolute bg-white ${index < languageFields.length - 1 ? 'zIndexDropdown' : ''}`, values: languageLevel(), onClick: (item) => {
                                    const data = [...languageFields];
                                    data[index]['level'] = `${item}`;
                                    if (setLanguageFields) {
                                        setLanguageFields([...data]);
                                    }
                                } }) }), _jsx("div", { className: "mb-2", children: languageFields.length > 1 && index > 0 && (_jsx(Button, { className: "md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-8", onClick: () => removeLanguageFields(index), label: "Delete" })) })] }, index)))] }) }));
};
export default SellerLanguageFields;
