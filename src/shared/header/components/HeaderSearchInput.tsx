import React, { FC, FormEvent, ReactElement, useState } from 'react';
import { createSearchParams, NavigateFunction, useNavigate } from 'react-router-dom';

const HeaderSearchInput: FC = (): ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate: NavigateFunction = useNavigate();

  const navigateToSearchPage = (): void => {
    const url = `/searchgigs?${createSearchParams({ query: searchTerm.trim() })}`;
    navigate(url);
  };

  return (
    <div className="mb-4 flex h-10 w-full self-center opacity-100 md:mb-0 md:mt-0 bg-red-700">
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          navigateToSearchPage();
        }}
        className="flex w-full self-center border opacity-100"
      >
        Text
      </form>
    </div>
  );
};

export default HeaderSearchInput;
