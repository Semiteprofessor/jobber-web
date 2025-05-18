import Quill from 'quill';
import { ChangeEvent, FC, ReactElement, useRef, useState } from 'react';
import equal from 'react-fast-compare';
import { FaCamera } from 'react-icons/fa';
import ReactQuill, { UnprivilegedEditor } from 'react-quill';
import { NavigateFunction, useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from 'src/shared/breadcrumb/Breadcrumb';
import Button from 'src/shared/button/Button';
import Dropdown from 'src/shared/dropdown/Dropdown';
import TextAreaInput from 'src/shared/inputs/TextAreaInput';
import TextInput from 'src/shared/inputs/TextInput';
import ApprovalModal from 'src/shared/modals/ApprovalModal';
import { IApprovalModalContent } from 'src/shared/modals/interfaces/modal.interface';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import { IResponse } from 'src/shared/shared.interface';
import { checkImage, readAsBase64 } from 'src/shared/utils/image-utils.service';
import {
  categories,
  expectedGigDelivery,
  lowerCase,
  reactQuillUtils,
  replaceSpacesWithDash,
  showErrorToast,
  showSuccessToast
} from 'src/shared/utils/utils.service';
import { useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

import { useGigSchema } from '../../hooks/useGigSchema';
import { GIG_MAX_LENGTH, IAllowedGigItem, ICreateGig, ISellerGig, IShowGigModal } from '../../interfaces/gig.interface';
import { gigInfoSchema } from '../../schemes/gig.schema';
import { useUpdateGigMutation } from '../../services/gigs.service';
import TagsInput from './components/TagsInput';

const EditGig: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const { state }: { state: ISellerGig } = useLocation();
  const defaultGigInfo: ICreateGig = {
    title: state?.title,
    categories: state?.categories,
    description: state?.description,
    subCategories: state?.subCategories,
    tags: state?.tags,
    price: state?.price,
    coverImage: state?.coverImage,
    expectedDelivery: state?.expectedDelivery,
    basicTitle: state?.basicTitle,
    basicDescription: state?.basicDescription
  };
  const [gigInfo, setGigInfo] = useState<ICreateGig>(defaultGigInfo);
  const [subCategory, setSubCategory] = useState<string[]>(state?.subCategories);
  const [subCategoryInput, setSubCategoryInput] = useState<string>('');
  const [tags, setTags] = useState<string[]>(state?.tags);
  const [tagsInput, setTagsInput] = useState<string>('');
  const [showGigModal, setShowGigModal] = useState<IShowGigModal>({
    image: false,
    cancel: false
  });
  const reactQuillRef = useRef<ReactQuill | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [allowedGigItemLength, setAllowedGigItemLength] = useState<IAllowedGigItem>({
    gigTitle: `${GIG_MAX_LENGTH.gigTitle - state?.title.length}/80`,
    basicTitle: `${GIG_MAX_LENGTH.basicTitle - state?.basicTitle.length}/40`,
    basicDescription: `${GIG_MAX_LENGTH.basicDescription - state?.basicDescription.length}/100`,
    descriptionCharacters: `${GIG_MAX_LENGTH.fullDescription - state?.description.length}/1200`
  });
  
  const gigInfoRef = useRef<ICreateGig>(defaultGigInfo);
  const [approvalModalContent, setApprovalModalContent] = useState<IApprovalModalContent>();
  const navigate: NavigateFunction = useNavigate();
  const { gigId } = useParams<string>();
  const [schemaValidation] = useGigSchema({ schema: gigInfoSchema, gigInfo });
  const [updateGig, { isLoading }] = useUpdateGigMutation();

  const handleFileChange = async (event: ChangeEvent): Promise<void> => {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (target.files) {
      const file: File = target.files[0];
      const isValid = checkImage(file, 'image');
      if (isValid) {
        const dataImage: string | ArrayBuffer | null = await readAsBase64(file);
        setGigInfo({ ...gigInfo, coverImage: `${dataImage}` });
      }
      setShowGigModal({ ...showGigModal, image: false });
    }
  };

const EditGig = () => {
  return <div>EditGig</div>;
};

export default EditGig;
