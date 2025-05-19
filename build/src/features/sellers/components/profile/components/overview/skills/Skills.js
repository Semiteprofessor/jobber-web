import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment, useContext, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { v4 as uuidv4 } from 'uuid';
import SkillField from './SkillField';
const Skills = () => {
    const [showSkillAddForm, setShowSkillAddForm] = useState(false);
    const [showSkillEditForm, setShowSkillEditForm] = useState(false);
    const [showSkillEditIcon, setShowSkillEditIcon] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState('');
    const { sellerProfile, showEditIcons } = useContext(SellerContext);
    return (_jsxs("div", { className: "border-grey mt-6 border bg-white", children: [_jsxs("div", { className: "mb-1 flex justify-between border-b", children: [_jsx("h4", { className: "flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base", children: "SKILLS" }), showEditIcons && !showSkillAddForm && (_jsx("span", { onClick: () => {
                            setShowSkillAddForm(!showSkillAddForm);
                            setShowSkillEditForm(false);
                            setShowSkillEditIcon(false);
                            setSelectedSkill('');
                        }, className: "flex cursor-pointer items-center pr-3.5 text-sm text-[#00698c] md:text-base", children: "Add New" }))] }), _jsxs("div", { className: "mb-0 py-1.5", children: [showSkillAddForm && _jsx(SkillField, { type: "add", setShowSkillAddForm: setShowSkillAddForm }), showSkillEditForm && _jsx(SkillField, { type: "edit", selectedSkill: selectedSkill, setShowSkillEditForm: setShowSkillEditForm }), !showSkillAddForm && (_jsx("div", { className: "flex min-h-full flex-wrap gap-x-4 gap-y-5 px-2 py-4", children: sellerProfile?.skills.map((tag) => (_jsx(Fragment, { children: !showSkillEditForm && (_jsxs("div", { className: "relative w-[130px] cursor-pointer truncate rounded-md border bg-[#edeef3] px-3 py-2 text-center", onMouseEnter: () => {
                                    setShowSkillEditIcon(true);
                                    setSelectedSkill(tag);
                                }, onMouseLeave: () => {
                                    setShowSkillEditIcon(false);
                                    setSelectedSkill('');
                                }, children: [_jsx("span", { className: "left-0 top-0 h-full w-full text-sm font-bold text-[#55545b]", children: tag }), showEditIcons && showSkillEditIcon && selectedSkill === tag && (_jsx("span", { onClick: () => {
                                            setShowSkillAddForm(false);
                                            setShowSkillEditForm(!showSkillEditForm);
                                            setShowSkillEditIcon(false);
                                            setSelectedSkill(tag);
                                        }, className: "absolute left-0 top-0 flex h-full w-full cursor-pointer justify-center bg-white px-4 py-3", children: _jsx(FaPencilAlt, { className: "", size: "13" }) }))] })) }, uuidv4()))) }))] })] }));
};
export default Skills;
