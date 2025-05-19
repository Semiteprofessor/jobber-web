import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCancelOrderMutation } from 'src/features/order/services/order.service';
import Button from 'src/shared/button/Button';
import { updateHeader } from 'src/shared/header/reducers/header.reducer';
import ApprovalModal from 'src/shared/modals/ApprovalModal';
import { TimeAgo } from 'src/shared/utils/timeago.util';
import { lowerCase, showErrorToast, showSuccessToast } from 'src/shared/utils/util.service';
import { useAppDispatch } from 'src/store/store';
import { v4 as uuidv4 } from 'uuid';
const ManageOrdersTable = ({ type, orders, orderTypes }) => {
    const dispatch = useAppDispatch();
    const [approvalModalContent, setApprovalModalContent] = useState();
    const [showCancelModal, setShowCancelModal] = useState(false);
    const selectedOrder = useRef();
    const [cancelOrder] = useCancelOrderMutation();
    const onCancelOrder = async () => {
        try {
            const orderData = {
                sellerId: `${selectedOrder.current?.sellerId}`,
                buyerId: `${selectedOrder.current?.buyerId}`,
                purchasedGigs: selectedOrder.current?.gigId
            };
            setShowCancelModal(false);
            await cancelOrder({
                paymentIntentId: `${selectedOrder.current?.paymentIntent}`,
                orderId: `${selectedOrder.current?.orderId}`,
                body: orderData
            });
            showSuccessToast('Order cancelled successfully.');
        }
        catch (error) {
            showErrorToast('Error cancelling order. Try again.');
        }
    };
    return (_jsxs(_Fragment, { children: [showCancelModal && (_jsx(ApprovalModal, { approvalModalContent: approvalModalContent, onClose: () => setShowCancelModal(false), onClick: onCancelOrder })), _jsxs("div", { className: "flex flex-col", children: [_jsx("div", { className: "border-grey border border-b-0 px-3 py-3", children: _jsxs("div", { className: "text-xs font-bold uppercase sm:text-sm md:text-base", children: [type, " orders "] }) }), _jsx("table", { className: "border-grey flex-no-wrap flex w-full table-auto flex-row overflow-hidden border text-sm text-gray-500 sm:inline-table", children: orderTypes > 0 ? (_jsxs(_Fragment, { children: [_jsx("thead", { className: "border-grey border-b text-xs uppercase text-gray-700 sm:[&>*:not(:first-child)]:hidden", children: orders.map(() => (_jsxs("tr", { className: "mb-1 flex flex-col flex-nowrap bg-sky-500 text-white sm:mb-0 sm:table-row md:table-row lg:bg-transparent lg:text-black", children: [_jsx("th", { className: "p-3 text-center w-auto" }), _jsx("th", { className: "p-3 text-left w-auto", children: "Buyer" }), _jsx("th", { className: "p-3 text-left", children: "Gig" }), _jsx("th", { className: "p-3 text-center", children: type === 'cancelled' ? 'Cancelled On' : 'Due On' }), type === 'completed' && _jsx("th", { className: "p-3 text-center", children: "Delivered At" }), _jsx("th", { className: "p-3 text-center", children: "Total" }), _jsx("th", { className: "p-3 text-center", children: "Status" }), type === 'active' && _jsx("th", { className: "p-3 text-center", children: "Cancel" })] }, uuidv4()))) }), _jsx("tbody", { className: "flex-1 sm:flex-none", children: orders.map((order) => (_jsxs("tr", { className: "bg-white border-b border-grey flex flex-col flex-nowrap sm:table-row mb-2 sm:mb-0 ", children: [_jsx("td", {}), _jsx("td", { className: "flex justify-start gap-3 px-3 py-3 sm:justify-center md:justify-start", children: _jsxs("div", { className: "flex flex-wrap gap-2 self-center", children: [_jsx("img", { className: "h-6 w-6 lg:h-8 lg:w-8 rounded-full object-cover", src: order.buyerImage, alt: "" }), _jsx("span", { className: "font-bold flex self-center", children: order.buyerUsername })] }) }), _jsx("td", { className: "p-3 text-left lg:text-center w-[300px]", children: _jsx("div", { className: "grid", children: _jsx(Link, { to: `/orders/${order.orderId}/activities`, onClick: () => dispatch(updateHeader('home')), className: "truncate text-sm font-normal hover:text-sky-500", children: order.offer.gigTitle }) }) }), _jsx("td", { className: "p-3 text-left lg:text-center", children: type === 'cancelled'
                                                    ? TimeAgo.dayMonthYear(`${order.approvedAt}`)
                                                    : TimeAgo.dayMonthYear(`${order.offer.newDeliveryDate}`) }), type === 'completed' && order.events.orderDelivered && (_jsx("td", { className: "p-3 text-left lg:text-center", children: TimeAgo.dayMonthYear(`${order.events.orderDelivered}`) })), _jsxs("td", { className: "p-3 text-left lg:text-center", children: ["$", order.price] }), _jsx("td", { className: "px-3 py-1 lg:p-3 text-left lg:text-center", children: _jsx("span", { className: `rounded bg-transparent text-black p-0 text-xs font-bold uppercase sm:text-white sm:px-[5px] sm:py-[4px] status ${lowerCase(order.status.replace(/ /g, ''))}`, children: order.status }) }), type === 'active' && (_jsx("td", { className: "px-3 py-1 lg:p-3 text-left lg:text-center", children: _jsx(Button, { className: "rounded bg-red-500 px-6 py-3 text-center text-sm font-bold text-white focus:outline-none md:px-4 md:py-2 md:text-base", label: "Cancel Order", onClick: () => {
                                                        setApprovalModalContent({
                                                            header: 'Order Cancellation',
                                                            body: 'Are you sure you want to cancel this order?',
                                                            btnText: 'Yes, Cancel',
                                                            btnColor: 'bg-red-500 hover:bg-red-400'
                                                        });
                                                        setShowCancelModal(true);
                                                        selectedOrder.current = order;
                                                    } }) }))] }, uuidv4()))) })] })) : (_jsx("tbody", { children: _jsx("tr", { children: _jsxs("td", { className: "w-full px-4 py-2 text-sm", children: ["No ", type, " orders to show."] }) }) })) })] })] }));
};
export default ManageOrdersTable;
