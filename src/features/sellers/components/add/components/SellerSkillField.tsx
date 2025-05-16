import { ChangeEvent, FC, ReactElement } from 'react';
import { ISkillProps } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';

const SellerSkillField: FC<ISkillProps> = ({ skillsFields, setSkillsFields }): ReactElement => {
  const addSkillFields = (): void => {
    if (setSkillsFields && skillsFields) {
      setSkillsFields([...skillsFields, '']);
    }
  };

  const removeSkillFields = (index: number): void => {
    if (setSkillsFields && skillsFields && skillsFields.length > 1) {
      const data: string[] = [...skillsFields];
      data.splice(index, 1);
      setSkillsFields([...data]);
    }
  };

  const handleSkillsFieldsChange = (event: ChangeEvent, index: number): void => {
    if (setSkillsFields && skillsFields) {
      const target: HTMLInputElement = event.target as HTMLInputElement;
      const data: string[] = [...skillsFields];
      data[index] = target.value;
      setSkillsFields([...data]);
    }
  };

  return <div>SellerSkillField</div>;
};

export default SellerSkillField;
