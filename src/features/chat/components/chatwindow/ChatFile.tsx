import { AxiosResponse } from 'axios';
import { FC, ReactElement } from 'react';
import { FaDownload, FaRegFileArchive, FaRegPlayCircle } from 'react-icons/fa';
import { checkUrlExtension } from 'src/shared/utils/image-utils.service';
import { bytesToSize, downloadFile, getFileBlob, showErrorToast } from 'src/shared/utils/utils.service';

import { IChatMessageProps } from '../../interfaces/chat.interface';

const ChatFile: FC<IChatMessageProps> = ({ message }): ReactElement => {
  const downloadChatFile = async (url: string, fileName: string): Promise<void> => {
    try {
      const response: AxiosResponse = await getFileBlob(url);
      const blobUrl: string = URL.createObjectURL(new Blob([response.data]));
      downloadFile(blobUrl, fileName);
    } catch (error) {
      showErrorToast('Error downloading file.');
    }
  };

  return <div>ChatFile</div>;
};

export default ChatFile;
