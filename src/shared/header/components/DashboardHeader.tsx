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
  return <>
      {openSidebar && <DashboardHeaderSideBar setOpenSidebar={setOpenSidebar} />}
      <header>
        <nav className="navbar peer-checked:navbar-active relative z-20 w-full border-b bg-white shadow-2xl shadow-gray-600/5 backdrop-blur dark:shadow-none">
          <div className="m-auto px-6 xl:container md:px-12 lg:px-6">
            <div className="flex flex-wrap items-center justify-between gap-6 md:gap-0 md:py-3 lg:py-5">
              <div className="flex w-full gap-x-4 lg:w-6/12">
                <div className="flex w-full">
                  <label htmlFor="hbr" className="peer-checked:hamburger relative z-20 -ml-4 block cursor-pointer p-6 lg:hidden">
                    <Button
                      className="m-auto flex h-0.5 w-5 items-center rounded transition duration-300"
                      onClick={() => setOpenSidebar(!openSidebar)}
                      label={
                        <>{openSidebar ? <FaTimes className="h-6 w-6 text-sky-500" /> : <FaBars className="h-6 w-6 text-sky-500" />}</>
                      }
                    />
                  </label>
                  <div className="w-full gap-x-4 md:flex">
                    <Link
                      to={`/${lowerCase(`${seller?.username}`)}/${seller?._id}/seller_dashboard`}
                      className="relative z-10 flex cursor-pointer justify-center self-center text-2xl font-semibold text-black lg:text-3xl"
                    >
                      Jobber
                    </Link>
                  </div>
                </div>
              </div></>;
};

export default DashboardHeader;
