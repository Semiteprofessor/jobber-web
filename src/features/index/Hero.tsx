import React, { FC, ReactElement, RefObject, useEffect, useRef, useState } from 'react';
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

  return <div>Hero</div>;
};

export default Hero;
