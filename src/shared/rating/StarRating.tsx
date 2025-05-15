import { FC, Fragment, ReactElement, useEffect, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

import { IStarRatingProps } from '../shared.interface';

const StarRating: FC<IStarRatingProps> = ({ value, size, setReviewRating }): ReactElement => {
  const [numberOfStars] = useState<number[]>([...Array(5).keys()].map((index: number) => index + 1));
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    if (value) {
      setRating(value);
    }
  }, [value]);

  const handleClick = (index: number): void => {
    if (!value && setReviewRating) {
      setRating(index);
      setReviewRating(index);
    }
  };

  return <div>StarRating</div>;
};

export default StarRating;
