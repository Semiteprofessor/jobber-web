import { FC, ReactElement, useContext } from 'react';
import { FaMapMarkerAlt, FaRegClock, FaUserAlt } from 'react-icons/fa';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { TimeAgo } from 'src/shared/utils/timeago.utils';

const AboutMe: FC = (): ReactElement => {
  const { sellerProfile } = useContext(SellerContext);
  return <div>AboutMe</div>;
};

export default AboutMe;
