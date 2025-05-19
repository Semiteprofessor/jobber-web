import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cloneDeep, findIndex } from 'lodash';
import { useContext, useState } from 'react';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import Button from 'src/shared/button/Button';
import TextAreaInput from 'src/shared/inputs/TextAreaInput';
import TextInput from 'src/shared/inputs/TextInput';
import { yearsList } from 'src/shared/utils/util.service';
import Dropdown from '../../../../../../../shared/dropdown/Dropdown';
const ExperienceFields = ({ type, selectedExperience, setShowExperienceAddForm, setShowExperienceEditForm }) => {
    const { sellerProfile, setSellerProfile } = useContext(SellerContext);
    const [experienceItem, setExperienceItem] = useState({
        title: selectedExperience?.title ?? '',
        company: selectedExperience?.company ?? '',
        startDate: selectedExperience?.startDate ?? 'Start Year',
        endDate: selectedExperience?.endDate ?? 'End Year',
        description: selectedExperience?.description ?? '',
        currentlyWorkingHere: selectedExperience?.currentlyWorkingHere ?? false
    });
    const [startDate, setStartDate] = useState(selectedExperience?.startDate ?? 'Start Year');
    const [endDate, setEndDate] = useState(selectedExperience?.endDate ?? 'End Year');
    const onHandleUpdate = () => {
        if (type === 'add') {
            const item = {
                title: experienceItem.title,
                company: experienceItem.company,
                startDate,
                endDate,
                description: experienceItem.description,
                currentlyWorkingHere: experienceItem.currentlyWorkingHere
            };
            const clonedExperience = cloneDeep(sellerProfile?.experience);
            clonedExperience.push(item);
            if (setSellerProfile && setShowExperienceAddForm) {
                setSellerProfile({ ...sellerProfile, experience: clonedExperience });
                setShowExperienceAddForm(false);
            }
        }
        else {
            const itemIndex = findIndex(sellerProfile?.experience, (value) => value._id === selectedExperience?._id);
            const clonedExperience = cloneDeep(sellerProfile?.experience);
            const clonedItem = {
                _id: selectedExperience?._id,
                title: experienceItem.title,
                company: experienceItem.company,
                startDate: `${startDate}`,
                endDate: experienceItem.currentlyWorkingHere ? 'Present' : `${endDate}`,
                description: experienceItem.description,
                currentlyWorkingHere: experienceItem.currentlyWorkingHere
            };
            clonedExperience.splice(itemIndex, 1, clonedItem);
            const filtered = clonedExperience.filter((item) => item.title !== '' && item.company !== '');
            if (setSellerProfile && setShowExperienceEditForm) {
                setSellerProfile({ ...sellerProfile, experience: filtered });
                setShowExperienceEditForm(false);
            }
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "flex w-full flex-col", children: [_jsxs("div", { className: "mb-6 px-3 md:mb-16", children: [_jsx(TextInput, { className: "border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none", placeholder: "Title (E.g: CEO)", type: "text", name: "title", value: experienceItem.title, onChange: (event) => setExperienceItem({ ...experienceItem, title: event.target.value }) }), _jsx(TextInput, { className: "border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none", placeholder: "Company name", type: "text", name: "company", value: experienceItem.company, onChange: (event) => setExperienceItem({ ...experienceItem, company: event.target.value }) }), _jsxs("div", { className: "grid h-1/5 grid-cols-2 gap-x-2 gap-y-3", children: [_jsx("div", { className: "relative", children: _jsx(Dropdown, { text: startDate, maxHeight: "300", mainClassNames: "absolute bg-white", values: yearsList(100), setValue: setStartDate }) }), _jsx("div", { className: "relative", style: {
                                        cursor: `${experienceItem.currentlyWorkingHere ? 'none' : 'pointer'}`,
                                        pointerEvents: `${experienceItem.currentlyWorkingHere ? 'none' : 'auto'}`
                                    }, children: _jsx(Dropdown, { text: endDate, maxHeight: "300", mainClassNames: "absolute bg-white", values: yearsList(100), setValue: setEndDate }) })] }), _jsxs("div", { className: "mb-4 mt-2 flex items-center", children: [_jsx(TextInput, { id: "default-checkbox", type: "checkbox", name: "currentlyWorkingHere", className: "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600", value: `${experienceItem.currentlyWorkingHere}`, checked: experienceItem.currentlyWorkingHere, onChange: (event) => {
                                        setEndDate(event.target.checked ? 'Present' : 'End Year');
                                        setExperienceItem({ ...experienceItem, currentlyWorkingHere: event.target.checked });
                                    } }), _jsx("label", { htmlFor: "default-checkbox", className: "ml-2 text-sm font-normal", children: "I am currently working here" })] }), _jsx("div", { className: "mb-5 flex items-center", children: _jsx(TextAreaInput, { className: "border-grey focus:border-grey block w-full rounded border p-2.5 text-sm text-gray-900 focus:ring-blue-500", placeholder: "Write description...", name: "description", value: experienceItem.description, rows: 5, onChange: (event) => setExperienceItem({ ...experienceItem, description: event.target.value }) }) })] }), _jsxs("div", { className: "z-20 mx-3 my-4 mt-10 flex cursor-pointer justify-start md:z-0 md:mt-0", children: [_jsx(Button, { disabled: (startDate === 'Start Year' ||
                                endDate === 'End Year' ||
                                !experienceItem.title ||
                                !experienceItem.company ||
                                !experienceItem.description) &&
                                type === 'add', className: `md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2 ${(startDate === 'Start Year' ||
                                endDate === 'End Year' ||
                                !experienceItem.title ||
                                !experienceItem.company ||
                                !experienceItem.description) &&
                                type === 'add'
                                ? 'cursor-not-allowed opacity-40'
                                : 'cursor-pointer'}`, onClick: onHandleUpdate, label: `${type === 'edit' ? 'Update' : 'Add'}` }), "\u00A0\u00A0", _jsx(Button, { onClick: () => {
                                if (type === 'add' && setShowExperienceAddForm) {
                                    setShowExperienceAddForm(false);
                                }
                                else if (type === 'edit' && setShowExperienceEditForm) {
                                    setShowExperienceEditForm(false);
                                }
                            }, className: "md:text-md rounded bg-gray-300 px-6 py-1 text-center text-sm font-bold hover:bg-gray-200 focus:outline-none md:py-2", label: "Cancel" })] })] }) }));
};
export default ExperienceFields;
