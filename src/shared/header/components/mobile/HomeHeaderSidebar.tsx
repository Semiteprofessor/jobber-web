import React, { FC, ReactElement, useState } from 'react';
import { IHeaderSideBarProps, ISettings } from '../../interfaces/header.interface';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { lowerCase } from 'src/shared/utils/util.service';

const HomeHeaderSidebar: FC<IHeaderSideBarProps> = ({ setOpenSidebar }): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const seller = useAppSelector((state: IReduxState) => state.seller);
  const buyer = useAppSelector((state: IReduxState) => state.buyer);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [toggleCategories, setToggleCategories] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const isSeller: boolean = (buyer && buyer.isSeller) as boolean;
  const settings: ISettings[] = [
    { id: 1, name: 'Add a new gig', url: `/manage_gigs/new/${seller?._id}`, show: isSeller },
    { id: 2, name: 'Dashboard', url: `/users/${buyer?.username}/${buyer?._id}/orders`, show: true },
    { id: 3, name: 'Profile', url: `/seller_profile/${lowerCase(`${seller?.username}`)}/${seller?._id}/edit`, show: isSeller },
    { id: 4, name: 'Settings', url: `/${lowerCase(`${seller?.username}`)}/edit`, show: true }
  ];
  return <div>HomeHeaderSidebar</div>;
};

export default HomeHeaderSidebar;
