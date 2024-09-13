import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Button from 'src/shared/button/Button';
import Dropdown from 'src/shared/dropdown/Dropdown';
import TextInput from 'src/shared/inputs/TextInput';
import { countriesList, degreeList, yearsList } from 'src/shared/utils/util.service';
const SellerEducationFields = ({ educationFields, setEducationFields }) => {
    const handleEducationFieldsChange = (event, index) => {
        if (setEducationFields && educationFields) {
            const target = event.target;
            const data = [...educationFields];
            data[index][target.name] = target.value;
            setEducationFields([...data]);
        }
    };
    const addEducationFields = () => {
        const newfield = {
            country: 'Country',
            university: '',
            title: 'Title',
            major: '',
            year: 'Year'
        };
        if (setEducationFields && educationFields) {
            setEducationFields([...educationFields, newfield]);
        }
    };
    const removeEducationFields = (index) => {
        if (setEducationFields && educationFields && educationFields.length > 1) {
            const data = [...educationFields];
            data.splice(index, 1);
            setEducationFields([...data]);
        }
    };
    return (_jsxs("div", { className: "border-grey flex w-full flex-col border-b px-6 pb-3 pt-6", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("h2", { className: "pb-4 text-xl font-bold", children: "Education" }), _jsx(Button, { className: "md:text-md h-7 rounded bg-sky-500 px-6 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-8", label: "Add More", onClick: () => addEducationFields() })] }), educationFields?.map((input, index) => (_jsxs("div", { children: [_jsx("div", { className: "relative", children: _jsx(TextInput, { className: "border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none", placeholder: "University/College Name", type: "text", name: "university", value: input.university, onChange: (event) => handleEducationFieldsChange(event, index) }) }), _jsx("div", { className: "relative h-[55px]", children: _jsx(Dropdown, { text: input.country, maxHeight: "300", showSearchInput: true, mainClassNames: "absolute bg-white z-40", values: countriesList(), onClick: (item) => {
                                const data = [...educationFields];
                                data[index]['country'] = `${item}`;
                                if (setEducationFields) {
                                    setEducationFields(data);
                                }
                            } }) }), _jsxs("div", { className: "mt-4 grid h-1/5 grid-cols-4 gap-x-2 gap-y-3", children: [_jsx("div", { className: "relative", children: _jsx(Dropdown, { text: input.title, maxHeight: "300", mainClassNames: "absolute bg-white z-30", values: degreeList(), onClick: (item) => {
                                        const data = [...educationFields];
                                        data[index]['title'] = `${item}`;
                                        if (setEducationFields) {
                                            setEducationFields(data);
                                        }
                                    } }) }), _jsx("div", { className: "col-span-2", children: _jsx(TextInput, { className: "border-grey w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none", placeholder: "Major e.g: Computer Engineering", type: "text", name: "major", value: input.major, onChange: (event) => handleEducationFieldsChange(event, index) }) }), _jsx("div", { className: "relative", children: _jsx(Dropdown, { text: input.year, maxHeight: "300", mainClassNames: "absolute bg-white z-30", values: yearsList(100), onClick: (item) => {
                                        const data = [...educationFields];
                                        data[index]['year'] = `${item}`;
                                        if (setEducationFields) {
                                            setEducationFields(data);
                                        }
                                    } }) }), _jsx("div", { className: "mb-2", children: educationFields.length > 1 && index > 0 && (_jsx(Button, { className: "md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-8", onClick: () => removeEducationFields(index), label: "Delete" })) })] })] }, index)))] }));
};
export default SellerEducationFields;
