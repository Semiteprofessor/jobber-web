import { jsx as _jsx } from "react/jsx-runtime";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { replaceSpacesWithDash } from 'src/shared/utils/util.service';
const GigIndexItem = ({ gig }) => {
    const gigData = gig;
    const title = replaceSpacesWithDash(gigData.title);
    return (_jsx("div", { className: "rounded", children: _jsx("div", { className: "mb-8 flex cursor-pointer flex-col gap-2", children: _jsx(Link, { to: `/gig/${gigData.id}/${title}`, children: _jsx(LazyLoadImage, { src: gigData.coverImage, alt: "Gig cover image", className: "w-full rounded-lg", placeholderSrc: "https://placehold.co/330x220?text=Profile+Image", effect: "blur" }) }) }) }));
};
export default GigIndexItem;
