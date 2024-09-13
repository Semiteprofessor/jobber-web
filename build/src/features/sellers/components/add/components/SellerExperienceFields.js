import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Button from 'src/shared/button/Button';
import Dropdown from 'src/shared/dropdown/Dropdown';
import TextAreaInput from 'src/shared/inputs/TextAreaInput';
import TextInput from 'src/shared/inputs/TextInput';
import { yearsList } from 'src/shared/utils/util.service';
const SellerExperienceFields = ({ experienceFields, setExperienceFields }) => {
    const handleExperienceFieldsChange = (event, index) => {
        const target = event.target;
        if (experienceFields && setExperienceFields) {
            const data = [...experienceFields];
            if (target.name === 'currentlyWorkingHere') {
                data[index]['currentlyWorkingHere'] = target.checked;
                data[index]['endDate'] = target.checked ? '' : 'Present';
                updatePresentEndDate(data, index);
            }
            else {
                data[index][target.name] = target.value;
            }
            setExperienceFields([...data]);
        }
    };
    const addExperienceFields = () => {
        const newField = {
            title: '',
            company: '',
            startDate: 'Start Year',
            endDate: 'End Year',
            currentlyWorkingHere: false,
            description: ''
        };
        if (setExperienceFields && experienceFields) {
            setExperienceFields([...experienceFields, newField]);
        }
    };
    const removeExperienceFields = (index) => {
        if (experienceFields && experienceFields.length > 1 && setExperienceFields) {
            const data = [...experienceFields];
            data.splice(index, 1);
            setExperienceFields([...data]);
        }
    };
    const updatePresentEndDate = (data, index) => {
        if (setExperienceFields) {
            if (!data[index]['currentlyWorkingHere']) {
                if (data[index]['endDate'] === 'Present') {
                    data[index]['endDate'] = 'End Year';
                    setExperienceFields(data);
                }
                else {
                    data[index]['endDate'] = `${data[index]['endDate'] ?? 'End Year'}`;
                    setExperienceFields([...data]);
                }
            }
            else {
                if (setExperienceFields && experienceFields) {
                    const data = [...experienceFields];
                    data[index]['endDate'] = 'Present';
                    setExperienceFields([...data]);
                }
            }
        }
    };
    return (_jsxs("div", { className: "border-grey flex w-full flex-col border-b px-6 pb-3 pt-6", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("h2", { className: "pb-4 text-xl font-bold", children: "Experience" }), _jsx(Button, { className: "md:text-md h-7 rounded bg-sky-500 px-6 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-8", label: "Add More", onClick: () => addExperienceFields() })] }), experienceFields?.map((input, index) => (_jsxs("div", { className: "mb-4", children: [_jsx(TextInput, { className: "border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none", name: "title", placeholder: "Title (E.g: CEO)", value: input.title, onChange: (event) => handleExperienceFieldsChange(event, index) }), _jsx(TextInput, { className: "border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none", placeholder: "Company name", name: "company", value: input.company, onChange: (event) => handleExperienceFieldsChange(event, index) }), _jsxs("div", { className: "mb-16 grid h-1/5 grid-cols-2 gap-x-2 gap-y-3", children: [_jsx("div", { className: "relative", children: _jsx(Dropdown, { text: input.startDate, maxHeight: "300", mainClassNames: "absolute bg-white", values: yearsList(100), onClick: (item) => {
                                        const data = [...experienceFields];
                                        data[index]['startDate'] = `${item}`;
                                        if (setExperienceFields) {
                                            setExperienceFields(data);
                                        }
                                    } }) }), _jsx("div", { className: "relative", style: {
                                    cursor: `${input.currentlyWorkingHere ? 'none' : 'pointer'}`,
                                    pointerEvents: `${input.currentlyWorkingHere ? 'none' : 'auto'}`
                                }, children: _jsx(Dropdown, { text: input.endDate, maxHeight: "300", mainClassNames: "absolute bg-white", values: yearsList(100), onClick: (item) => {
                                        const data = [...experienceFields];
                                        data[index]['endDate'] = `${item}`;
                                        if (setExperienceFields) {
                                            setExperienceFields(data);
                                        }
                                    } }) })] }), _jsxs("div", { className: "mb-4 mt-2 flex items-center", children: [_jsx(TextInput, { id: "default-checkbox", type: "checkbox", name: "currentlyWorkingHere", value: `${input.currentlyWorkingHere}`, checked: input.currentlyWorkingHere, onChange: (event) => handleExperienceFieldsChange(event, index), className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600" }), _jsx("label", { htmlFor: "default-checkbox", className: "ml-2 text-sm font-normal", children: "I am currently working here" })] }), _jsx("div", { className: "flex items-center", children: _jsx(TextAreaInput, { className: "border-grey focus:border-grey block w-full rounded border p-2.5 text-sm text-gray-900 focus:ring-blue-500", name: "description", value: input.description, rows: 5, onChange: (event) => handleExperienceFieldsChange(event, index), placeholder: "Write description..." }) }), _jsx("div", { className: "mt-2", children: experienceFields.length > 1 && index > 0 && (_jsx(Button, { className: "md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-8", label: "Delete", onClick: () => removeExperienceFields(index) })) })] }, index)))] }));
};
export default SellerExperienceFields;
