import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { filter } from 'lodash';
import { useRef, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import Button from '../button/Button';
import useDetectOutsideClick from '../hooks/useDetectOutsideClick';
import TextInput from '../inputs/TextInput';
const Dropdown = ({ text, maxHeight, mainClassNames, showSearchInput, dropdownClassNames, values, style, setValue, onClick }) => {
    const [dropdownItems, setDropdownItems] = useState(values);
    const [inputText, setInputText] = useState(text);
    const dropdownRef = useRef(null);
    const [toggleDropdown, setToggleDropdown] = useDetectOutsideClick(dropdownRef, false);
    const onHandleSelect = (event) => {
        const selectedItem = event.target.textContent;
        if (setValue) {
            setValue(selectedItem);
        }
        setInputText(selectedItem);
        setDropdownItems(values);
        setToggleDropdown(false);
        if (onClick) {
            onClick(selectedItem);
        }
    };
    return (_jsxs("div", { className: `w-full divide-y divide-gray-100 rounded border ${mainClassNames}`, style: style, children: [(!showSearchInput || showSearchInput) && !toggleDropdown && (_jsx(Button, { className: "bg-teal flex w-full justify-between rounded px-3 py-2 text-white", label: _jsxs(_Fragment, { children: [_jsx("span", { className: "truncate text-slate-900", children: text }), !toggleDropdown ? (_jsx(FaChevronDown, { className: "float-right mt-1 h-4 fill-current text-slate-900" })) : (_jsx(FaChevronUp, { className: "float-right mt-1 h-4 fill-current text-slate-900" }))] }), onClick: () => setToggleDropdown(!toggleDropdown) })), showSearchInput && toggleDropdown && (_jsxs("div", { className: "flex", children: [_jsx(TextInput, { type: "text", name: "search", value: inputText, className: "h-10 w-full items-center rounded pl-3 text-sm font-normal text-gray-600 focus:outline-none lg:text-base", placeholder: "Search...", onChange: (event) => {
                            const inputValue = event.target.value;
                            setInputText(inputValue);
                            const filtered = filter(dropdownItems, (item) => item.toLowerCase().includes(inputValue.toLowerCase()));
                            setDropdownItems(filtered);
                            if (!inputValue) {
                                setDropdownItems(values);
                            }
                        } }), _jsx("div", { className: "flex self-center", onClick: () => setToggleDropdown(!toggleDropdown), children: _jsx(FaTimes, { className: "mx-3 h-4 fill-current text-slate-900" }) })] })), toggleDropdown && (_jsx("ul", { className: `z-40 cursor-pointer overflow-y-scroll py-2 text-sm text-gray-700 dark:text-gray-200
              ${dropdownClassNames}`, style: { maxHeight: `${maxHeight}px` }, children: dropdownItems.map((value) => (_jsx("li", { onClick: onHandleSelect, children: _jsx("div", { className: "block px-4 py-2 text-slate-900 dark:hover:bg-gray-200", children: value }) }, uuidv4()))) }))] }));
};
export default Dropdown;
