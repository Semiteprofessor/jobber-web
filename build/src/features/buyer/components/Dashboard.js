import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrdersByBuyerIdQuery } from 'src/features/order/services/order.service';
import { orderTypes, shortenLargeNumbers } from 'src/shared/utils/util.service';
import { socket, socketService } from 'src/sockets/socket.service';
import BuyerTable from './BuyerTable';
const BUYER_GIG_STATUS = {
    ACTIVE: 'active',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    IN_PROGRESS: 'in progress',
    DELIVERED: 'delivered'
};
const BuyerDashboard = () => {
    const [type, setType] = useState(BUYER_GIG_STATUS.ACTIVE);
    const { buyerId } = useParams();
    const { data, isSuccess } = useGetOrdersByBuyerIdQuery(`${buyerId}`);
    let orders = [];
    if (isSuccess) {
        orders = data.orders;
    }
    useEffect(() => {
        socketService.setupSocketConnection();
        socket.emit('getLoggedInUsers', '');
    }, []);
    return (_jsx("div", { className: "container mx-auto mt-8 px-6 md:px-12 lg:px-6", children: _jsxs("div", { className: "flex flex-col flex-wrap", children: [_jsx("div", { className: "mb-8 px-4 text-xl font-semibold text-black md:px-0 md:text-2xl lg:text-4xl", children: "Manage Orders" }), _jsx("div", { className: "p-0", children: _jsxs("ul", { className: "flex w-full cursor-pointer list-none flex-col flex-wrap rounded-[2px] sm:flex-none sm:flex-row", children: [_jsx("li", { className: "inline-block py-3 uppercase", onClick: () => setType(BUYER_GIG_STATUS.ACTIVE), children: _jsxs("a", { href: "#activeorders", className: `px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base ${type === BUYER_GIG_STATUS.ACTIVE ? 'pb-[15px] outline outline-1 outline-[#e8e8e8] sm:rounded-t-lg' : ''}`, children: ["Active", orderTypes(BUYER_GIG_STATUS.IN_PROGRESS, orders) > 0 && (_jsx("span", { className: "ml-1 rounded-[5px] bg-sky-500 px-[5px] py-[1px] text-xs font-medium text-white", children: shortenLargeNumbers(orderTypes(BUYER_GIG_STATUS.IN_PROGRESS, orders)) }))] }) }), _jsx("li", { className: "inline-block py-3 uppercase", onClick: () => setType(BUYER_GIG_STATUS.COMPLETED), children: _jsxs("a", { href: "#activeorders", className: `px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base ${type === BUYER_GIG_STATUS.COMPLETED ? 'pb-[15px] outline outline-1 outline-[#e8e8e8] sm:rounded-t-lg' : ''}`, children: ["Completed", orderTypes(BUYER_GIG_STATUS.COMPLETED, orders) > 0 && (_jsx("span", { className: "ml-1 rounded-[5px] bg-sky-500 px-[5px] py-[1px] text-xs font-medium text-white", children: shortenLargeNumbers(orderTypes(BUYER_GIG_STATUS.COMPLETED, orders)) }))] }) }), _jsx("li", { className: "inline-block py-3 uppercase", onClick: () => setType(BUYER_GIG_STATUS.CANCELLED), children: _jsxs("a", { href: "#activeorders", className: `px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base ${type === BUYER_GIG_STATUS.CANCELLED ? 'pb-[15px] outline outline-1 outline-[#e8e8e8] sm:rounded-t-lg' : ''}`, children: ["Cancelled", orderTypes(BUYER_GIG_STATUS.CANCELLED, orders) > 0 && (_jsx("span", { className: "ml-1 rounded-[5px] bg-sky-500 px-[5px] py-[1px] text-xs font-medium text-white", children: shortenLargeNumbers(orderTypes(BUYER_GIG_STATUS.CANCELLED, orders)) }))] }) })] }) }), type === BUYER_GIG_STATUS.ACTIVE && (_jsx(BuyerTable, { type: "active", orders: orders, orderTypes: orderTypes(BUYER_GIG_STATUS.IN_PROGRESS, orders) })), type === BUYER_GIG_STATUS.COMPLETED && (_jsx(BuyerTable, { type: "completed", orders: orders, orderTypes: orderTypes(BUYER_GIG_STATUS.COMPLETED, orders) })), type === BUYER_GIG_STATUS.CANCELLED && (_jsx(BuyerTable, { type: "cancelled", orders: orders, orderTypes: orderTypes(BUYER_GIG_STATUS.CANCELLED, orders) }))] }) }));
};
export default BuyerDashboard;
