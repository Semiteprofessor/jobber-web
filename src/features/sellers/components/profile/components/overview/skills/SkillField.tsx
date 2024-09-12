import { cloneDeep, filter, findIndex } from 'lodash';
import { ChangeEvent, FC, ReactElement, useContext, useState } from 'react';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { ISkillEditProps } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';

const SkillField: FC<ISkillEditProps> = ({ type, selectedSkill, setShowSkillAddForm, setShowSkillEditForm }): ReactElement => {
  const { sellerProfile, setSellerProfile } = useContext(SellerContext);
  const [skill, setSkill] = useState<string>(selectedSkill ?? '');

  const onHandleUpdate = (): void => {
    if (type === 'add') {
      const clonedSkills: string[] = cloneDeep(sellerProfile?.skills) as string[];
      clonedSkills.push(skill);
      if (setSellerProfile && setShowSkillAddForm) {
        setSellerProfile({ ...sellerProfile, skills: clonedSkills });
        setShowSkillAddForm(false);
      }
    } else {
      const itemIndex: number = findIndex(sellerProfile.skills, (value: string) => value === selectedSkill);
      const clonedSkills: string[] = cloneDeep(sellerProfile?.skills) as string[];
      clonedSkills.splice(itemIndex, 1, skill);
      const filtered: string[] = filter(clonedSkills, (item: string) => item !== '');
      if (setSellerProfile && setShowSkillEditForm) {
        setSellerProfile({ ...sellerProfile, skills: filtered });
        setShowSkillEditForm(false);
      }
    }
  };

  return <div>SkillField</div>;
};

export default SkillField;
