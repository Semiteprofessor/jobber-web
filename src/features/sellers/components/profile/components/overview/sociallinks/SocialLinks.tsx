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

  return <div>SocialLinks</div>;
};

export default SocialLinks;
