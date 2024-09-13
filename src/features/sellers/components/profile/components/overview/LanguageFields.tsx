import { cloneDeep, filter, findIndex } from 'lodash';
import { ChangeEvent, FC, ReactElement, useContext, useState } from 'react';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { ILanguage, ILanguageEditFieldsProps } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import Dropdown from 'src/shared/dropdown/Dropdown';
import TextInput from 'src/shared/inputs/TextInput';
import { languageLevel, showErrorToast } from 'src/shared/utils/utils.service';

const LanguageFields: FC<ILanguageEditFieldsProps> = ({
  type,
  selectedLanguage,
  setShowLanguageAddForm,
  setShowLanguageEditForm
}): ReactElement => {
  const { sellerProfile, setSellerProfile } = useContext(SellerContext);
  const [level, setLevel] = useState<string>(selectedLanguage ? `${selectedLanguage.level}` : '');
  const [language, setLanguage] = useState<string>(selectedLanguage ? `${selectedLanguage.language}` : '');

  return <div>LanguageFields</div>;
};

export default LanguageFields;
