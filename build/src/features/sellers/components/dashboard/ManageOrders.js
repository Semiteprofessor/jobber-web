import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { findIndex } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { orderTypes, sellerOrderList, shortenLargeNumbers } from 'src/shared/utils/util.service';
import { socket } from 'src/sockets/socket.service';
import ManageOrdersTable from './components/ManageOrdersTable';
const SELLER_GIG_STATUS = {
    ACTIVE: 'active',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    IN_PROGRESS: 'in progress',
    DELIVERED: 'delivered'
};
const ManageOrders = () => {
    const [type, setType] = useState(SELLER_GIG_STATUS.ACTIVE);
    const { orders } = useOutletContext();
    const ordersRef = useMemo(() => [...orders], [orders]);
    useEffect(() => {
        socket.on('order notification', (order) => {
            const index = findIndex(ordersRef, ['orderId', order.orderId]);
            if (index > -1) {
                ordersRef.splice(index, 1, order);
            }
        });
    }, [ordersRef]);
    return (_jsx("div", { className: "container mx-auto mt-8 px-6 md:px-12 lg:px-6", children: _jsxs("div", { className: "flex flex-col flex-wrap", children: [_jsx("div", { className: "mb-8 px-4 text-xl font-semibold text-black md:px-0 md:text-2xl lg:text-4xl", children: "Manage Orders" }), _jsx("div", { className: "p-0", children: _jsxs("ul", { className: "flex w-full cursor-pointer list-none flex-col flex-wrap rounded-[2px] sm:flex-none sm:flex-row", children: [_jsx("li", { className: "inline-block py-3 uppercase", onClick: () => setType(SELLER_GIG_STATUS.ACTIVE), children: _jsxs("a", { href: "#activeorders", className: `px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base ${type === SELLER_GIG_STATUS.ACTIVE ? 'pb-[15px] outline outline-1 outline-[#e8e8e8] sm:rounded-t-lg' : ''}`, children: ["Active", orderTypes(SELLER_GIG_STATUS.IN_PROGRESS, ordersRef) > 0 && (_jsx("span", { className: "ml-1 rounded-[5px] bg-sky-500 px-[5px] py-[1px] text-xs font-medium text-white", children: shortenLargeNumbers(orderTypes(SELLER_GIG_STATUS.IN_PROGRESS, ordersRef)) }))] }) }), _jsx("li", { className: "inline-block py-3 uppercase", onClick: () => setType(SELLER_GIG_STATUS.COMPLETED), children: _jsxs("a", { href: "#activeorders", className: `px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base ${type === SELLER_GIG_STATUS.COMPLETED ? 'pb-[15px] outline outline-1 outline-[#e8e8e8] sm:rounded-t-lg' : ''}`, children: ["Completed", orderTypes(SELLER_GIG_STATUS.COMPLETED, ordersRef) > 0 && (_jsx("span", { className: "ml-1 rounded-[5px] bg-sky-500 px-[5px] py-[1px] text-xs font-medium text-white", children: shortenLargeNumbers(orderTypes(SELLER_GIG_STATUS.COMPLETED, ordersRef)) }))] }) }), _jsx("li", { className: "inline-block py-3 uppercase", onClick: () => setType(SELLER_GIG_STATUS.CANCELLED), children: _jsxs("a", { href: "#activeorders", className: `px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base ${type === SELLER_GIG_STATUS.CANCELLED ? 'pb-[15px] outline outline-1 outline-[#e8e8e8] sm:rounded-t-lg' : ''}`, children: ["Cancelled", orderTypes(SELLER_GIG_STATUS.CANCELLED, ordersRef) > 0 && (_jsx("span", { className: "ml-1 rounded-[5px] bg-sky-500 px-[5px] py-[1px] text-xs font-medium text-white", children: shortenLargeNumbers(orderTypes(SELLER_GIG_STATUS.CANCELLED, ordersRef)) }))] }) })] }) }), type === SELLER_GIG_STATUS.ACTIVE && (_jsx(ManageOrdersTable, { type: "active", orders: sellerOrderList(SELLER_GIG_STATUS.IN_PROGRESS, ordersRef), orderTypes: orderTypes(SELLER_GIG_STATUS.IN_PROGRESS, ordersRef) })), type === SELLER_GIG_STATUS.COMPLETED && (_jsx(ManageOrdersTable, { type: "completed", orders: sellerOrderList(SELLER_GIG_STATUS.COMPLETED, ordersRef), orderTypes: orderTypes(SELLER_GIG_STATUS.COMPLETED, ordersRef) })), type === SELLER_GIG_STATUS.CANCELLED && (_jsx(ManageOrdersTable, { type: "cancelled", orders: sellerOrderList(SELLER_GIG_STATUS.CANCELLED, ordersRef), orderTypes: orderTypes(SELLER_GIG_STATUS.CANCELLED, ordersRef) }))] }) }));
};
export default ManageOrders;
