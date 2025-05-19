import { ChangeEvent, FC, ReactElement } from 'react';
import { FaCircleNotch, FaRegFileArchive, FaTimes } from 'react-icons/fa';
import TextInput from 'src/shared/inputs/TextInput';
import { validateImage } from 'src/shared/utils/image-utils.service';
import { bytesToSize } from 'src/shared/utils/utils.service';

import { IFilePreviewProps } from '../../interfaces/chat.interface';

const ChatImagePreview: FC<IFilePreviewProps> = ({
  image,
  file,
  isLoading,
  message,
  handleChange,
  onSubmit,
  onRemoveImage
}): ReactElement => {
  return <div>ChatImagePreview</div>;
};

export default ChatImagePreview;
