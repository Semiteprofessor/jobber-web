import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cloneDeep, findIndex } from 'lodash';
import { useContext, useState } from 'react';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
import { countriesList, degreeList, yearsList } from 'src/shared/utils/util.service';
import Dropdown from '../../../../../../../shared/dropdown/Dropdown';
const EducationFields = ({ type, selectedEducation, setShowEducationAddForm, setShowEducationEditForm }) => {
    const { sellerProfile, setSellerProfile } = useContext(SellerContext);
    const [country, setCountry] = useState(selectedEducation?.country ?? 'Country');
    const [university, setUniversity] = useState(selectedEducation?.university ?? '');
    const [title, setTitle] = useState(selectedEducation?.title ?? 'Title');
    const [major, setMajor] = useState(selectedEducation?.major ?? '');
    const [year, setYear] = useState(selectedEducation?.year ?? 'Year');
    const onHandleUpdate = () => {
        if (type === 'add') {
            const item = {
                title,
                country,
                university,
                major,
                year: `${year}`
            };
            const clonedEducation = cloneDeep(sellerProfile?.education);
            clonedEducation.push(item);
            if (setSellerProfile && setShowEducationAddForm) {
                setSellerProfile({ ...sellerProfile, education: clonedEducation });
                setShowEducationAddForm(false);
            }
        }
        else {
            const itemIndex = findIndex(sellerProfile?.education, (value) => value._id === selectedEducation?._id);
            const clonedEducation = cloneDeep(sellerProfile?.education);
            const clonedItem = {
                _id: selectedEducation?._id,
                title,
                country,
                university,
                major,
                year
            };
            clonedEducation.splice(itemIndex, 1, clonedItem);
            const filtered = clonedEducation.filter((item) => item.university !== '' && item.major !== '');
            if (setSellerProfile && setShowEducationEditForm) {
                setSellerProfile({ ...sellerProfile, education: filtered });
                setShowEducationEditForm(false);
            }
        }
    };
    return (_jsxs("div", { className: "flex w-full flex-col", children: [_jsxs("div", { className: "mb-4 px-3", children: [_jsx("div", { className: "relative", children: _jsx(TextInput, { className: "border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none", placeholder: "University/College Name", type: "text", name: "university", value: university, onChange: (event) => setUniversity(event.target.value) }) }), _jsx("div", { className: "relative h-[55px]", children: _jsx(Dropdown, { text: country, maxHeight: "300", showSearchInput: true, mainClassNames: "absolute bg-white z-50", values: countriesList(), setValue: setCountry }) }), _jsxs("div", { className: "mt-4 grid h-1/5 grid-cols-4 gap-x-2 gap-y-3", children: [_jsx("div", { className: "relative", children: _jsx(Dropdown, { text: title, maxHeight: "300", mainClassNames: "absolute bg-white z-30", values: degreeList(), setValue: setTitle }) }), _jsx("div", { className: "col-span-2", children: _jsx(TextInput, { className: "border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none", placeholder: "Major e.g: Computer Engineering", type: "text", name: "major", value: major, onChange: (event) => setMajor(event.target.value) }) }), _jsx("div", { className: "relative", children: _jsx(Dropdown, { text: year, maxHeight: "300", mainClassNames: "absolute bg-white z-30", values: yearsList(100), setValue: setYear }) })] })] }), _jsxs("div", { className: "mx-3 my-4 flex cursor-pointer justify-start md:z-0 md:mt-0", children: [_jsx(Button, { disabled: (country === 'Country' || title === 'Title' || year === 'Year' || !university || !major) && type === 'add', className: `md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2 ${(country === 'Country' || title === 'Title' || year === 'Year' || !university || !major) && type === 'add'
                            ? 'cursor-not-allowed opacity-40'
                            : 'cursor-pointer'}`, onClick: onHandleUpdate, label: `${type === 'edit' ? 'Update' : 'Add'}` }), "\u00A0\u00A0", _jsx(Button, { onClick: () => {
                            if (type === 'add' && setShowEducationAddForm) {
                                setShowEducationAddForm(false);
                            }
                            else if (type === 'edit' && setShowEducationEditForm) {
                                setShowEducationEditForm(false);
                            }
                        }, className: "md:text-md rounded bg-gray-300 px-6 py-1 text-center text-sm font-bold hover:bg-gray-200 focus:outline-none md:py-2", label: "Cancel" })] })] }));
};
export default EducationFields;
