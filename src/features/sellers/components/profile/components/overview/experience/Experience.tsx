import { FC, ReactElement, useContext, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { IExperience } from 'src/features/sellers/interfaces/seller.interface';
import { v4 as uuidv4 } from 'uuid';

import ExperienceFields from './ExperienceFields';

const Experience: FC = (): ReactElement => {
  const [showExperienceAddForm, setShowExperienceAddForm] = useState<boolean>(false);
  const [showExperienceEditForm, setShowExperienceEditForm] = useState<boolean>(false);
  const [selectedExperience, setSelectedExperience] = useState<IExperience>();
  const { showEditIcons, sellerProfile } = useContext(SellerContext);

  return <div>Experience</div>;
};

export default Experience;
