import React, { ChangeEvent, FC, FormEvent, ReactElement, useState } from 'react';
import { createSearchParams, NavigateFunction, useNavigate } from 'react-router-dom';
import TextInput from 'src/shared/inputs/TextInput';

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
        <TextInput
          type="text"
          name="search"
          value={searchTerm}
          placeholder="What service are you looking for today?"
          className="w-full truncate px-4py-[7.5px]"
          onChange={(e: ChangeEvent) => {
            setSearchTerm((e.target as HTMLInputElement).value);
          }}
        />
      </form>
    </div>
  );
};

export default HeaderSearchInput;
