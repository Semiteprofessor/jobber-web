import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cloneDeep, filter, findIndex } from 'lodash';
import { useContext, useState } from 'react';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
const SkillField = ({ type, selectedSkill, setShowSkillAddForm, setShowSkillEditForm }) => {
    const { sellerProfile, setSellerProfile } = useContext(SellerContext);
    const [skill, setSkill] = useState(selectedSkill ?? '');
    const onHandleUpdate = () => {
        if (type === 'add') {
            const clonedSkills = cloneDeep(sellerProfile?.skills);
            clonedSkills.push(skill);
            if (setSellerProfile && setShowSkillAddForm) {
                setSellerProfile({ ...sellerProfile, skills: clonedSkills });
                setShowSkillAddForm(false);
            }
        }
        else {
            const itemIndex = findIndex(sellerProfile.skills, (value) => value === selectedSkill);
            const clonedSkills = cloneDeep(sellerProfile?.skills);
            clonedSkills.splice(itemIndex, 1, skill);
            const filtered = filter(clonedSkills, (item) => item !== '');
            if (setSellerProfile && setShowSkillEditForm) {
                setSellerProfile({ ...sellerProfile, skills: filtered });
                setShowSkillEditForm(false);
            }
        }
    };
    return (_jsxs("div", { className: "flex w-full flex-col", children: [_jsx("div", { className: "mb-6 px-3", children: _jsx(TextInput, { className: "border-grey w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none", placeholder: "Skill E.g: Front End Developer", type: "text", name: "skill", value: skill, onChange: (event) => setSkill(event.target.value) }) }), _jsxs("div", { className: "z-20 mx-3 my-2 flex cursor-pointer justify-start md:z-0 md:mt-0", children: [_jsx(Button, { disabled: !skill && type === 'add', className: `md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2
          ${!skill && type === 'add' ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}
          `, label: `${type === 'add' ? 'Add' : 'Update'}`, onClick: onHandleUpdate }), "\u00A0\u00A0", _jsx(Button, { className: "md:text-md rounded bg-gray-300 px-6 py-1 text-center text-sm font-bold hover:bg-gray-200 focus:outline-none md:py-2", label: "Cancel", onClick: () => {
                            if (type === 'add' && setShowSkillAddForm) {
                                setShowSkillAddForm(false);
                            }
                            else if (type === 'edit' && setShowSkillEditForm) {
                                setShowSkillEditForm(false);
                            }
                        } })] })] }));
};
export default SkillField;
