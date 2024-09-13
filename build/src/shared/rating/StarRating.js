import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment, useEffect, useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
const StarRating = ({ value, size, setReviewRating }) => {
    const [numberOfStars] = useState([...Array(5).keys()].map((index) => index + 1));
    const [rating, setRating] = useState(0);
    useEffect(() => {
        if (value) {
            setRating(value);
        }
    }, [value]);
    const handleClick = (index) => {
        if (!value && setReviewRating) {
            setRating(index);
            setReviewRating(index);
        }
    };
    return (_jsx("div", { className: "flex cursor-pointer", children: _jsxs("div", { className: "flex relative text-orange-400", children: [numberOfStars.map((index) => (_jsx(Fragment, { children: index <= rating && _jsx(FaStar, { size: size, className: "mr-1" }) }, index))), _jsx("div", { className: "absolute flex text-orange-400", children: numberOfStars.map((index) => (_jsx(FaRegStar, { className: "mr-1", size: size, onClick: () => handleClick(index) }, uuidv4()))) })] }) }));
};
export default StarRating;
