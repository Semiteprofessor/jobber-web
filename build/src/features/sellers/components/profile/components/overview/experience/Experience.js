import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { v4 as uuidv4 } from 'uuid';
import ExperienceFields from './ExperienceFields';
const Experience = () => {
    const [showExperienceAddForm, setShowExperienceAddForm] = useState(false);
    const [showExperienceEditForm, setShowExperienceEditForm] = useState(false);
    const [selectedExperience, setSelectedExperience] = useState();
    const { showEditIcons, sellerProfile } = useContext(SellerContext);
    return (_jsxs("div", { className: "border-grey mt-6 border bg-white", children: [_jsxs("div", { className: "mb-1 flex justify-between border-b", children: [_jsx("h4", { className: "flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base", children: "EXPERIENCE" }), showEditIcons && !showExperienceAddForm && (_jsx("span", { className: "flex cursor-pointer items-center pr-3.5 text-sm text-[#00698c] md:text-base", onClick: () => {
                            setShowExperienceAddForm(!showExperienceAddForm);
                        }, children: "Add New" }))] }), _jsxs("ul", { className: "mb-0 list-none pt-1.5", children: [showExperienceAddForm && (_jsx("li", { className: "flex justify-between", children: _jsx(ExperienceFields, { type: "add", setShowExperienceAddForm: setShowExperienceAddForm }) })), !showExperienceAddForm && (_jsx(_Fragment, { children: sellerProfile?.experience.map((experience) => (_jsxs("li", { className: "mb-1 flex justify-between", children: [!showExperienceEditForm && (_jsxs("div", { className: "col-span-3 ml-4 flex flex-col pb-3 text-sm md:text-base", children: [_jsx("div", { className: "mr-3 font-bold ", children: experience.title }), _jsx("div", { className: "mr-3 font-normal", children: experience.company }), _jsxs("div", { className: "mr-3 font-normal", children: [experience.startDate, " - ", experience.endDate] })] })), showExperienceEditForm && selectedExperience?._id === experience._id && (_jsx(ExperienceFields, { type: "edit", selectedExperience: selectedExperience, setShowExperienceEditForm: setShowExperienceEditForm })), !showExperienceEditForm && showEditIcons && (_jsx("div", { className: "mr-4", children: _jsx(FaPencilAlt, { size: "12", className: "ml-1 mt-1.5 cursor-pointer lg:ml-2.5 lg:mt-2", onClick: () => {
                                            setSelectedExperience(experience);
                                            setShowExperienceEditForm(!showExperienceEditForm);
                                            setShowExperienceAddForm(false);
                                        } }) }))] }, uuidv4()))) }))] })] }));
};
export default Experience;
