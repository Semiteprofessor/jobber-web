import { ChangeEvent, FC, ReactElement, useContext, useState } from 'react';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import Button from 'src/shared/button/Button';
import TextAreaInput from 'src/shared/inputs/TextAreaInput';

const Description: FC = (): ReactElement => {
  const { sellerProfile, setSellerProfile, showEditIcons } = useContext(SellerContext);
  const [showDescriptionEditForm, setShowDescriptionEditForm] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(sellerProfile.description ? `${sellerProfile.description}` : '');

  return <div>Description</div>;
};

export default Description;
