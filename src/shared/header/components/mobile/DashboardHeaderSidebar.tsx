import { FC, MouseEvent, ReactElement } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { applicationLogout, lowerCase } from 'src/shared/utils/utils.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

import { IHeaderSideBarProps } from '../../interfaces/header.interface';
import { updateCategoryContainer } from '../../reducers/category.reducer';
import { updateHeader } from '../../reducers/header.reducer';

const DashboardHeaderSideBar: FC<IHeaderSideBarProps> = ({ setOpenSidebar }): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const seller = useAppSelector((state: IReduxState) => state.seller);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const onLogout = async () => {
    applicationLogout(dispatch, navigate);
  };

  return <div>DashboardHeaderSidebar</div>;
};

export default DashboardHeaderSidebar;
