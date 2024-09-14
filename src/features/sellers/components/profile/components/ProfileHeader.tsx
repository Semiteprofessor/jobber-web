import 'react-lazy-load-image-component/src/effects/blur.css';

import { ChangeEvent, FC, ReactElement, useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IGigInfo } from 'src/features/gigs/interfaces/gig.interface';
import { IProfileHeaderProps, ISellerProfileItem, IShowEditItem } from 'src/features/sellers/interfaces/seller.interface';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
import StarRating from 'src/shared/rating/StarRating';
import { lowerCase, rating, shortenLargeNumbers } from 'src/shared/utils/utils.service';
import { v4 as uuidv4 } from 'uuid';

const ProfileHeader: FC<IProfileHeaderProps> = ({ sellerProfile, showHeaderInfo, showEditIcons, setSellerProfile }): ReactElement => {
  const [showItemEdit, setShowItemEdit] = useState<IShowEditItem>({
    fullname: false,
    oneliner: false
  });
  
  const [sellerProfileItem, setSellerProfileItem] = useState<ISellerProfileItem>({
    fullname: `${sellerProfile?.fullName}`,
    oneliner: `${sellerProfile?.oneliner}`
  });
  const gridInfo: IGigInfo[] = [
    {
      total: shortenLargeNumbers(sellerProfile?.totalGigs),
      title: 'Total Gigs',
      bgColor: '#50b5ff'
    },
    {
      total: shortenLargeNumbers(sellerProfile?.completedJobs),
      title: 'Completed Orders',
      bgColor: '#f7b124'
    },
    {
      total: shortenLargeNumbers(sellerProfile?.ongoingJobs),
      title: 'Ongoing Orders',
      bgColor: '#8553ee'
    },
    {
      total: shortenLargeNumbers(sellerProfile?.ratingsCount),
      title: 'Ratings & Reviews',
      bgColor: '#ff8b7b'
    }
  ];

  useEffect(() => {
    if (sellerProfile) {
      setSellerProfileItem({ ...sellerProfile, fullname: `${sellerProfile.fullName}`, oneliner: `${sellerProfile.oneliner}` });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellerProfile?.fullName, sellerProfile?.oneliner]);

  return <>{showHeaderInfo && (
        <div className="relative flex h-56 flex-col gap-x-4 gap-y-3 bg-white px-6 py-4 md:h-52 md:flex-row">
          <div className="flex h-20 w-20 justify-center self-center md:h-24 md:w-24 lg:h-36 lg:w-36">
            <LazyLoadImage
              src={sellerProfile?.profilePicture}
              alt="Gig Image"
              className="w-full h-full rounded-full object-cover"
              placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
              effect="blur"
              wrapperClassName="w-full h-full rounded-full object-cover"
            />
          </div></>;
};

export default ProfileHeader;
