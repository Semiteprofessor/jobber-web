import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
import { saveToLocalStorage } from 'src/shared/utils/util.service';
const BudgetDropdown = () => {
    const [searchParams, setSearchParams] = useSearchParams({});
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState({ minPrice: '', maxPrice: '' });
    return (_jsxs("div", { className: "flex flex-col", children: [' ', _jsxs("div", { className: "relative", children: [_jsx(Button, { className: "flex justify-between gap-5 rounded-lg border border-gray-400 px-5 py-3 font-medium", label: _jsxs(_Fragment, { children: [_jsx("span", { children: "Budget" }), !toggleDropdown ? (_jsx(FaChevronDown, { className: "float-right mt-\u00A7 h-4 fill-current text-slate-900" })) : (_jsx(FaChevronUp, { className: "float-right mt-\u00A7 h-4 fill-current text-slate-900" }))] }), onClick: () => setToggleDropdown((item) => !item) }), toggleDropdown && (_jsxs("div", { className: "absolute mt-2 w-96 divide-y divide-gray-100 rounded-lg border border-slate-100 bg-white drop-shadow-md sm:w-72", children: [_jsx("ul", { className: "space-y-1 p-3 text-sm text-gray-700 dark:text-gray-200", children: _jsx("li", { children: _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "min", className: "mb-2 block text-sm font-normal text-slate-900", children: "MIN." }), _jsx(TextInput, { type: "number", id: "min", min: "0", name: "minPrice", value: selectedBudget.minPrice ?? '', className: "block w-full border border-gray-300 p-2.5 text-sm text-gray-900 dark:placeholder-gray-400 dark:focus:border-black dark:focus:ring-black", placeholder: "Any", onChange: (event) => {
                                                            setSelectedBudget({ ...selectedBudget, minPrice: `${event.target.value}` });
                                                        }, onKeyDown: (event) => {
                                                            if (event.key !== 'Backspace' && isNaN(parseInt(event.key))) {
                                                                event.preventDefault();
                                                            }
                                                        } })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "max", className: "mb-2 block text-sm font-normal text-slate-900", children: "MAX." }), _jsx(TextInput, { type: "number", id: "max", name: "maxPrice", value: selectedBudget.maxPrice ?? '', className: "block w-full border border-gray-300 p-2.5 text-sm text-gray-900 dark:placeholder-gray-400 dark:focus:border-black dark:focus:ring-black", placeholder: "Any", onChange: (event) => {
                                                            setSelectedBudget({ ...selectedBudget, maxPrice: `${event.target.value}` });
                                                        }, onKeyDown: (event) => {
                                                            if (event.key !== 'Backspace' && isNaN(parseInt(event.key))) {
                                                                event.preventDefault();
                                                            }
                                                        } })] })] }) }) }), _jsxs("div", { className: "my-4 flex cursor-pointer justify-evenly pt-3", children: [_jsx("div", { className: "px-4 py-2 text-sm font-medium text-slate-900", onClick: () => {
                                            setSelectedBudget({ minPrice: '', maxPrice: '' });
                                            setToggleDropdown(false);
                                        }, children: "Clear All" }), _jsx("div", { className: "rounded bg-sky-500 px-4 py-2 text-sm font-bold text-white hover:bg-sky-400", onClick: () => {
                                            const updatedSearchParams = new URLSearchParams(searchParams.toString());
                                            updatedSearchParams.set('minPrice', selectedBudget.minPrice);
                                            updatedSearchParams.set('maxPrice', selectedBudget.maxPrice);
                                            setSearchParams(updatedSearchParams);
                                            setToggleDropdown(false);
                                            saveToLocalStorage('filterApplied', JSON.stringify(true));
                                        }, children: "Apply" })] })] }))] }), _jsx("div", { className: "mt-2 flex h-10 gap-4 text-xs text-slate-950", children: selectedBudget?.minPrice && selectedBudget?.maxPrice && (_jsx(Button, { className: "flex gap-4 self-center rounded-full bg-gray-200 px-5 py-1 font-bold hover:text-gray-500", label: _jsxs(_Fragment, { children: ["$", selectedBudget.minPrice, " - $", selectedBudget.maxPrice, _jsx(FaTimes, { className: "self-center font-normal" })] }), onClick: () => {
                        const updatedSearchParams = new URLSearchParams(searchParams.toString());
                        updatedSearchParams.delete('minPrice');
                        updatedSearchParams.delete('maxPrice');
                        setSearchParams(updatedSearchParams);
                        setToggleDropdown(false);
                        setSelectedBudget({ minPrice: '', maxPrice: '' });
                    } })) })] }));
};
export default BudgetDropdown;
