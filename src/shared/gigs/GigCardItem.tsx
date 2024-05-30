import { FC, ReactElement, useState } from 'react';
import { FaEllipsisH, FaPauseCircle, FaPencilAlt, FaPlayCircle, FaRegStar, FaStar, FaTrashAlt } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { IGigsProps, ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { useDeleteGigMutation, useUpdateActiveGigMutation } from 'src/features/gigs/services/gigs.service';
import { rating } from 'src/shared/utils/utils.service';
import { useAppDispatch } from 'src/store/store';

import { updateHeader } from '../header/reducers/header.reducer';
import ApprovalModal from '../modals/ApprovalModal';
import { IApprovalModalContent } from '../modals/interfaces/modal.interface';
import { IGigCardItemModal } from '../shared.interface';
import { lowerCase, replaceSpacesWithDash, showErrorToast, showSuccessToast } from '../utils/utils.service';

const GigCardItem: FC<IGigsProps> = ({ gig: gigData }): ReactElement => {
  const gig = gigData as ISellerGig;
  const [gigCardItemModal, setGigCardItemModal] = useState<IGigCardItemModal>({
    overlay: false,
    deleteApproval: false
  });
  const [approvalModalContent, setApprovalModalContent] = useState<IApprovalModalContent>();
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const title: string = replaceSpacesWithDash(gig.title);
  const [updateActiveGig] = useUpdateActiveGigMutation();
  const [deleteGig] = useDeleteGigMutation();

  const navigateToEditGig = (gigId: string): void => {
    setGigCardItemModal({ ...gigCardItemModal, overlay: false });
    dispatch(updateHeader('home'));
    navigate(`/manage_gigs/edit/${gigId}`, { state: gig });
  };

  const onToggleGig = async (active: boolean): Promise<void> => {
    try {
      await updateActiveGig({ gigId: `${gig.id}`, active }).unwrap();
      setGigCardItemModal({ ...gigCardItemModal, overlay: false });
      showSuccessToast('Gig status updated successfully.');
    } catch (error) {
      showErrorToast('Error setting gig status.');
    }
  };

  const onDeleteGig = async (): Promise<void> => {
    try {
      await deleteGig({ gigId: `${gig.id}`, sellerId: `${gig.sellerId}` }).unwrap();
      setGigCardItemModal({ deleteApproval: false, overlay: false });
      showSuccessToast('Gig deleted successfully.');
    } catch (error) {
      showErrorToast('Error deleting gig.');
    }
  };

  return <div>GigCardItem</div>;
};

export default GigCardItem;
