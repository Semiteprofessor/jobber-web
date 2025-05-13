import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { IHeaderModalProps } from '../interfaces/header.interface';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';
import { useGetNotificationsByIdQuery } from 'src/features/order/services/notification.service';
import { useResendEmailMutation } from 'src/features/auth/services/auth.service';
import useDetectOutsideClick from 'src/shared/hooks/useDetectOutsideClick';
import { IResponse } from 'src/shared/shared.interface';
import { addAuthUser } from 'src/features/auth/reducers/auth.reducer';
import { showErrorToast, showSuccessToast } from 'src/shared/utils/util.service';
import { updateHeader } from '../reducers/header.reducer';
import { updateCategoryContainer } from '../reducers/category.reducer';
import { socket, socketService } from 'src/sockets/socket.service';
import { filter, find } from 'lodash';
import { updateNotification } from '../reducers/notification.reducer';
import { IMessageDocument } from 'src/features/chat/interfaces/chat.interface';
import { IOrderNotifcation } from 'src/features/order/interfaces/order.interface';

const HomeHeader: FC<IHeaderModalProps> = ({ showCategotyContainer }): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const seller = useAppSelector((state: IReduxState) => state.seller);
  const logout = useAppSelector((state: IReduxState) => state.logout);
  const buyer = useAppSelector((state: IReduxState) => state.buyer);
  const notification = useAppSelector((state: IReduxState) => state.notification);
  const settingsDropdownRef = useRef<HTMLDivElement | null>(null);
  const messageDropdownRef = useRef<HTMLDivElement | null>(null);
  const notificationDropdownRef = useRef<HTMLDivElement | null>(null);
  const orderDropdownRef = useRef<HTMLDivElement | null>(null);
  const navElement = useRef<HTMLDivElement | null>(null);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [authUsername, setAuthUsername] = useState<string>('');
  const dispatch = useAppDispatch();
  const { data, isSuccess } = useGetNotificationsByIdQuery(`${authUser.username}`, { refetchOnMountOrArgChange: true });
  const [resendEmail] = useResendEmailMutation();

  const [isSettingsDropdown, setIsSettingsDropdown] = useDetectOutsideClick(settingsDropdownRef, false);
  const [isMessageDropdownOpen, setIsMessageDropdownOpen] = useDetectOutsideClick(messageDropdownRef, false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useDetectOutsideClick(notificationDropdownRef, false);
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useDetectOutsideClick(orderDropdownRef, false);

  const onResendEmail = async (): Promise<void> => {
    try {
      const result: IResponse = await resendEmail({ userId: authUser.id as number, email: `${authUser.email}` }).unwrap();
      dispatch(addAuthUser({ authInfo: result.user }));
      showSuccessToast('Email sent successfully.');
    } catch (error) {
      showErrorToast('Error sending email.');
    }
  };

  const toggleDropdown = (): void => {
    setIsSettingsDropdown(!isSettingsDropdown);
    setIsMessageDropdownOpen(false);
    setIsNotificationDropdownOpen(false);
    setIsOrderDropdownOpen(false);
  };

  const toggleMessageDropdown = (): void => {
    setIsMessageDropdownOpen(!isMessageDropdownOpen);
    setIsNotificationDropdownOpen(false);
    setIsOrderDropdownOpen(false);
    setIsSettingsDropdown(false);
    dispatch(updateHeader('home'));
    dispatch(updateCategoryContainer(true));
  };

  const toggleOrdersDropdown = (): void => {
    setIsOrderDropdownOpen(!isOrderDropdownOpen);
    setIsMessageDropdownOpen(false);
    setIsNotificationDropdownOpen(false);
    setIsSettingsDropdown(false);
    dispatch(updateHeader('home'));
    dispatch(updateCategoryContainer(true));
  };

  const toggleNotificationDropdown = (): void => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
    setIsOrderDropdownOpen(false);
    setIsMessageDropdownOpen(false);
    setIsSettingsDropdown(false);
    dispatch(updateHeader('home'));
    dispatch(updateCategoryContainer(true));
  };

  const slideLeft = (): void => {
    if (navElement.current) {
      const maxScrollLeft = navElement.current.scrollWidth + navElement.current.clientWidth; // maximum scroll position
      navElement.current.scrollLeft = navElement.current.scrollLeft < maxScrollLeft ? navElement.current.scrollLeft - 1000 : maxScrollLeft;
    }
  };

  const slideRight = (): void => {
    if (navElement.current) {
      const maxScrollLeft = navElement.current.scrollWidth - navElement.current.clientWidth; // maximum scroll position
      navElement.current.scrollLeft = navElement.current.scrollLeft < maxScrollLeft ? navElement.current.scrollLeft + 1000 : maxScrollLeft;
    }
  };

  useEffect(() => {
    socketService.setupSocketConnection();
    socket.emit('getLoggedInUsers', '');
    if (isSuccess) {
      const list: IOrderNotifcation[] = filter(
        data.notifications,
        (item: IOrderNotifcation) => !item.isRead && item.userTo === authUser?.username
      );
      dispatch(updateNotification({ hasUnreadNotification: list.length > 0 }));
    }
  }, [isSuccess, authUser.username, data?.notifications, dispatch]);

  useEffect(() => {
    socket.on('message received', (data: IMessageDocument) => {
      // only for receiver
      if (data.receiverUsername === `${authUser.username}` && !data.isRead) {
        dispatch(updateNotification({ hasUnreadMessage: true }));
      }
    });

    socket.on('order notification', (_, data: IOrderNotifcation) => {
      // only for receiver
      if (data.userTo === `${authUser.username}` && !data.isRead) {
        dispatch(updateNotification({ hasUnreadNotification: true }));
      }
    });

    socket.on('online', (data: string[]) => {
      const username = find(data, (name: string) => name === authUser.username);
      setAuthUsername(`${username}`);
    });
  }, [authUser.username, dispatch]);

  return (
    <>
    {openSidebar && <HomeHeaderSidebar />}
      <header></header>
    </>
  );
};

export default HomeHeader;
