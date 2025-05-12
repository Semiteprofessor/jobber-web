import React, { FC, ReactElement } from 'react';
import { IHeaderSideBarProps } from '../../interfaces/header.interface';
import { useAppDispatch } from 'src/store/store';

const MobileHeaderSearchInput: FC<IHeaderSideBarProps> = ({ setOpenSidebar }): ReactElement => {
  const dispatch = useAppDispatch();
  return <div>MobileHeaderSearchInput</div>;
};

export default MobileHeaderSearchInput;
