import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Typed from 'typed.js';
const categories = ['Graphics & Design', 'Digital Marketing', 'Writing & Translation', 'Programming & Tech'];
const Hero = () => {
    const typedElement = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const navigateToSearchPage = () => {
        const url = `/gigs/search?${createSearchParams({ query: searchTerm.trim() })}`;
        navigate(url);
    };
    useEffect(() => {
        const typed = new Typed(typedElement.current, {
            strings: [...categories, 'Video & Animation'],
            startDelay: 300,
            typeSpeed: 120,
            backSpeed: 200,
            backDelay: 300
        });
        return () => {
            typed.destroy();
        };
    }, []);
    return (_jsx("div", { className: "relative bg-white pb-20 pt-40 dark:bg-gray-900 lg:pt-44", children: _jsxs("div", { className: "relative m-auto px-6 xl:container md:px-12 lg:px-6", children: [_jsxs("h3", { className: "mb-4 mt-4 max-w-2xl pb-2 text-center text-2xl font-normal dark:text-white lg:text-left", children: ["Expert categories: ", _jsx("span", { ref: typedElement })] }), _jsxs("h1", { className: "text-center text-4xl font-black text-blue-900 dark:text-white sm:mx-auto sm:w-10/12 sm:text-5xl md:w-10/12 md:text-5xl lg:w-auto lg:text-left xl:text-7xl", children: ["Hire expert freelancers ", _jsx("br", { className: "hidden lg:block" }), ' ', _jsx("span", { className: "relative bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300", children: "for your project" }), "."] })] }) }));
};
export default Hero;
