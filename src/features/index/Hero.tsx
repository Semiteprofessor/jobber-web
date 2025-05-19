import { FC, ReactElement, RefObject, useEffect, useRef, useState } from 'react';
import { createSearchParams, NavigateFunction, useNavigate } from 'react-router-dom';
import Typed from 'typed.js';

const categories: string[] = ['Graphics & Design', 'Digital Marketing', 'Writing & Translation', 'Programming & Tech'];

const Hero: FC = (): ReactElement => {
  const typedElement: RefObject<HTMLSpanElement> = useRef<HTMLSpanElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate: NavigateFunction = useNavigate();

  const navigateToSearchPage = (): void => {
    const url = `/gigs/search?${createSearchParams({ query: searchTerm.trim() })}`;
    navigate(url);
  };

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: [...categories, 'Video & Animation'],
      startDelay: 300,
      typeSpeed: 120,
      backSpeed: 200,
      backDelay: 300
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="relative bg-white pb-20 pt-40 dark:bg-gray-900 lg:pt-44">
      <div className="relative m-auto px-6 xl:container md:px-12 lg:px-6">
        <h3 className="mb-4 mt-4 max-w-2xl pb-2 text-center text-2xl font-normal dark:text-white lg:text-left">
          Expert categories: <span ref={typedElement}></span>
        </h3>
        <h1 className="text-center text-4xl font-black text-blue-900 dark:text-white sm:mx-auto sm:w-10/12 sm:text-5xl md:w-10/12 md:text-5xl lg:w-auto lg:text-left xl:text-7xl">
          Hire expert freelancers <br className="hidden lg:block" />{' '}
          <span className="relative bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
            for your project
          </span>
          .
        </h1>
      </div>
    </div>
  );
};

export default Hero;
