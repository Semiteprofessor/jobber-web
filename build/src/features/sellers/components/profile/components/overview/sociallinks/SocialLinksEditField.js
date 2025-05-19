import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cloneDeep, filter, findIndex } from 'lodash';
import { useContext, useState } from 'react';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
const SocialLinksEditField = ({ type, selectedLink, setShowSocialLinksAddForm, setShowSocialLinksEditForm }) => {
    const [socialLink, setSocialLink] = useState(selectedLink ? `${selectedLink}` : '');
    const { sellerProfile, setSellerProfile } = useContext(SellerContext);
    const onHandleUpdate = () => {
        if (type === 'add') {
            const clonedSocialLinks = cloneDeep(sellerProfile.socialLinks);
            clonedSocialLinks.push(socialLink);
            if (setSellerProfile && setShowSocialLinksAddForm) {
                setSellerProfile({ ...sellerProfile, socialLinks: clonedSocialLinks });
                setShowSocialLinksAddForm(false);
            }
        }
        else {
            const itemIndex = findIndex(sellerProfile?.socialLinks, (value) => value === selectedLink);
            const clonedSocialLinks = cloneDeep(sellerProfile?.socialLinks);
            clonedSocialLinks.splice(itemIndex, 1, socialLink);
            const filtered = filter(clonedSocialLinks, (item) => item !== '');
            if (setSellerProfile && setShowSocialLinksEditForm) {
                setSellerProfile({ ...sellerProfile, socialLinks: filtered });
                setShowSocialLinksEditForm(false);
            }
        }
    };
    const onCancelUpdate = () => {
        if (type === 'add' && setShowSocialLinksAddForm) {
            setShowSocialLinksAddForm(false);
        }
        else if (type === 'edit' && setShowSocialLinksEditForm) {
            setShowSocialLinksEditForm(false);
        }
    };
    return (_jsxs("div", { className: "flex w-full flex-col", children: [_jsx("div", { className: "mb-6 px-3", children: _jsx(TextInput, { className: "border-grey w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none", placeholder: "Social media link", type: "text", name: "socialLink", value: socialLink, onChange: (event) => {
                        setSocialLink(event.target.value);
                    } }) }), _jsxs("div", { className: "z-20 my-4 mt-10 flex cursor-pointer justify-center md:z-0 md:mt-0", children: [_jsx(Button, { disabled: !socialLink && type === 'add', className: `md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white
          hover:bg-sky-400 focus:outline-none md:py-2 ${!socialLink && type === 'add' ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`, label: `${type === 'add' ? 'Add' : 'Update'}`, onClick: onHandleUpdate }), "\u00A0\u00A0", _jsx(Button, { className: "md:text-md rounded bg-gray-300 px-6 py-1 text-center text-sm font-bold hover:bg-gray-200 focus:outline-none md:py-2", label: "Cancel", onClick: onCancelUpdate })] })] }));
};
export default SocialLinksEditField;
