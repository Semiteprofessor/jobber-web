import React, { FC, ReactElement, useEffect, useState } from 'react';
import { ISliderState } from '../interfaces/home.interface';
import { sliderImages, sliderImagesText } from 'src/shared/utils/static-data';
import { ISliderImagesText } from 'src/shared/shared.interface';

const HomeSider: FC = (): ReactElement => {
  const [sliderState, setSiderState] = useState<ISliderState>({
    slideShow: sliderImages[0],
    slideIndex: 0
  });
  const [sliderInterval, setSiderInterval] = useState<NodeJS.Timeout>();
  const [currentSliderImageText, setCurrentSliderImageText] = useState<ISliderImagesText>(sliderImagesText[0]);

  const { sliderIndex, slideShow } = sliderState;
  let currentSlideIndex = 0;

  useEffect(() => {
    const timeInterval: NodeJS.Timeout = setInterval(() => {
        autoMoveSlide()
    })
  })
  return <div>HomeSider</div>;
};

export default HomeSider;
