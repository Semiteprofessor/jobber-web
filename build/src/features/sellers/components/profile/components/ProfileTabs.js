import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Dropdown from 'src/shared/dropdown/Dropdown';
const ProfileTabs = ({ type, setType }) => {
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "sm:hidden bg-white border-grey", children: _jsx(Dropdown, { text: type, maxHeight: "300", values: ['Overview', 'Active Gigs', 'Ratings & Reviews'], setValue: setType }) }), _jsxs("ul", { className: "hidden divide-x divide-gray-200 text-center text-sm font-medium text-gray-500 shadow dark:text-gray-400 sm:flex", children: [_jsx("li", { className: "w-full", children: _jsx("div", { onClick: () => {
                                if (setType) {
                                    setType('Overview');
                                }
                            }, className: `inline-block w-full p-4 text-gray-600 hover:text-gray-700 focus:outline-none
              ${type === 'Overview' ? 'bg-sky-200' : 'bg-white'}
            `, children: "Overview" }) }), _jsx("li", { className: "w-full", children: _jsx("div", { onClick: () => {
                                if (setType) {
                                    setType('Active Gigs');
                                }
                            }, className: `inline-block w-full p-4 text-gray-600 hover:text-gray-700 focus:outline-none
              ${type === 'Active Gigs' ? 'bg-sky-200' : 'bg-white'}
            `, children: "Active Gigs" }) }), _jsx("li", { className: "w-full", children: _jsx("div", { onClick: () => {
                                if (setType) {
                                    setType('Ratings & Reviews');
                                }
                            }, className: `inline-block w-full p-4 text-gray-600 hover:text-gray-700 focus:outline-none
              ${type === 'Ratings & Reviews' ? 'bg-sky-200' : 'bg-white'}
            `, children: "Ratings & Reviews" }) })] })] }));
};
export default ProfileTabs;
