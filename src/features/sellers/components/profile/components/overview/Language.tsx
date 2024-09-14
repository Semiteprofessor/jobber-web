import { FC, ReactElement, useContext, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { ILanguage } from 'src/features/sellers/interfaces/seller.interface';
import { v4 as uuidv4 } from 'uuid';

import LanguageFields from './LanguageFields';

const Language: FC = (): ReactElement => {
  const [showLanguageAddForm, setShowLanguageAddForm] = useState<boolean>(false);
  const [showLanguageEditForm, setShowLanguageEditForm] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<ILanguage>();
  const { sellerProfile, showEditIcons } = useContext(SellerContext);

  return 
    <div className="border-grey border bg-white">
      <div className="mb-1 flex justify-between border-b">
        <h4 className="flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base">LANGUAGE SKILLS</h4>
        {showEditIcons && (
          <span
            onClick={() => {
              setShowLanguageAddForm(!showLanguageAddForm);
              setShowLanguageEditForm(false);
            }}
            className="flex cursor-pointer items-center pr-3.5 text-sm text-[#00698c] md:text-base"
          >
            Add New
          </span>
        )}
      </div>
    </div>;
};

export default Language;
