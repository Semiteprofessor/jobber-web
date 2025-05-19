import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaDownload, FaRegFileArchive, FaRegPlayCircle } from 'react-icons/fa';
import { checkUrlExtension } from 'src/shared/utils/image-utils.service';
import { bytesToSize, downloadFile, getFileBlob, showErrorToast } from 'src/shared/utils/util.service';
const ChatFile = ({ message }) => {
    const downloadChatFile = async (url, fileName) => {
        try {
            const response = await getFileBlob(url);
            const blobUrl = URL.createObjectURL(new Blob([response.data]));
            downloadFile(blobUrl, fileName);
        }
        catch (error) {
            showErrorToast('Error downloading file.');
        }
    };
    return (_jsxs("div", { className: "flex w-64 min-w-[100%] flex-col", children: [_jsxs("div", { className: "z-1 mt-2 flex flex-col rounded", children: [checkUrlExtension(`${message.fileType}`) === 'image' && _jsx("img", { className: "h-36 w-64 object-cover", src: message.file, alt: "" }), checkUrlExtension(`${message.fileType}`) === 'zip' && (_jsx("div", { className: "border-grey relative flex h-[120px] w-64 items-center justify-center rounded-md border", children: _jsx(FaRegFileArchive, { className: "absolute", size: 25 }) })), checkUrlExtension(`${message.fileType}`) === 'video' && (_jsxs("div", { className: "border-grey relative flex h-[150px] w-64 items-center justify-center rounded-md border", children: [_jsx(FaRegPlayCircle, { className: "absolute", size: 25 }), _jsx("video", { width: "100%", src: "" })] }))] }), _jsxs("div", { className: "flex w-auto justify-between", children: [_jsxs("div", { className: "flex gap-1 truncate", onClick: () => downloadChatFile(`${message.file}`, `${message.fileName}`), children: [_jsx(FaDownload, { size: 10, className: "flex self-center" }), _jsx("span", { className: "truncate text-xs md:text-sm", children: message.fileName })] }), _jsxs("span", { className: "truncate text-xs md:text-sm", children: ["(", bytesToSize(parseInt(`${message.fileSize}`)), ")"] })] })] }));
};
export default ChatFile;
