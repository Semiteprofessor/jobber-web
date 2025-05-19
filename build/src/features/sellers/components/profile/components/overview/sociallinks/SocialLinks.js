import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { v4 as uuidv4 } from 'uuid';
import SocialLinksEditField from './SocialLinksEditField';
const SocialLinks = () => {
    const [showSocialLinkAddForm, setShowSocialLinkAddForm] = useState(false);
    const [showSocialLinkEditForm, setShowSocialLinkEditForm] = useState(false);
    const [selectedSocialLink, setSelectedSocialLink] = useState();
    const { sellerProfile, showEditIcons } = useContext(SellerContext);
    return (_jsxs("div", { className: "border-grey border bg-white mt-6", children: [_jsxs("div", { className: "mb-1 flex justify-between border-b", children: [_jsx("h4", { className: "flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base", children: "SOCIAL LINKS" }), showEditIcons && (_jsx("span", { onClick: () => {
                            setShowSocialLinkAddForm(!showSocialLinkAddForm);
                            setShowSocialLinkEditForm(false);
                        }, className: "flex cursor-pointer items-center pr-3.5 text-[#00698c] text-sm md:text-base", children: "Add New" }))] }), _jsxs("ul", { className: "mb-0 list-none pt-1.5", children: [showSocialLinkAddForm && (_jsx("li", { className: "flex justify-between", children: _jsx(SocialLinksEditField, { type: "add", setShowSocialLinksAddForm: setShowSocialLinkAddForm }) })), !showSocialLinkAddForm && (_jsx(_Fragment, { children: sellerProfile?.socialLinks.map((link) => (_jsxs("li", { className: "flex justify-between mb-2", children: [!showSocialLinkEditForm && (_jsx("div", { className: "col-span-3 ml-4 flex pb-3 text-sm md:text-base", children: _jsx("a", { href: link, target: "_blank", className: "mr-3 text-sky-500 no-underline hover:underline", children: link }) })), showSocialLinkEditForm && selectedSocialLink === link && (_jsx(SocialLinksEditField, { type: "edit", selectedLink: selectedSocialLink, setShowSocialLinksEditForm: setShowSocialLinkEditForm })), !showSocialLinkEditForm && showEditIcons && (_jsx("div", { className: "mr-4", children: _jsx(FaPencilAlt, { onClick: () => {
                                            setSelectedSocialLink(link);
                                            setShowSocialLinkAddForm(false);
                                            setShowSocialLinkEditForm(!showSocialLinkEditForm);
                                        }, size: "12", className: "ml-1 mt-1.5 cursor-pointer lg:ml-2.5 lg:mt-2" }) }))] }, uuidv4()))) })), !sellerProfile?.socialLinks.length && _jsx("li", { className: "flex justify-between mb-2 ml-4", children: "No information" })] })] }));
};
export default SocialLinks;
