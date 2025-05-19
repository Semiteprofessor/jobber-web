import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import GigLeftAbout from './GigViewLeft/GigLeftAbout';
import GigLeftOverview from './GigViewLeft/GigLeftOverview';
import GigViewReviews from './GigViewLeft/GigViewReviews';
const GigViewLeft = () => {
    return (_jsxs(_Fragment, { children: [_jsx(GigLeftOverview, {}), _jsx(GigLeftAbout, {}), _jsx(GigViewReviews, { showRatings: true, hasFetchedReviews: false })] }));
};
export default GigViewLeft;
