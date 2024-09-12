import { FC, Fragment, ReactElement, useContext, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { v4 as uuidv4 } from 'uuid';

import SkillField from './SkillField';

const Skills: FC = (): ReactElement => {
  const [showSkillAddForm, setShowSkillAddForm] = useState<boolean>(false);
  const [showSkillEditForm, setShowSkillEditForm] = useState<boolean>(false);
  const [showSkillEditIcon, setShowSkillEditIcon] = useState<boolean>(false);
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const { sellerProfile, showEditIcons } = useContext(SellerContext);

  return (
    <div className="border-grey mt-6 border bg-white">
      <div className="mb-1 flex justify-between border-b">
        <h4 className="flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base">SKILLS</h4>
        {showEditIcons && !showSkillAddForm && (
          <span
            onClick={() => {
              setShowSkillAddForm(!showSkillAddForm);
              setShowSkillEditForm(false);
              setShowSkillEditIcon(false);
              setSelectedSkill('');
            }}
            className="flex cursor-pointer items-center pr-3.5 text-sm text-[#00698c] md:text-base"
          >
            Add New
          </span>
        )}
      </div></div>;
};

export default Skills;
