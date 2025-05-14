import React, { FC, ReactElement } from 'react';
import { IHomeHeaderProps } from '../interfaces/header.interface';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/store/store';
import { applicationLogout } from 'src/shared/utils/util.service';

const SettingsDropdown: FC<IHomeHeaderProps> = ({ seller, authUser, buyer, type, setIsDropdownOpen }): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();

  const onLogout = (): void => {
    if (setIsDropdownOpen) {
      setIsDropdownOpen(false);
    }
    applicationLogout(dispatch, navigate);
  };

  return <div>SettingsDropdown</div>;
};

export default SettingsDropdown;
