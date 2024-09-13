import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { find, lowerCase } from 'lodash';
import { useRef, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useGetAuthGigsByCategoryQuery } from 'src/features/auth/services/auth.service';
import GigPaginate from 'src/shared/gigs/GigPaginate';
import Header from 'src/shared/header/components/Header';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import PageMessage from 'src/shared/page-message/PageMessage';
import { categories, replaceAmpersandAndDashWithSpace, replaceDashWithSpaces, replaceSpacesWithDash } from 'src/shared/utils/util.service';
import { v4 as uuidv4 } from 'uuid';
import GigIndexItem from './GigIndexItem';
const ITEMS_PER_PAGE = 12;
const GigsIndexDisplay = ({ type }) => {
    const [itemFrom, setItemFrom] = useState('0');
    const [paginationType, setPaginationType] = useState('forward');
    const gigsCurrent = useRef([]);
    const { category } = useParams();
    const [searchParams] = useSearchParams({});
    const location = useLocation();
    let gigs = [];
    let totalGigs = 0;
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    const queryType = type === 'search'
        ? replaceDashWithSpaces(`${updatedSearchParams}`)
        : `query=${replaceAmpersandAndDashWithSpace(`${lowerCase(`${category}`)}`)}&${updatedSearchParams.toString()}`;
    const { data, isSuccess, isLoading, isError } = useGetAuthGigsByCategoryQuery({
        query: `${queryType}`,
        from: itemFrom,
        size: `${ITEMS_PER_PAGE}`,
        type: paginationType
    });
    if (isSuccess) {
        gigs = data?.gigs;
        gigsCurrent.current = data?.gigs;
        totalGigs = data.total ?? 0;
    }
    const categoryName = find(categories(), (item) => location.pathname.includes(replaceSpacesWithDash(`${lowerCase(`${item}`)}`)));
    const gigCategories = categoryName ?? searchParams.get('query');
    return (_jsxs("div", { className: "flex w-screen flex-col", children: [_jsx(Header, { navClass: "navbar peer-checked:navbar-active z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none" }), _jsxs("div", { children: [isLoading && !isSuccess ? (_jsx(CircularPageLoader, {})) : (_jsx(_Fragment, { children: !isLoading && gigs.length > 0 ? (_jsxs(_Fragment, { children: [_jsxs("h3", { className: "mb-5 flex gap-3 text-4xl", children: [type === 'search' && _jsx("span", { className: "text-black", children: "Results for" }), _jsx("strong", { className: "text-black", children: gigCategories })] }), _jsx("div", { className: "my-5", children: _jsx("div", { className: "grid gap-x-6 pt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: gigs.map((gig) => (_jsx(GigIndexItem, { gig: gig }, uuidv4()))) }) })] })) : (_jsx(PageMessage, { header: "No services found for your search", body: "Try a new search or get a free quote for your project from our community of freelancers." })) })), ' ', isError && _jsx(PageMessage, { header: "Services issue", body: "A network issue occurred. Try again later." }), gigs.length > 0 && (_jsx(GigPaginate, { gigs: gigsCurrent.current, totalGigs: totalGigs, showNumbers: false, itemsPerPage: ITEMS_PER_PAGE, setItemFrom: setItemFrom, setPaginationType: setPaginationType }))] })] }));
};
export default GigsIndexDisplay;
