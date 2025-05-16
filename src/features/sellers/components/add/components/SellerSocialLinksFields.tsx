import { ChangeEvent, FC, ReactElement } from 'react';
import { ISocialLinksProps } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';

const SellerSocialLinksFields: FC<ISocialLinksProps> = ({ socialFields, setSocialFields }): ReactElement => {
  const adSocialLinkFields = (): void => {
    if (setSocialFields && socialFields) {
      setSocialFields([...socialFields, '']);
    }
  };

  const removeSocialLinkFields = (index: number): void => {
    if (socialFields && setSocialFields && socialFields.length > 1) {
      const data: string[] = [...socialFields];
      data.splice(index, 1);
      setSocialFields([...data]);
    }
  };

  const handleSocialLinksFieldsChange = (event: ChangeEvent, index: number): void => {
    if (setSocialFields && socialFields) {
      const target: HTMLInputElement = event.target as HTMLInputElement;
      const data: string[] = [...socialFields];
      data[index] = target.value;
      setSocialFields([...data]);
    }
  };
  return <div>SellerSocialLinksFields</div>;
};

export default SellerSocialLinksFields;
