import React, { FC, ReactElement, useState } from 'react';
import { ISliderState } from '../interfaces/home.interface';
import { sliderImages } from 'src/shared/utils/static-data';

const HomeSider: FC = (): ReactElement => {
  const [sliderState, setSiderState] = useState<ISliderState>({
    slideShow: sliderImages[0],
    slideIndex: 0
  });
  return <div>HomeSider</div>;
};

export default HomeSider;
