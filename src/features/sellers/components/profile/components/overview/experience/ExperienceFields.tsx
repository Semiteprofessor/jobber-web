import { cloneDeep, findIndex } from 'lodash';
import { ChangeEvent, FC, ReactElement, useContext, useState } from 'react';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { IExperience, IExperienceEditProps } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import TextAreaInput from 'src/shared/inputs/TextAreaInput';
import TextInput from 'src/shared/inputs/TextInput';
import { yearsList } from 'src/shared/utils/utils.service';

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

  return <div>ExperienceFields</div>;
};

export default ExperienceFields;
