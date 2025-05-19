import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { find } from 'lodash';
import { useRef, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import GigCardDisplayItem from 'src/shared/gigs/GigCardDisplayItem';
import GigPaginate from 'src/shared/gigs/GigPaginate';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import PageMessage from 'src/shared/page-message/PageMessage';
import { categories, getDataFromLocalStorage, lowerCase, replaceAmpersandAndDashWithSpace, replaceDashWithSpaces, replaceSpacesWithDash, saveToLocalStorage } from 'src/shared/utils/util.service';
import { v4 as uuidv4 } from 'uuid';
import { useSearchGigsQuery } from '../../services/search.service';
import BudgetDropdown from './components/BudgetDropdown';
import DeliveryTimeDropdown from './components/DeliveryTimeDropdown';
const ITEMS_PER_PAGE = 10;
const Gigs = ({ type }) => {
    const [itemFrom, setItemFrom] = useState('0');
    const [paginationType, setPaginationType] = useState('forward');
    const [searchParams] = useSearchParams();
    const { category } = useParams();
    const location = useLocation();
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    const queryType = type === 'search'
        ? replaceDashWithSpaces(`${updatedSearchParams}`)
        : `query=${replaceAmpersandAndDashWithSpace(`${lowerCase(`${category}`)}`)}&${updatedSearchParams.toString()}`;
    const { data, isSuccess, isLoading, isError } = useSearchGigsQuery({
        query: `${queryType}`,
        from: itemFrom,
        size: `${ITEMS_PER_PAGE}`,
        type: paginationType
    });
    const gigs = useRef([]);
    let totalGigs = 0;
    const filterApplied = getDataFromLocalStorage('filterApplied');
    const categoryName = find(categories(), (item) => location.pathname.includes(replaceSpacesWithDash(`${lowerCase(`${item}`)}`)));
    const gigCategories = categoryName ?? searchParams.get('query');
    if (isSuccess) {
        gigs.current = data.gigs;
        totalGigs = data.total ?? 0;
        saveToLocalStorage('filterApplied', JSON.stringify(false));
    }
    return (_jsx(_Fragment, { children: isLoading && !isSuccess ? (_jsx(CircularPageLoader, {})) : (_jsxs("div", { className: "container mx-auto items-center p-5", children: [!isLoading && data && data.gigs && data?.gigs.length > 0 ? (_jsxs(_Fragment, { children: [_jsxs("h3", { className: "mb-5 flex gap-3 text-4xl", children: [type === 'search' && _jsx("span", { className: "text-black", children: "Results for" }), _jsx("strong", { className: "text-black", children: gigCategories })] }), _jsxs("div", { className: "mb-4 flex gap-4", children: [_jsx(BudgetDropdown, {}), _jsx(DeliveryTimeDropdown, {})] }), _jsxs("div", { className: "my-5", children: [_jsx("div", { className: "", children: _jsxs("span", { className: "font-medium text-[#74767e]", children: [data.total, " services available"] }) }), filterApplied ? (_jsx(CircularPageLoader, {})) : (_jsx("div", { className: "grid gap-x-6 pt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: data &&
                                        data.gigs &&
                                        data?.gigs.map((gig) => (_jsx(GigCardDisplayItem, { gig: gig, linkTarget: true, showEditIcon: false }, uuidv4()))) }))] })] })) : (_jsx(PageMessage, { header: "No services found for your search", body: "Try a new search or get a free quote for your project from our commnunity of freelancers." })), isError && _jsx(PageMessage, { header: "Services issue", body: "A network issue occured. Try agin later." }), isSuccess && !filterApplied && data && data.gigs && data.gigs.length > 0 && (_jsx(GigPaginate, { gigs: gigs.current, totalGigs: totalGigs, showNumbers: true, itemsPerPage: ITEMS_PER_PAGE, setItemFrom: setItemFrom, setPaginationType: setPaginationType }))] })) }));
};
export default Gigs;
