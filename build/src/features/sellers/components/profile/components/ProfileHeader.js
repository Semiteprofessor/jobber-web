import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
import StarRating from 'src/shared/rating/StarRating';
import { lowerCase, rating, shortenLargeNumbers } from 'src/shared/utils/util.service';
import { v4 as uuidv4 } from 'uuid';
const ProfileHeader = ({ sellerProfile, showHeaderInfo, showEditIcons, setSellerProfile }) => {
    const [showItemEdit, setShowItemEdit] = useState({
        fullname: false,
        oneliner: false
    });
    const [sellerProfileItem, setSellerProfileItem] = useState({
        fullname: `${sellerProfile?.fullName}`,
        oneliner: `${sellerProfile?.oneliner}`
    });
    const gridInfo = [
        {
            total: shortenLargeNumbers(sellerProfile?.totalGigs),
            title: 'Total Gigs',
            bgColor: '#50b5ff'
        },
        {
            total: shortenLargeNumbers(sellerProfile?.completedJobs),
            title: 'Completed Orders',
            bgColor: '#f7b124'
        },
        {
            total: shortenLargeNumbers(sellerProfile?.ongoingJobs),
            title: 'Ongoing Orders',
            bgColor: '#8553ee'
        },
        {
            total: shortenLargeNumbers(sellerProfile?.ratingsCount),
            title: 'Ratings & Reviews',
            bgColor: '#ff8b7b'
        }
    ];
    useEffect(() => {
        if (sellerProfile) {
            setSellerProfileItem({ ...sellerProfile, fullname: `${sellerProfile.fullName}`, oneliner: `${sellerProfile.oneliner}` });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sellerProfile?.fullName, sellerProfile?.oneliner]);
    return (_jsxs(_Fragment, { children: [showHeaderInfo && (_jsxs("div", { className: "relative flex h-56 flex-col gap-x-4 gap-y-3 bg-white px-6 py-4 md:h-52 md:flex-row", children: [_jsx("div", { className: "flex h-20 w-20 justify-center self-center md:h-24 md:w-24 lg:h-36 lg:w-36", children: _jsx(LazyLoadImage, { src: sellerProfile?.profilePicture, alt: "Gig Image", className: "w-full h-full rounded-full object-cover", placeholderSrc: "https://placehold.co/330x220?text=Profile+Image", effect: "blur", wrapperClassName: "w-full h-full rounded-full object-cover" }) }), _jsxs("div", { className: "flex flex-col md:mt-10 lg:mt-6", children: [_jsxs("div", { className: "flex cursor-pointer self-center md:block md:self-start", children: [_jsxs("div", { className: "flex flex-row self-center text-base font-bold lg:text-2xl", children: [!showItemEdit.fullname && sellerProfile?.fullName, showEditIcons && !showItemEdit.fullname && (_jsx(FaPencilAlt, { onClick: () => {
                                                    setShowItemEdit({ ...showItemEdit, fullname: !showItemEdit.fullname });
                                                }, className: "ml-1 mt-1.5 text-xs md:text-base lg:ml-2.5 lg:mt-2" }))] }), showItemEdit.fullname && (_jsxs("div", { className: "flex gap-x-4", children: [_jsx(TextInput, { className: "mt-2 flex h-7 w-full items-center rounded border border-gray-300 p-1.5 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none lg:h-9", placeholder: "Fullname", type: "text", name: "fullname", value: sellerProfileItem.fullname, onChange: (event) => {
                                                    setSellerProfileItem({ ...sellerProfileItem, fullname: event.target.value });
                                                } }), _jsxs("div", { className: "my-2 flex", children: [_jsx(Button, { className: "md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2", label: "Update", onClick: () => {
                                                            if (sellerProfile && setSellerProfile) {
                                                                setSellerProfile({ ...sellerProfile, fullName: sellerProfileItem.fullname });
                                                                setShowItemEdit({ ...showItemEdit, fullname: false });
                                                            }
                                                        } }), "\u00A0\u00A0", _jsx(Button, { className: "md:text-md rounded bg-red-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-red-500 focus:outline-none md:py-2", label: "Cancel", onClick: () => {
                                                            if (sellerProfile && setSellerProfile) {
                                                                setSellerProfile({ ...sellerProfile, fullName: `${sellerProfile.fullName}` });
                                                                setShowItemEdit({ ...showItemEdit, fullname: false });
                                                            }
                                                        } })] })] }))] }), _jsxs("span", { className: "flex self-center text-sm md:block md:self-start md:text-base", children: ["@", lowerCase(`${sellerProfile?.username}`)] }), _jsxs("div", { className: "flex cursor-pointer flex-row self-center text-center text-sm md:text-base lg:self-start", children: [_jsxs("div", { className: "flex", children: [!showItemEdit.oneliner && sellerProfile?.oneliner, showEditIcons && !showItemEdit.oneliner && (_jsx(FaPencilAlt, { className: "mx-1 mt-1 lg:ml-2.5", onClick: () => {
                                                    setShowItemEdit({ ...showItemEdit, oneliner: !showItemEdit.oneliner, fullname: false });
                                                } }))] }), showItemEdit.oneliner && (_jsxs("div", { className: "flex gap-x-4", children: [_jsx(TextInput, { className: "mt-2 flex h-7 w-full items-center rounded border border-gray-300 p-1.5 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none lg:h-9", placeholder: "Oneliner", type: "text", name: "oneliner", value: sellerProfileItem.oneliner, maxLength: 70, onChange: (event) => {
                                                    setSellerProfileItem({ ...sellerProfileItem, oneliner: event.target.value });
                                                } }), _jsxs("div", { className: "my-2 flex", children: [_jsx(Button, { className: "md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2", label: "Update", onClick: () => {
                                                            if (sellerProfile && setSellerProfile) {
                                                                setSellerProfile({ ...sellerProfile, oneliner: sellerProfileItem.oneliner });
                                                                setShowItemEdit({ ...showItemEdit, oneliner: false });
                                                            }
                                                        } }), "\u00A0\u00A0", _jsx(Button, { className: "md:text-md rounded bg-red-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-red-500 focus:outline-none md:py-2", label: "Cancel", onClick: () => {
                                                            setShowItemEdit({ ...showItemEdit, oneliner: false });
                                                            setSellerProfileItem({ ...sellerProfileItem, oneliner: `${sellerProfile?.oneliner}` });
                                                        } })] })] }))] }), _jsxs("div", { className: "flex w-full gap-x-1 self-center", children: [_jsx("div", { className: "mt-1 w-20 gap-x-2", children: sellerProfile?.ratingSum && sellerProfile.ratingsCount ? (_jsx(StarRating, { value: rating(sellerProfile?.ratingSum / sellerProfile.ratingsCount), size: 14 })) : (_jsx(StarRating, { value: 0, size: 14 })) }), sellerProfile?.ratingSum && sellerProfile.ratingsCount ? (_jsx("div", { className: "ml-2 mt-[3px] flex gap-1 rounded bg-orange-400 px-1 text-xs", children: _jsx("span", { className: "font-bold text-white", children: rating(sellerProfile?.ratingSum / sellerProfile.ratingsCount) }) })) : (_jsx("div", { className: "ml-2 mt-[3px] flex gap-1 rounded px-1 text-xs", children: _jsx("span", { className: "font-bold text-white" }) }))] })] })] })), _jsx("div", { className: "grid grid-cols-4 font-bold text-white", children: gridInfo.map((info) => (_jsx("div", { style: { backgroundColor: `${info.bgColor}` }, className: "col-span-4 flex items-center justify-center p-8 sm:col-span-2 md:col-span-1", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-center text-base lg:text-xl", children: info.total }), _jsx("span", { className: "truncate text-center text-sm lg:text-base", children: info.title })] }) }, uuidv4()))) })] }));
};
export default ProfileHeader;
