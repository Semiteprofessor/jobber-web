import { Transition } from '@headlessui/react';
import { find } from 'lodash';
import { FC, ReactElement, useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import Button from 'src/shared/button/Button';
import { lowerCase } from 'src/shared/utils/utils.service';
import { socket, socketService } from 'src/sockets/socket.service';
import { useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

import DashboardHeaderSideBar from './mobile/DashboardHeaderSideBar';
import SettingsDropdown from './SettingsDropdown';

const DashboardHeader: FC = (): ReactElement => {
  const seller = useAppSelector((state: IReduxState) => state.seller);
  const buyer = useAppSelector((state: IReduxState) => state.buyer);
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [authUsername, setAuthUsername] = useState<string>('');
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  useEffect(() => {
    socketService.setupSocketConnection();
    socket.emit('getLoggedInUsers', '');
    socket.on('online', (data: string[]) => {
      const username = find(data, (name: string) => name === authUser.username);
      setAuthUsername(`${username}`);
    });
  }, [authUser.username]);
  return <div>DashboardHeader</div>;
};

export default DashboardHeader;
