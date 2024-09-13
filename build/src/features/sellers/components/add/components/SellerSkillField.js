import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
const SellerSkillField = ({ skillsFields, setSkillsFields }) => {
    const addSkillFields = () => {
        if (setSkillsFields && skillsFields) {
            setSkillsFields([...skillsFields, '']);
        }
    };
    const removeSkillFields = (index) => {
        if (setSkillsFields && skillsFields && skillsFields.length > 1) {
            const data = [...skillsFields];
            data.splice(index, 1);
            setSkillsFields([...data]);
        }
    };
    const handleSkillsFieldsChange = (event, index) => {
        if (setSkillsFields && skillsFields) {
            const target = event.target;
            const data = [...skillsFields];
            data[index] = target.value;
            setSkillsFields([...data]);
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "border-grey flex w-full flex-col border-b px-6 pb-3 pt-6", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("h2", { className: "pb-4 text-xl font-bold", children: "Skills" }), _jsx(Button, { onClick: addSkillFields, className: "md:text-md h-7 rounded bg-sky-500 px-6 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-8", label: "Add More" })] }), skillsFields?.map((input, index) => (_jsxs("div", { children: [_jsx(TextInput, { className: "border-grey w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none", placeholder: "Skill E.g: Front End Developer", type: "text", name: "skill", value: input, onChange: (event) => handleSkillsFieldsChange(event, index) }), _jsx("div", { className: "my-3", children: skillsFields.length > 1 && index > 0 && (_jsx(Button, { className: "md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-8", onClick: () => removeSkillFields(index), label: "Delete" })) })] }, index)))] }) }));
};
export default SellerSkillField;
