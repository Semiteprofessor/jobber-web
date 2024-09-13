import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { lazy, Suspense, useEffect } from 'react';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import Hero from './Hero';
import GigTabs from 'src/features/index/gig-tabs/GigTabs';
import HowItWorks from './HowItWorks';
import Categories from './Categories';
import { saveToSessionStorage } from 'src/shared/utils/util.service';
const IndexHeader = lazy(() => import('src/shared/header/components/Header'));
const Index = () => {
    useEffect(() => {
        saveToSessionStorage(JSON.stringify(false), JSON.stringify(''));
    }, []);
    return (_jsx("div", { className: "flex flex-col", children: _jsxs(Suspense, { fallback: _jsx(CircularPageLoader, {}), children: [_jsx(IndexHeader, { navClass: "navbar peer-checked:navbar-active fixed z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none" }), _jsx(Hero, {}), _jsx(GigTabs, {}), _jsx(HowItWorks, {}), _jsx("hr", {}), _jsx(Categories, {})] }) }));
};
export default Index;
