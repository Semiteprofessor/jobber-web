import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import TextInput from 'src/shared/inputs/TextInput';
import { v4 as uuidv4 } from 'uuid';
const TagsInput = (props) => {
    const { title, placeholder, gigInfo, tags, itemName, itemInput, setItem, setItemInput, setGigInfo, counterText } = props;
    const [isKeyReleased, setIsKeyReleased] = useState(false);
    const maxTagCount = 10;
    const onChange = (event) => {
        const { value } = event.target;
        setItemInput(value);
    };
    const onKeyUp = () => {
        setIsKeyReleased(true);
    };
    const onKeyDown = (event, input, tagsList) => {
        const { key } = event;
        const trimmedInput = input.trim();
        if (!trimmedInput) {
            return;
        }
        if (tagsList.length + 1 <= maxTagCount) {
            if (key === ',' && trimmedInput.length && !tagsList.includes(trimmedInput)) {
                event.preventDefault();
                setItem((prevState) => [...prevState, trimmedInput]);
                setItemInput('');
                const gigInfoList = gigInfo[`${itemName}`];
                setGigInfo({ ...gigInfo, [`${itemName}`]: [...gigInfoList, trimmedInput] });
            }
        }
        if (key === 'Backspace' && !input.length && tagsList.length && isKeyReleased) {
            const tagsCopy = [...tagsList];
            const poppedTag = tagsCopy.pop();
            event.preventDefault();
            setItem(tagsCopy);
            setItemInput(poppedTag);
            setGigInfo({ ...gigInfo, [`${itemName}`]: [...tagsCopy] });
        }
        setIsKeyReleased(false);
    };
    const deleteTag = (index) => {
        setItem((prevState) => prevState.filter((_, i) => i !== index));
        const gigInfoList = gigInfo[`${itemName}`];
        setGigInfo({ ...gigInfo, [`${itemName}`]: gigInfoList.filter((_, i) => i !== index) });
    };
    return (_jsxs("div", { className: "mb-6 grid md:grid-cols-5", children: [_jsxs("div", { className: "mt-6 pb-2 text-base font-medium lg:mt-0", children: [title, _jsx("sup", { className: "top-[-0.3em] text-base text-red-500", children: "*" })] }), _jsxs("div", { className: "col-span-4 md:w-11/12 lg:w-8/12", children: [_jsx("div", { className: "flex w-full flex-wrap py-[4px]", children: tags.map((tags, index) => (_jsxs("div", { onClick: () => deleteTag(index), className: "my-[2px] mr-1 flex items-center whitespace-nowrap rounded-[50px] bg-sky-500 px-4 text-sm font-bold text-white", children: [tags, _jsx("span", { className: "flex cursor-pointer p-[6px] text-white", children: "x" })] }, uuidv4()))) }), _jsx(TextInput, { type: "text", name: title, value: itemInput, className: "border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none", placeholder: placeholder, onChange: (event) => onChange(event), onKeyDown: (event) => onKeyDown(event, itemInput, tags), onKeyUp: onKeyUp }), _jsxs("span", { className: "flex justify-end text-xs text-[#95979d]", children: [maxTagCount - tags.length, " ", counterText] })] })] }));
};
export default TagsInput;
