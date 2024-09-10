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

  const onCancelUpdate = (): void => {
    if (type === 'add' && setShowSocialLinksAddForm) {
      setShowSocialLinksAddForm(false);
    } else if (type === 'edit' && setShowSocialLinksEditForm) {
      setShowSocialLinksEditForm(false);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-6 px-3">
        <TextInput
          className="border-grey w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
          placeholder="Social media link"
          type="text"
          name="socialLink"
          value={socialLink}
          onChange={(event: ChangeEvent) => {
            setSocialLink((event.target as HTMLInputElement).value);
          }}
        />
      </div></div>;
};

export default SocialLinksEditField;
