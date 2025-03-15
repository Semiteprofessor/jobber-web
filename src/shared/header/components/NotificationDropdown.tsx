import React, { FC, ReactElement, useEffect, useState } from 'react';
import { IHomeHeaderProps } from '../interfaces/header.interface';
import { useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useGetNotificationsByIdQuery, useMarkUnreadNotificationMutation } from 'src/features/order/services/notification.service';
import { showErrorToast } from 'src/shared/utils/util.service';
import { IOrderNotifcation } from 'src/features/order/interfaces/order.interface';
import { orderBy } from 'lodash';

const NotificationDropdown: FC<IHomeHeaderProps> = ({ setIsNotificationDropdownOpen }): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const [notifications, setNotifications] = useState<IOrderNotifcation[]>([]);
  const navigate: NavigateFunction = useNavigate();
  const { data, isSuccess } = useGetNotificationsByIdQuery(`${authUser.username}`, { refetchOnMountOrArgChange: true });
  const [markUnReadNotification] = useMarkUnreadNotificationMutation();

  const markNotificationAsRead = async (notificationId: string): Promise<void> => {
    try {
      await markUnReadNotification(notificationId).unwrap();
    } catch (error) {
      showErrorToast('Error');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const sortedNotifications: IOrderNotifcation[] = orderBy(data.notifications, ['createdAt'], ['desc']) as IOrderNotifcation[];
      setNotifications(sortedNotifications);
    }
  }, [isSuccess, data?.notifications]);
  return <div>NotificationDropdown</div>;
};

export default NotificationDropdown;
