import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
let itemOffset = 1;
const GigPaginate = ({ gigs, totalGigs, showNumbers, itemsPerPage, setItemFrom, setPaginationType }) => {
    const paginationCount = [...Array(Math.ceil(totalGigs / itemsPerPage)).keys()];
    return (_jsx("div", { className: "flex w-full justify-center", children: _jsxs("ul", { className: "flex gap-8", children: [_jsx("div", { className: `cursor-pointer p-3 ${itemOffset - 1 > 0 ? 'rounded-full border border-sky-400' : 'cursor-not-allowed text-gray-400'}`, onClick: () => {
                        if (itemOffset - 1 > 0) {
                            itemOffset -= 1;
                            setPaginationType('backward');
                            const firstItem = gigs[0];
                            setItemFrom(`${firstItem.sortId}`);
                        }
                    }, children: _jsx(FaArrowLeft, { className: "flex self-center" }) }), showNumbers &&
                    paginationCount.map((_, index) => (_jsx("li", { className: `cursor-pointer px-3 py-2 ${itemOffset === index + 1 ? 'border-b-2 border-black font-bold text-black' : ''}`, onClick: () => {
                            const selectedPage = index + 1;
                            itemOffset += 1;
                            if (itemOffset < index + 1) {
                                setPaginationType('forward');
                                setItemFrom(`${selectedPage * itemsPerPage - itemsPerPage}`);
                            }
                            else if (itemOffset > index + 1) {
                                const selectedCount = selectedPage * itemsPerPage + 1;
                                setPaginationType('backward');
                                setItemFrom(`${selectedCount}`);
                            }
                        }, children: index + 1 }, uuidv4()))), _jsx("div", { className: `cursor-pointer p-3 ${itemOffset === paginationCount.length ? 'cursor-not-allowed text-gray-400' : 'rounded-full border border-sky-400'}`, onClick: () => {
                        if (itemOffset + 1 <= paginationCount.length) {
                            itemOffset += 1;
                            setPaginationType('forward');
                            const lastItem = gigs[gigs.length - 1];
                            setItemFrom(`${lastItem.sortId}`);
                        }
                    }, children: _jsx(FaArrowRight, { className: "flex self-center", color: `${itemOffset === paginationCount.length ? 'grey' : 'black'}` }) })] }) }));
};
export default GigPaginate;
