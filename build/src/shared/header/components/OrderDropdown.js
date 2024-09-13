import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGetOrdersByBuyerIdQuery } from 'src/features/order/services/order.service';
import { lowerCase } from 'src/shared/utils/util.service';
import { v4 as uuidv4 } from 'uuid';
const OrderDropdown = ({ buyer, setIsDropdownOpen }) => {
    const { data, isSuccess } = useGetOrdersByBuyerIdQuery(`${buyer?._id}`);
    let orders = [];
    if (isSuccess) {
        orders = data.orders;
    }
    return (_jsxs("div", { className: "border-grey z-20 flex max-h-[470px] flex-col justify-between rounded border bg-white shadow-md", children: [_jsxs("div", { className: "h-96 overflow-y-scroll", children: [orders.length > 0 &&
                        orders.map((order) => (_jsx("div", { className: "border-grey h-[76px] border-b pt-2 text-left hover:bg-gray-50", children: _jsxs(Link, { to: `/orders/${order.orderId}/activities`, className: "flex px-4", onClick: () => {
                                    if (setIsDropdownOpen) {
                                        setIsDropdownOpen(false);
                                    }
                                }, children: [_jsx("div", { className: "mt-1 flex-shrink-0", children: _jsx("img", { className: "h-14 w-20 object-cover", src: order.gigCoverImage, alt: "" }) }), _jsxs("div", { className: "w-full pl-3", children: [_jsx("div", { className: "text-[13px] font-normal leading-normal", children: order.gigBasicTitle }), _jsxs("div", { className: "flex gap-2 text-[11px]", children: [_jsxs("span", { className: "font-normal text-[#b5b6ba]", children: ["by ", order.sellerUsername] }), _jsx("span", { className: "font-normal", children: "\u2022" }), _jsx("span", { className: `rounded text-white px-2 ${lowerCase(order.status.replace(/ /g, ''))}`, children: order.status })] })] })] }) }, uuidv4()))), orders.length === 0 && _jsx("div", { className: "flex h-full items-center justify-center", children: "No orders to show" })] }), orders.length > 0 && (_jsxs(Link, { to: `/users/${lowerCase(`${buyer?.username}`)}/${buyer?._id}/orders`, className: "flex h-10 cursor-pointer justify-center bg-white px-4 text-sm font-medium text-sky-500", onClick: () => {
                    if (setIsDropdownOpen) {
                        setIsDropdownOpen(false);
                    }
                }, children: [_jsx(FaEye, { className: "mr-2 h-4 w-4 self-center" }), _jsx("span", { className: "self-center", children: "View all" })] }))] }));
};
export default OrderDropdown;
