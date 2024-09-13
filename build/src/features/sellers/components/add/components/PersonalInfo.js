import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import TextAreaInput from 'src/shared/inputs/TextAreaInput';
import TextInput from 'src/shared/inputs/TextInput';
const PersonalInfo = ({ personalInfo, setPersonalInfo }) => {
    const [allowedInfoLength, setAllowedInfoLength] = useState({
        description: '600/600',
        oneliner: '70/70'
    });
    const maxDescriptionCharacters = 600;
    const maxOneLinerCharacters = 70;
    return (_jsxs("div", { className: "border-b border-grey p-6", children: [_jsxs("div", { className: "mb-6 grid md:grid-cols-5", children: [_jsxs("div", { className: "pb-2 text-base font-medium", children: ["Fullname", _jsx("sup", { className: "top-[-0.3em] text-base text-red-500", children: "*" })] }), _jsx("div", { className: "col-span-4 w-full", children: _jsx(TextInput, { className: "border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none", type: "text", name: "fullname", value: personalInfo.fullName, onChange: (event) => {
                                setPersonalInfo({ ...personalInfo, fullName: event.target.value });
                            } }) })] }), _jsxs("div", { className: "grid md:grid-cols-5 mb-6", children: [_jsxs("div", { className: "text-base font-medium pb-2 mt-6 md:mt-0", children: ["Oneliner", _jsx("sup", { className: "text-red-500 text-base top-[-0.3em]", children: "*" })] }), _jsxs("div", { className: "w-full col-span-4", children: [_jsx(TextInput, { className: "w-full rounded border border-grey p-2.5 mb-1 text-sm font-normal text-gray-600 focus:outline-none", type: "text", name: "oneliner", value: personalInfo.oneliner, placeholder: "E.g. Expert Mobile and Web Developer", onChange: (event) => {
                                    const onelinerValue = event.target.value;
                                    setPersonalInfo({ ...personalInfo, oneliner: onelinerValue });
                                    const counter = maxOneLinerCharacters - onelinerValue.length;
                                    setAllowedInfoLength({ ...allowedInfoLength, oneliner: `${counter}/70` });
                                }, onKeyDown: (event) => {
                                    const currentTextLength = event.target.value.length;
                                    if (currentTextLength === maxOneLinerCharacters && event.key !== 'Backspace') {
                                        event.preventDefault();
                                    }
                                } }), _jsxs("span", { className: "flex justify-end text-[#95979d] text-xs", children: [allowedInfoLength.oneliner, " Characters"] })] })] }), _jsxs("div", { className: "grid md:grid-cols-5 mb-6", children: [_jsxs("div", { className: "text-base font-medium pb-2 mt-6 md:mt-0", children: ["Oneliner", _jsx("sup", { className: "text-red-500 text-base top-[-0.3em]", children: "*" })] }), _jsxs("div", { className: "w-full col-span-4", children: [_jsx(TextInput, { className: "w-full rounded border border-grey p-2.5 mb-1 text-sm font-normal text-gray-600 focus:outline-none", type: "text", name: "oneliner", value: personalInfo.oneliner, placeholder: "E.g. Expert Mobile and Web Developer", onChange: (event) => {
                                    const onelinerValue = event.target.value;
                                    setPersonalInfo({ ...personalInfo, oneliner: onelinerValue });
                                    const counter = maxOneLinerCharacters - onelinerValue.length;
                                    setAllowedInfoLength({ ...allowedInfoLength, oneliner: `${counter}/70` });
                                }, onKeyDown: (event) => {
                                    const currentTextLength = event.target.value.length;
                                    if (currentTextLength === maxOneLinerCharacters && event.key !== 'Backspace') {
                                        event.preventDefault();
                                    }
                                } }), _jsxs("span", { className: "flex justify-end text-[#95979d] text-xs", children: [allowedInfoLength.oneliner, " Characters"] })] })] }), _jsxs("div", { className: "grid md:grid-cols-5 mb-6", children: [_jsxs("div", { className: "text-base font-medium pb-2", children: ["Description", _jsx("sup", { className: "text-red-500 text-base top-[-0.3em]", children: "*" })] }), _jsxs("div", { className: "w-full col-span-4", children: [_jsx(TextAreaInput, { className: "w-full rounded border border-grey p-2.5 mb-1 text-sm font-normal text-gray-600 focus:outline-none", name: "description", value: personalInfo.description, rows: 5, onChange: (event) => {
                                    const descriptionValue = event.target.value;
                                    setPersonalInfo({ ...personalInfo, description: descriptionValue });
                                    const counter = maxDescriptionCharacters - descriptionValue.length;
                                    setAllowedInfoLength({ ...allowedInfoLength, description: `${counter}/600` });
                                }, onKeyDown: (event) => {
                                    const currentTextLength = event.target.value.length;
                                    if (currentTextLength === maxDescriptionCharacters && event.key !== 'Backspace') {
                                        event.preventDefault();
                                    }
                                } }), _jsxs("span", { className: "flex justify-end text-[#95979d] text-xs", children: [allowedInfoLength.description, " Characters"] })] })] }), _jsxs("div", { className: "grid md:grid-cols-5 mb-6", children: [_jsxs("div", { className: "text-base font-medium pb-2", children: ["Response Time", _jsx("sup", { className: "text-red-500 text-base top-[-0.3em]", children: "*" })] }), _jsx("div", { className: "w-full col-span-4", children: _jsx(TextInput, { className: "w-full rounded border border-grey p-2.5 mb-1 text-sm font-normal text-gray-600 focus:outline-none", type: "number", name: "responseTime", placeholder: "E.g. 1", value: personalInfo.responseTime, onChange: (event) => {
                                const value = event.target.value;
                                setPersonalInfo({ ...personalInfo, responseTime: parseInt(value) > 0 ? value : '' });
                            } }) })] })] }));
};
export default PersonalInfo;
