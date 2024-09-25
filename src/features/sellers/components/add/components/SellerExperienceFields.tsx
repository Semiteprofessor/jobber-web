import { ChangeEvent, FC, ReactElement } from 'react';
import { IExperience, IExperienceProps } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import Dropdown from 'src/shared/dropdown/Dropdown';
import TextAreaInput from 'src/shared/inputs/TextAreaInput';
import TextInput from 'src/shared/inputs/TextInput';
import { yearsList } from 'src/shared/utils/utils.service';

const SellerExperienceFields: FC<IExperienceProps> = ({ experienceFields, setExperienceFields }): ReactElement => {
  const handleExperienceFieldsChange = (event: ChangeEvent, index: number): void => {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (experienceFields && setExperienceFields) {
      const data: IExperience[] = [...experienceFields];
      if (target.name === 'currentlyWorkingHere') {
        data[index]['currentlyWorkingHere'] = target.checked;
        data[index]['endDate'] = target.checked ? '' : 'Present';
        updatePresentEndDate(data, index);
      } else {
        data[index][target.name] = target.value;
      }
      setExperienceFields([...data]);
    }
  };

  const addExperienceFields = (): void => {
    const newField: IExperience = {
      title: '',
      company: '',
      startDate: 'Start Year',
      endDate: 'End Year',
      currentlyWorkingHere: false,
      description: ''
    };
    if (setExperienceFields && experienceFields) {
      setExperienceFields([...experienceFields, newField]);
    }
  };

  return <div>SellerExperienceFields</div>;
};

export default SellerExperienceFields;
