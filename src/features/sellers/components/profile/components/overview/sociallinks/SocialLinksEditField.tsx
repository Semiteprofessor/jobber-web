import { cloneDeep, filter, findIndex } from 'lodash';
import { ChangeEvent, FC, ReactElement, useContext, useState } from 'react';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { ISocialEditLinksProps } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';

const SocialLinksEditField: FC<ISocialEditLinksProps> = ({
  type,
  selectedLink,
  setShowSocialLinksAddForm,
  setShowSocialLinksEditForm
}): ReactElement => {
  const [socialLink, setSocialLink] = useState<string>(selectedLink ? `${selectedLink}` : '');
  const { sellerProfile, setSellerProfile } = useContext(SellerContext);

  const onHandleUpdate = (): void => {
    if (type === 'add') {
      const clonedSocialLinks: string[] = cloneDeep(sellerProfile.socialLinks) as string[];
      clonedSocialLinks.push(socialLink);
      if (setSellerProfile && setShowSocialLinksAddForm) {
        setSellerProfile({ ...sellerProfile, socialLinks: clonedSocialLinks });
        setShowSocialLinksAddForm(false);
      }
    } else {
      const itemIndex: number = findIndex(sellerProfile?.socialLinks, (value: string) => value === selectedLink);
      const clonedSocialLinks: string[] = cloneDeep(sellerProfile?.socialLinks) as string[];
      clonedSocialLinks.splice(itemIndex, 1, socialLink);
      const filtered = filter(clonedSocialLinks, (item: string) => item !== '');
      if (setSellerProfile && setShowSocialLinksEditForm) {
        setSellerProfile({ ...sellerProfile, socialLinks: filtered });
        setShowSocialLinksEditForm(false);
      }
    }
  };

  return <div>SocialLinksEditField</div>;
};

export default SocialLinksEditField;
