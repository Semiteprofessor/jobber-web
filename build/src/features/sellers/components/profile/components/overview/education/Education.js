import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { v4 as uuidv4 } from 'uuid';
import EducationFields from './EducationFields';
const Education = () => {
    const [showEducationAddForm, setShowEducationAddForm] = useState(false);
    const [showEducationEditForm, setShowEducationEditForm] = useState(false);
    const [selectedEducation, setSelectedEducation] = useState();
    const { showEditIcons, sellerProfile } = useContext(SellerContext);
    return (_jsxs("div", { className: "border-grey mt-6 border bg-white", children: [_jsxs("div", { className: "mb-1 flex justify-between border-b", children: [_jsx("h4", { className: "flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base", children: "EDUCATION" }), showEditIcons && !showEducationAddForm && (_jsx("span", { className: "flex cursor-pointer items-center pr-3.5 text-sm text-[#00698c] md:text-base", onClick: () => {
                            setShowEducationAddForm(!showEducationAddForm);
                            setShowEducationEditForm(false);
                        }, children: "Add New" }))] }), _jsxs("ul", { className: "mb-0 list-none pt-1.5", children: [showEducationAddForm && (_jsx("li", { className: "flex justify-between", children: _jsx(EducationFields, { type: "add", setShowEducationAddForm: setShowEducationAddForm }) })), !showEducationAddForm && (_jsx(_Fragment, { children: sellerProfile?.education.map((education) => (_jsxs("li", { className: "mb-1 flex justify-between", children: [!showEducationEditForm && (_jsxs("div", { className: "col-span-3 ml-4 flex flex-col pb-3 text-sm md:text-base", children: [_jsxs("div", { className: "mr-3 pb-2 font-bold", children: [education.major, " ", education.title] }), _jsxs("div", { className: "mr-3 font-normal", children: [education.university, ", ", education.country, ", Graduated ", education.year] })] })), showEducationEditForm && selectedEducation?._id === education._id && (_jsx(EducationFields, { type: "edit", selectedEducation: selectedEducation, setShowEducationEditForm: setShowEducationEditForm })), !showEducationEditForm && showEditIcons && (_jsx("div", { className: "mr-4", children: _jsx(FaPencilAlt, { size: "12", className: "ml-1 mt-1.5 cursor-pointer lg:ml-2.5 lg:mt-2", onClick: () => {
                                            setSelectedEducation(education);
                                            setShowEducationEditForm(!showEducationEditForm);
                                            setShowEducationAddForm(false);
                                        } }) }))] }, uuidv4()))) }))] })] }));
};
export default Education;
