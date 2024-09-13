import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { v4 as uuidv4 } from 'uuid';
import LanguageFields from './LanguageFields';
const Language = () => {
    const [showLanguageAddForm, setShowLanguageAddForm] = useState(false);
    const [showLanguageEditForm, setShowLanguageEditForm] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const { sellerProfile, showEditIcons } = useContext(SellerContext);
    return (_jsxs("div", { className: "border-grey border bg-white", children: [_jsxs("div", { className: "mb-1 flex justify-between border-b", children: [_jsx("h4", { className: "flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base", children: "LANGUAGE SKILLS" }), showEditIcons && (_jsx("span", { onClick: () => {
                            setShowLanguageAddForm(!showLanguageAddForm);
                            setShowLanguageEditForm(false);
                        }, className: "flex cursor-pointer items-center pr-3.5 text-sm text-[#00698c] md:text-base", children: "Add New" }))] }), _jsxs("ul", { className: "mb-0 list-none pt-1.5", children: [showLanguageAddForm && (_jsx("li", { className: "flex justify-between", children: _jsx(LanguageFields, { type: "add", setShowLanguageAddForm: setShowLanguageAddForm }) })), !showLanguageAddForm && (_jsx(_Fragment, { children: sellerProfile?.languages.map((lang) => (_jsxs("li", { className: "mb-2 flex justify-between", children: [!showLanguageEditForm && (_jsxs("div", { className: "col-span-3 ml-4 flex pb-3 text-sm md:text-base", children: [_jsx("div", { className: "mr-3 font-bold", children: lang.language }), _jsx("div", { className: "mr-3", children: "-" }), _jsx("div", { children: lang.level })] })), showLanguageEditForm && selectedLanguage?._id === lang._id && (_jsx(LanguageFields, { type: "edit", selectedLanguage: lang, setShowLanguageEditForm: setShowLanguageEditForm })), !showLanguageEditForm && showEditIcons && (_jsx("div", { className: "mr-4", children: _jsx(FaPencilAlt, { onClick: () => {
                                            setSelectedLanguage(lang);
                                            setShowLanguageEditForm(!showLanguageEditForm);
                                            setShowLanguageAddForm(false);
                                        }, size: "12", className: "ml-1 mt-1.5 cursor-pointer lg:ml-2.5 lg:mt-2" }) }))] }, uuidv4()))) }))] })] }));
};
export default Language;
