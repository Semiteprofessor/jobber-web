import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
const HeaderSearchInput = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const navigateToSearchPage = () => {
        const url = `/search/gigs?${createSearchParams({ query: searchTerm.trim() })}`;
        navigate(url);
    };
    return (_jsxs("div", { className: "mb-4 flex h-10 w-full self-center opacity-100 md:mb-0 md:mt-0 bg-red-700", children: [_jsx("form", { onSubmit: (e) => {
                    e.preventDefault();
                    navigateToSearchPage();
                }, className: "flex w-full self-center border opacity-100", children: _jsx(TextInput, { type: "text", name: "search", value: searchTerm, placeholder: "What service are you looking for today?", className: "w-full truncate px-4py-[7.5px]", onChange: (e) => {
                        setSearchTerm(e.target.value);
                    } }) }), _jsx(Button, { className: "flex w-16 items-center justify-center bg-gray-900 text-white", label: _jsx(FaSearch, { className: "h-6 w-6 fill-white text-white" }), onClick: navigateToSearchPage })] }));
};
export default HeaderSearchInput;
