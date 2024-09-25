import { ChangeEvent, FC, ReactElement } from 'react';
import { IEducation, IEducationProps } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import Dropdown from 'src/shared/dropdown/Dropdown';
import TextInput from 'src/shared/inputs/TextInput';
import { countriesList, degreeList, yearsList } from 'src/shared/utils/util.service';

const SellerEducationFields: FC<IEducationProps> = ({ educationFields, setEducationFields }): ReactElement => {
  const handleEducationFieldsChange = (event: ChangeEvent, index: number): void => {
    if (setEducationFields && educationFields) {
      const target: HTMLInputElement = event.target as HTMLInputElement;
      const data: IEducation[] = [...educationFields];
      data[index][target.name] = target.value;
      setEducationFields([...data]);
    }
  };

  const addEducationFields = (): void => {
    const newfield: IEducation = {
      country: 'Country',
      university: '',
      title: 'Title',
      major: '',
      year: 'Year'
    };
    if (setEducationFields && educationFields) {
      setEducationFields([...educationFields, newfield]);
    }
  };

  return <div>SellerEducationFields</div>;
};

export default SellerEducationFields;
