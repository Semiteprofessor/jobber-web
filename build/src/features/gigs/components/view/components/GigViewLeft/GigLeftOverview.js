import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { FaCircleNotch } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { GigContext } from 'src/features/gigs/context/GigContext';
const GigLeftOverview = () => {
    const { gig, isSuccess, isLoading } = useContext(GigContext);
    return (_jsxs("div", { className: "relative flex max-h-[600px] h-[600px] cursor-pointer justify-center bg-[#F5F5F5]", children: [!isLoading && isSuccess && (_jsx(LazyLoadImage, { src: gig.coverImage, alt: "Gig Image", className: "w-full h-full object-cover transition-all duration-500 hover:scale-105", placeholderSrc: "https://placehold.co/330x220?text=Profile+Image", effect: "blur" })), isLoading && !isSuccess && (_jsx("div", { className: "flex h-[600px] w-full transition-all duration-500 hover:scale-105", children: _jsx(FaCircleNotch, { className: "mr-3 flex h-10 w-full animate-spin self-center", size: 40, color: "#50b5ff" }) }))] }));
};
export default GigLeftOverview;
