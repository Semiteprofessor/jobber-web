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

  const onHandleUpdate = (): void => {
    if (type === 'add') {
      const newItem: ILanguage = {
        level,
        language
      };
      const clonedLanguages: ILanguage[] = cloneDeep(sellerProfile?.languages) as ILanguage[];
      clonedLanguages.push(newItem);
      if (setSellerProfile && setShowLanguageAddForm) {
        setSellerProfile({ ...sellerProfile, languages: clonedLanguages });
        setShowLanguageAddForm(false);
      }
    } else {
      const itemIndex: number = findIndex(sellerProfile.languages, (value: ILanguage) => value._id === selectedLanguage?._id);
      const clonedItem: ILanguage = { level: !language ? '' : level, language, _id: selectedLanguage?._id };
      const clonedLanguages: ILanguage[] = cloneDeep(sellerProfile?.languages) as ILanguage[];
      clonedLanguages.splice(itemIndex, 1, clonedItem);
      const filtered = filter(clonedLanguages, (item: ILanguage) => item.language !== '');
      if (setSellerProfile && setShowLanguageEditForm && filtered.length > 0) {
        setSellerProfile({ ...sellerProfile, languages: clonedLanguages });
        setShowLanguageEditForm(false);
      } else {
        showErrorToast('You need to have at least one language.');
      }
    }
  };

  return <div>LanguageFields</div>;
};

export default LanguageFields;
