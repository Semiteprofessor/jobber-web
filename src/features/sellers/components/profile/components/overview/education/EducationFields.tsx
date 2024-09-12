import { cloneDeep, findIndex } from 'lodash';
import { ChangeEvent, FC, ReactElement, useContext, useState } from 'react';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { IEducation, IEducationEditProps } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
import { countriesList, degreeList, yearsList } from 'src/shared/utils/utils.service';

import Dropdown from '../../../../../../../shared/dropdown/Dropdown';

const EducationFields: FC<IEducationEditProps> = ({
  type,
  selectedEducation,
  setShowEducationAddForm,
  setShowEducationEditForm
}): ReactElement => {
  const { sellerProfile, setSellerProfile } = useContext(SellerContext);
  const [country, setCountry] = useState<string>(selectedEducation?.country ?? 'Country');
  const [university, setUniversity] = useState<string>(selectedEducation?.university ?? '');
  const [title, setTitle] = useState<string>(selectedEducation?.title ?? 'Title');
  const [major, setMajor] = useState<string>(selectedEducation?.major ?? '');
  const [year, setYear] = useState<string>(selectedEducation?.year ?? 'Year');

  const onHandleUpdate = (): void => {
    if (type === 'add') {
      const item: IEducation = {
        title,
        country,
        university,
        major,
        year: `${year}`
      };
      const clonedEducation: IEducation[] = cloneDeep(sellerProfile?.education) as IEducation[];
      clonedEducation.push(item);
      if (setSellerProfile && setShowEducationAddForm) {
        setSellerProfile({ ...sellerProfile, education: clonedEducation });
        setShowEducationAddForm(false);
      }
    } else {
      const itemIndex: number = findIndex(sellerProfile?.education, (value: IEducation) => value._id === selectedEducation?._id);
      const clonedEducation: IEducation[] = cloneDeep(sellerProfile?.education) as IEducation[];
      const clonedItem: IEducation = {
        _id: selectedEducation?._id,
        title,
        country,
        university,
        major,
        year
      };
      clonedEducation.splice(itemIndex, 1, clonedItem);
      const filtered: IEducation[] = clonedEducation.filter((item: IEducation) => item.university !== '' && item.major !== '');
      if (setSellerProfile && setShowEducationEditForm) {
        setSellerProfile({ ...sellerProfile, education: filtered });
        setShowEducationEditForm(false);
      }
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-4 px-3">
        <div className="relative">
          <TextInput
            className="border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
            placeholder="University/College Name"
            type="text"
            name="university"
            value={university}
            onChange={(event: ChangeEvent) => setUniversity((event.target as HTMLInputElement).value)}
          />
        </div>
        <div className="relative h-[55px]">
          <Dropdown
            text={country}
            maxHeight="300"
            showSearchInput={true}
            mainClassNames="absolute bg-white z-50"
            values={countriesList()}
            setValue={setCountry}
          />
        </div></div>;
};

export default EducationFields;
