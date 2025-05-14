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

  return <div className="border-grey w-44 divide-y divide-gray-100 rounded border bg-white shadow-md">
      <ul className="text-gray-700s py-2 text-sm" aria-labelledby="avatarButton">
        {buyer && buyer.isSeller && (
          <li className="mx-3 mb-1">
            <Link
              to={`${type === 'buyer' ? `/${lowerCase(`${authUser?.username}`)}/${seller?._id}/seller_dashboard` : '/'}`}
              onClick={() => {
                if (setIsDropdownOpen) {
                  setIsDropdownOpen(false);
                }
                dispatch(updateHeader('sellerDashboard'));
                dispatch(updateCategoryContainer(true));
              }}
              className="block w-full cursor-pointer rounded bg-sky-500 px-4s py-2 text-center font-bold text-white hover:bg-sky-400 focus:outline-none"
            >
              {type === 'buyer' ? 'Switch to Selling' : 'Switch to Buying'}
            </Link>
          </li>
        )}</div>;
};

export default SettingsDropdown;
