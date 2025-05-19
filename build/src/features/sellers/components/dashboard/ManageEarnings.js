import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { filter, lowerCase, sumBy } from 'lodash';
import { useOutletContext } from 'react-router-dom';
import { shortenLargeNumbers } from 'src/shared/utils/util.service';
import ManageEarningsTable from './components/ManageEarningsTable';
const ManageEarnings = () => {
    const { orders, seller } = useOutletContext();
    const completedOrders = filter(orders, (order) => lowerCase(order.status) === lowerCase('Delivered'));
    const sum = sumBy(orders, 'price');
    const average = sum / orders.length;
    const averageSellingPrice = average ? parseInt(shortenLargeNumbers(average)) : 0;
    return (_jsx("div", { className: "container mx-auto mt-8", children: _jsxs("div", { className: "flex flex-col flex-wrap", children: [_jsxs("div", { className: "mb-4 grid grid-cols-1 sm:grid-cols-3", children: [_jsx("div", { className: "border border-grey flex items-center justify-center p-8 sm:col-span-1", children: _jsxs("div", { className: "flex flex-col gap-3", children: [_jsx("span", { className: "text-center text-base lg:text-xl", children: "Earnings to date" }), _jsxs("span", { className: "text-center font-bold text-base md:text-xl lg:text-2xl truncate", children: ["$", seller?.totalEarnings] })] }) }), _jsx("div", { className: "border border-grey flex items-center justify-center p-8 sm:col-span-1", children: _jsxs("div", { className: "flex flex-col gap-3", children: [_jsx("span", { className: "text-center text-base lg:text-xl", children: "Avg. selling price" }), _jsxs("span", { className: "text-center font-bold text-base md:text-xl lg:text-2xl truncate", children: ["$", averageSellingPrice] })] }) }), _jsx("div", { className: "border border-grey flex items-center justify-center p-8 sm:col-span-1", children: _jsxs("div", { className: "flex flex-col gap-3", children: [_jsx("span", { className: "text-center text-base lg:text-xl", children: "Orders completed" }), _jsx("span", { className: "text-center font-bold text-base md:text-xl lg:text-2xl truncate", children: seller?.completedJobs })] }) })] }), _jsx(ManageEarningsTable, { type: "active", orders: completedOrders, orderTypes: completedOrders.length })] }) }));
};
export default ManageEarnings;
