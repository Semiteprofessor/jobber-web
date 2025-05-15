import { FC, Fragment, ReactElement, useEffect, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

import { IStarRatingProps } from '../shared.interface';

const StarRating: FC<IStarRatingProps> = ({ value, size, setReviewRating }): ReactElement => {
  return <div>StarRating</div>;
};

export default StarRating;
