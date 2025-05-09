import React, { FC, ReactElement, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const HeaderSearchInput: FC = (): ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate: NavigateFunction = useNavigate();
  return <div>HeaderSearchInput</div>;
};

export default HeaderSearchInput;
