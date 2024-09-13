import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useGetAuthGigsByCategoryQuery } from 'src/features/auth/services/auth.service';
import TopGigsView from 'src/shared/gigs/TopGigsView';
import { categories, lowerCase, replaceAmpersandAndDashWithSpace, replaceSpacesWithDash } from 'src/shared/utils/util.service';
import { v4 as uuidv4 } from 'uuid';
const GigTabs = () => {
    const [activeTab, setActiveTab] = useState('Graphics & Design');
    const queryType = `query=${replaceAmpersandAndDashWithSpace(`${lowerCase(activeTab)}`)}`;
    const { data, isSuccess } = useGetAuthGigsByCategoryQuery({
        query: `${queryType}`,
        from: '0',
        size: '10',
        type: 'forward'
    });
    let categoryGigs = [];
    if (isSuccess) {
        categoryGigs = data.gigs;
    }
    return (_jsx("div", { className: "relative m-auto mt-8 w-screen px-6 xl:container md:px-12 lg:px-6", children: _jsxs("div", { className: "mx-auto flex flex-col px-4 py-8 lg:px-6 lg:py-10", children: [_jsxs("div", { className: "flex flex-col text-left", children: [_jsx("h2", { className: "mb-3 text-3xl font-bold text-black", children: "A broad selection of services" }), _jsx("h4", { children: "Choose from a broad selection of services from expert freelancers for your next project." })] }), _jsx("div", { className: "mt-6", children: _jsx("ul", { className: "lg:flex lg:justify-between gap-5 overflow-x-auto scroll-smooth whitespace-nowrap relative inline-block", children: categories().map((category) => (_jsx("li", { onClick: () => setActiveTab(category), className: `cursor-pointer font-bold py-2 lg:py-0 ${activeTab === category ? 'text-black' : 'text-gray-400'}`, children: category }, uuidv4()))) }) }), _jsx("div", { className: "mt-4 h-full overflow-hidden border px-6 py-6", children: categoryGigs.length > 0 ? (_jsxs(_Fragment, { children: [_jsx("a", { className: "mt-10 w-[10%] rounded border border-black px-6 py-3 text-center text-sm font-bold text-black hover:bg-gray-100 focus:outline-none md:px-4 md:py-2 md:text-base", href: `/search/categories/${replaceSpacesWithDash(activeTab)}`, children: "Explore" }), _jsx(TopGigsView, { gigs: categoryGigs, width: "w-72", type: "index" })] })) : (_jsx("div", { className: "flex h-96 items-center justify-center text-lg", children: "Information not available at the moment." })) })] }) }));
};
export default GigTabs;
