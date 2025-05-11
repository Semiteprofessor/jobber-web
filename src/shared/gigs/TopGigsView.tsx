import React, { FC, ReactElement, useRef, useState } from 'react';
import { IGigTopProps } from 'src/features/gigs/interfaces/gig.interface';

interface IScrollProps {
  start: boolean;
  end: boolean;
}

const TopGigsView: FC<IGigTopProps> = ({ gigs, title, subTitle, category, width, type }): ReactElement => {
  const navElement = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState<IScrollProps>({
    start: false,
    end: false
  });

  const slideLeft = (): void => {
    if (navElement.current) {
      const maxScrollLeft = navElement.current.scrollWidth + navElement.current.clientWidth;
      navElement.current.scrollLeft = navElement.current.scrollLeft < maxScrollLeft ? navElement.current.scrollLeft - 1000 : maxScrollLeft;
      const maxWidth = navElement.current.scrollLeft + navElement.current.clientWidth;
      setScroll({ start: maxWidth === navElement.current.scrollWidth, end: false });
    }
  };

  const slideRight = (): void => {
    if (navElement.current) {
      const maxScrollLeft = navElement.current.scrollWidth - navElement.current.clientWidth;
      navElement.current.scrollLeft = navElement.current.scrollLeft < maxScrollLeft ? navElement.current.scrollLeft + 1000 : maxScrollLeft;
      const maxWidth = navElement.current.scrollLeft + navElement.current.clientWidth - 1000;
      setScroll({ start: true, end: maxWidth === navElement.current.clientWidth });
    }
  };

  return (
    <div className="mx-auto my-8 flex flex-col overflow-hidden rounded-lg">
      {title && (
        <div>
          <div>
            <div>
              <h2 className="text-base font-bold md:text-lg lg:text-2xl">{title}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopGigsView;
