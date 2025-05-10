import React, { FC, ReactElement, useEffect, useState } from 'react';
import { ISliderState } from '../interfaces/home.interface';
import { sliderImages, sliderImagesText } from 'src/shared/utils/static-data';
import { ISliderImagesText } from 'src/shared/shared.interface';

const HomeSlider: FC = (): ReactElement => {
  const [slideState, setSlideState] = useState<ISliderState>({
    slideShow: sliderImages[0],
    slideIndex: 0
  });
  const [sliderInterval, setSliderInterval] = useState<NodeJS.Timeout>();
  const [currentSliderImageText, setCurrentSliderImageText] = useState<ISliderImagesText>(sliderImagesText[0]);

  const { sliderIndex, slideShow } = slideState;
  let currentSlideIndex = 0;

  useEffect(() => {
    const timeInterval: NodeJS.Timeout = setInterval(() => {
      autoMoveSlide();
    }, 4000);
    setSliderInterval(timeInterval);

    return () => {
        clearInterval(timeInterval);
        clearInterval(sliderInterval);
    }
  }, []);
  const autoMoveSlide = (): void => {
    const lastIndex = currentSlideIndex + 1;
    currentSlideIndex = lastIndex >= sliderImages.length? 0 : lastIndex;
    setCurrentSliderImageText(sliderImagesText[currentSlideIndex]);
    setSlideState(prev: ISlideState)
  }


  return <div>HomeSlider</div>;
};

export default HomeSlider;
