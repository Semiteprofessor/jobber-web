import { FC } from 'react';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { IProfileHeaderProps, ISellerDocument } from 'src/features/sellers/interfaces/seller.interface';

import AboutMe from './overview/aboutme/AboutMe';
import Certifications from './overview/certifications/Certifications';
import Description from './overview/description/Description';
import Education from './overview/education/Education';
import Experience from './overview/experience/Experience';
import Language from './overview/language/Language';
import Skills from './overview/skills/Skills';
import SocialLinks from './overview/sociallinks/SocialLinks';

const SellerOverview: FC<IProfileHeaderProps> = ({ sellerProfile, setSellerProfile, showEditIcons }) => {
  return <div>SellerOverview</div>;
};

export default SellerOverview;
