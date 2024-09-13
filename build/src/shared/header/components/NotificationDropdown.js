import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/store/store';
import { useNavigate } from 'react-router-dom';
import { useGetNotificationsByIdQuery, useMarkUnreadNotificationMutation } from 'src/features/order/services/notification.service';
import { showErrorToast } from 'src/shared/utils/util.service';
import { orderBy } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { TimeAgo } from 'src/shared/utils/timeago.util';
import { FaRegEnvelope, FaRegEnvelopeOpen } from 'react-icons/fa';
const NotificationDropdown = ({ setIsNotificationDropdownOpen }) => {
    const authUser = useAppSelector((state) => state.authUser);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    const { data, isSuccess } = useGetNotificationsByIdQuery(`${authUser.username}`, { refetchOnMountOrArgChange: true });
    const [markUnReadNotification] = useMarkUnreadNotificationMutation();
    const markNotificationAsRead = async (notificationId) => {
        try {
            await markUnReadNotification(notificationId).unwrap();
        }
        catch (error) {
            showErrorToast('Error');
        }
    };
    useEffect(() => {
        if (isSuccess) {
            const sortedNotifications = orderBy(data.notifications, ['createdAt'], ['desc']);
            setNotifications(sortedNotifications);
        }
    }, [isSuccess, data?.notifications]);
    return (_jsxs("div", { className: "border-grey z-20 max-h-[470px] flex flex-col justify-between rounded shadow-md border border-grey bg-white", children: [_jsx("div", { className: "block px-4 py-2 font-medium text-center text-gray-700 border-b border-grey", children: "Notifications" }), _jsxs("div", { className: "h-96 overflow-y-scroll", children: [notifications.length > 0 &&
                        notifications.map((data) => (_jsx("div", { className: "border-grey max-h-[90px] border-b py-2 text-left hover:bg-gray-50", onClick: () => {
                                if (setIsNotificationDropdownOpen) {
                                    setIsNotificationDropdownOpen(false);
                                }
                                navigate(`/orders/${data.orderId}/activities`);
                                markNotificationAsRead(`${data._id}`);
                            }, children: _jsxs("div", { className: "flex px-4", children: [_jsx("div", { className: "flex-shrink-0 mt-1", children: _jsx("img", { className: "rounded-full w-11 h-11 object-cover", src: data.senderUsername === authUser?.username ? data.receiverPicture : data.senderPicture, alt: "" }) }), _jsxs("div", { className: "w-full pl-3 pt-2", children: [_jsxs("div", { className: "text-[13px] font-normal leading-4 flex justify-between", children: [_jsxs("div", { className: "font-normal w-[85%]", children: [_jsx("span", { className: "font-bold pr-1", children: data.senderUsername === authUser?.username ? data.receiverUsername : data.senderUsername }), data.message] }), !data.isRead ? _jsx(FaRegEnvelope, { className: "text-sky-400 mt-1" }) : _jsx(FaRegEnvelopeOpen, { className: "text-gray-200 mt-1" })] }), _jsx("div", { className: "flex gap-2 text-[11px]", children: _jsx("span", { className: "font-normal text-[#b5b6ba]", children: TimeAgo.transform(data?.createdAt) }) })] })] }) }, uuidv4()))), notifications.length === 0 && _jsx("div", { className: "flex h-full items-center justify-center", children: "No notifications to show" })] })] }));
};
export default NotificationDropdown;
