import { cloneDeep, findIndex } from 'lodash';
import { ChangeEvent, FC, ReactElement, useContext, useState } from 'react';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { IExperience, IExperienceEditProps } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import TextAreaInput from 'src/shared/inputs/TextAreaInput';
import TextInput from 'src/shared/inputs/TextInput';
import { yearsList } from 'src/shared/utils/util.service';

import Dropdown from '../../../../../../../shared/dropdown/Dropdown';

const ExperienceFields: FC<IExperienceEditProps> = ({
  type,
  selectedExperience,
  setShowExperienceAddForm,
  setShowExperienceEditForm
}): ReactElement => {
  const { sellerProfile, setSellerProfile } = useContext(SellerContext);
  const [experienceItem, setExperienceItem] = useState<IExperience>({
    title: selectedExperience?.title ?? '',
    company: selectedExperience?.company ?? '',
    startDate: selectedExperience?.startDate ?? 'Start Year',
    endDate: selectedExperience?.endDate ?? 'End Year',
    description: selectedExperience?.description ?? '',
    currentlyWorkingHere: selectedExperience?.currentlyWorkingHere ?? false
  });
  const [startDate, setStartDate] = useState<string>(selectedExperience?.startDate ?? 'Start Year');
  const [endDate, setEndDate] = useState<string>(selectedExperience?.endDate ?? 'End Year');

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
      const clonedExperience: IExperience[] = cloneDeep(sellerProfile?.experience) as IExperience[];
      clonedExperience.push(item);
      if (setSellerProfile && setShowExperienceAddForm) {
        setSellerProfile({ ...sellerProfile, experience: clonedExperience });
        setShowExperienceAddForm(false);
      }
    } else {
      const itemIndex: number = findIndex(sellerProfile?.experience, (value: IExperience) => value._id === selectedExperience?._id);
      const clonedExperience: IExperience[] = cloneDeep(sellerProfile?.experience) as IExperience[];
      const clonedItem: IExperience = {
        _id: selectedExperience?._id,
        title: experienceItem.title,
        company: experienceItem.company,
        startDate: `${startDate}`,
        endDate: experienceItem.currentlyWorkingHere ? 'Present' : `${endDate}`,
        description: experienceItem.description,
        currentlyWorkingHere: experienceItem.currentlyWorkingHere
      };
      clonedExperience.splice(itemIndex, 1, clonedItem);
      const filtered: IExperience[] = clonedExperience.filter((item: IExperience) => item.title !== '' && item.company !== '');
      if (setSellerProfile && setShowExperienceEditForm) {
        setSellerProfile({ ...sellerProfile, experience: filtered });
        setShowExperienceEditForm(false);
      }
    }
  };

  return 
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
      const clonedExperience: IExperience[] = cloneDeep(sellerProfile?.experience) as IExperience[];
      clonedExperience.push(item);
      if (setSellerProfile && setShowExperienceAddForm) {
        setSellerProfile({ ...sellerProfile, experience: clonedExperience });
        setShowExperienceAddForm(false);
      }
    } else {
      const itemIndex: number = findIndex(sellerProfile?.experience, (value: IExperience) => value._id === selectedExperience?._id);
      const clonedExperience: IExperience[] = cloneDeep(sellerProfile?.experience) as IExperience[];
      const clonedItem: IExperience = {
        _id: selectedExperience?._id,
        title: experienceItem.title,
        company: experienceItem.company,
        startDate: `${startDate}`,
        endDate: experienceItem.currentlyWorkingHere ? 'Present' : `${endDate}`,
        description: experienceItem.description,
        currentlyWorkingHere: experienceItem.currentlyWorkingHere
      };
      clonedExperience.splice(itemIndex, 1, clonedItem);
      const filtered: IExperience[] = clonedExperience.filter((item: IExperience) => item.title !== '' && item.company !== '');
      if (setSellerProfile && setShowExperienceEditForm) {
        setSellerProfile({ ...sellerProfile, experience: filtered });
        setShowExperienceEditForm(false);
      }
    }
  };
</div>;
};

export default ExperienceFields;
