import { ChangeEvent, FC, ReactElement, useRef, useState } from 'react';
import { FaCircleNotch, FaPaperclip, FaRegFile, FaTimes } from 'react-icons/fa';
import { IDeliveredWork } from 'src/features/order/interfaces/order.interface';
import { useDeliverOrderMutation } from 'src/features/order/services/order.service';

import Button from '../button/Button';
import TextAreaInput from '../inputs/TextAreaInput';
import TextInput from '../inputs/TextInput';
import { checkFile, fileType, readAsBase64 } from '../utils/image-utils.service';
import { bytesToSize, showErrorToast, showSuccessToast } from '../utils/utils.service';
import { IModalProps } from './interfaces/modal.interface';
import ModalBg from './ModalBg';

const DeliverWorkModal: FC<IModalProps> = ({ order, onClose }): ReactElement => {
  const [description, setDescription] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showImagePreview, setShowImagePreview] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [deliverOrder, { isLoading }] = useDeliverOrderMutation();

  const handleFileChange = (event: ChangeEvent): void => {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (target.files) {
      const file: File = target.files[0];
      if (!checkFile(file)) {
        setSelectedFile(file);
        setShowImagePreview(true);
      }
    }
  };

  return <div>DeliverWorkModal</div>;
};

export default DeliverWorkModal;
