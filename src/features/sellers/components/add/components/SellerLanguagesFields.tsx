import { ChangeEvent, FC, ReactElement } from 'react';
import { ILanguage, ILanguageProps } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
import { languageLevel } from 'src/shared/utils/util.service';

import Dropdown from '../../../../../shared/dropdown/Dropdown';

const SellerLanguageFields: FC<ILanguageProps> = ({ languageFields, setLanguageFields }): ReactElement => {
  const addLanguageFields = (): void => {
    const newfield: ILanguage = {
      language: '',
      level: 'Level'
    };
    if (languageFields && setLanguageFields) {
      setLanguageFields([...languageFields, newfield]);
    }
  };

  const removeLanguageFields = (index: number): void => {
    if (setLanguageFields && languageFields && languageFields.length > 1) {
      const data: ILanguage[] = [...languageFields];
      data.splice(index, 1);
      setLanguageFields([...data]);
    }
  };

  const handleLanguageFieldsChange = (event: ChangeEvent, index: number): void => {
    if (languageFields && setLanguageFields) {
      const target: HTMLInputElement = event.target as HTMLInputElement;
      const data: ILanguage[] = [...languageFields];
      data[index][target.name] = target.value;
      setLanguageFields([...data]);
    }
  };

  return <div>SellerLanguagesFields</div>;
};

export default SellerLanguagesFields;
