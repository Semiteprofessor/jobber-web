import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ISellerDocument } from 'src/features/sellers/interfaces/seller.interface';
import StarRating from 'src/shared/rating/StarRating';
import { lowerCase, rating } from 'src/shared/utils/utils.service';
import { v4 as uuidv4 } from 'uuid';

import { IFeaturedExpertProps } from '../interfaces/home.interface';

const FeaturedExperts: FC<IFeaturedExpertProps> = ({ sellers }): ReactElement => {
  return <div>FeaturedExperts</div>;
};

export default FeaturedExperts;
