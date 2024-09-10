import { FC, ReactElement, useContext, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { v4 as uuidv4 } from 'uuid';

import SocialLinksEditField from './SocialLinksEditField';

const SocialLinks: FC = (): ReactElement => {
  const [showSocialLinkAddForm, setShowSocialLinkAddForm] = useState<boolean>(false);
  const [showSocialLinkEditForm, setShowSocialLinkEditForm] = useState<boolean>(false);
  const [selectedSocialLink, setSelectedSocialLink] = useState<string>();
  const { sellerProfile, showEditIcons } = useContext(SellerContext);

  return (
    <div className="border-grey border bg-white mt-6">
      <div className="mb-1 flex justify-between border-b">
        <h4 className="flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base">SOCIAL LINKS</h4>
        {showEditIcons && (
          <span
            onClick={() => {
              setShowSocialLinkAddForm(!showSocialLinkAddForm);
              setShowSocialLinkEditForm(false);
            }}
            className="flex cursor-pointer items-center pr-3.5 text-[#00698c] text-sm md:text-base"
          >
            Add New
          </span>
        )}
      </div></div>;
};

export default SocialLinks;
