import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { FaEllipsisH, FaPauseCircle, FaPencilAlt, FaPlayCircle, FaRegStar, FaStar, FaTrashAlt } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteGigMutation, useUpdateActiveGigMutation } from 'src/features/gigs/services/gigs.service';
import { rating } from 'src/shared/utils/util.service';
import { useAppDispatch } from 'src/store/store';
import { updateHeader } from '../header/reducers/header.reducer';
import ApprovalModal from '../modals/ApprovalModal';
import { lowerCase, replaceSpacesWithDash, showErrorToast, showSuccessToast } from '../utils/util.service';
const GigCardItem = ({ gig: gigData }) => {
    const gig = gigData;
    const [gigCardItemModal, setGigCardItemModal] = useState({
        overlay: false,
        deleteApproval: false
    });
    const [approvalModalContent, setApprovalModalContent] = useState();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const title = replaceSpacesWithDash(gig.title);
    const [updateActiveGig] = useUpdateActiveGigMutation();
    const [deleteGig] = useDeleteGigMutation();
    const navigateToEditGig = (gigId) => {
        setGigCardItemModal({ ...gigCardItemModal, overlay: false });
        dispatch(updateHeader('home'));
        navigate(`/manage_gigs/edit/${gigId}`, { state: gig });
    };
    const onToggleGig = async (active) => {
        try {
            await updateActiveGig({ gigId: `${gig.id}`, active }).unwrap();
            setGigCardItemModal({ ...gigCardItemModal, overlay: false });
            showSuccessToast('Gig status updated successfully.');
        }
        catch (error) {
            showErrorToast('Error setting gig status.');
        }
    };
    const onDeleteGig = async () => {
        try {
            await deleteGig({ gigId: `${gig.id}`, sellerId: `${gig.sellerId}` }).unwrap();
            setGigCardItemModal({ deleteApproval: false, overlay: false });
            showSuccessToast('Gig deleted successfully.');
        }
        catch (error) {
            showErrorToast('Error deleting gig.');
        }
    };
    return (_jsxs(_Fragment, { children: [gigCardItemModal.deleteApproval && (_jsx(ApprovalModal, { approvalModalContent: approvalModalContent, onClick: onDeleteGig, onClose: () => setGigCardItemModal({ ...gigCardItemModal, deleteApproval: false }) })), _jsxs("div", { className: "relative", children: [gigCardItemModal.overlay && (_jsxs("div", { className: "border-grey absolute bottom-0 top-0 mb-8 w-full cursor-pointer border bg-white", children: [_jsx("div", { onClick: () => setGigCardItemModal({ ...gigCardItemModal, overlay: false }), className: "absolute -right-[12px] -top-[12px] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-sky-500 bg-white text-sm font-bold leading-[0] text-sky-500", children: "X" }), _jsxs("ul", { className: "list-none pl-0", children: [_jsx("li", { children: _jsxs("div", { onClick: () => navigateToEditGig(`${gig.id}`), className: "my-1 flex w-full cursor-pointer gap-4 px-4 pt-3", children: [_jsx(FaPencilAlt, { size: 13, className: "flex self-center" }), _jsx("span", { className: "", children: "Edit" })] }) }), _jsx("li", { children: _jsxs("div", { onClick: () => onToggleGig(!gig.active), className: "my-1 flex w-full cursor-pointer gap-4 px-4 pt-3", children: [!gig.active ? (_jsx(FaPlayCircle, { size: 13, className: "flex self-center" })) : (_jsx(FaPauseCircle, { size: 13, className: "flex self-center" })), _jsx("span", { children: !gig.active ? 'Activate' : 'Pause' })] }) }), _jsx("li", { children: _jsxs("div", { onClick: () => {
                                                setApprovalModalContent({
                                                    header: 'Delete this Gig',
                                                    body: 'Are you sure you want to permanently delete this gig?',
                                                    btnText: 'Delete',
                                                    btnColor: 'bg-red-500'
                                                });
                                                setGigCardItemModal({ ...gigCardItemModal, deleteApproval: true });
                                            }, className: "my-1 flex w-full cursor-pointer gap-4 px-4 pt-3", children: [_jsx(FaTrashAlt, { size: 13, className: "flex self-center" }), _jsx("span", { className: "", children: "Delete" })] }) })] })] })), _jsxs("div", { className: "border-grey mb-8 flex cursor-pointer flex-col gap-2 border", children: [_jsx(Link, { onClick: () => dispatch(updateHeader('home')), to: `/gig/${lowerCase(`${gig.username}`)}/${title}/${gig.sellerId}/${gig.id}/view`, children: _jsx(LazyLoadImage, { src: gig.coverImage, alt: "Gig cover image", className: "w-full", placeholderSrc: "https://placehold.co/330x220?text=Profile+Image" }) }), _jsx("div", { className: "px-2", children: _jsx(Link, { onClick: () => dispatch(updateHeader('home')), to: `/gig/${lowerCase(`${gig.username}`)}/${title}/${gig.sellerId}/${gig.id}/view`, children: _jsx("p", { className: "line-clamp-2 text-[#404145] hover:text-sky-500", children: gig.basicDescription }) }) }), _jsxs("div", { className: "flex gap-2 px-2 text-orange-400", children: [parseInt(`${gig.ratingsCount}`) > 0 ? _jsx(FaStar, { color: "orange", className: "mt-1" }) : _jsx(FaRegStar, { className: "mt-1" }), "(", rating(parseInt(`${gig.ratingSum}`) / parseInt(`${gig.ratingsCount}`)), ")"] }), _jsxs("div", { className: "flex justify-between px-2 pb-2", children: [_jsx(FaEllipsisH, { size: 14, className: "self-center", onClick: () => setGigCardItemModal({ ...gigCardItemModal, overlay: true }) }), _jsxs("strong", { className: "text-base font-normal", children: ["$", gig.price] })] })] })] })] }));
};
export default GigCardItem;
