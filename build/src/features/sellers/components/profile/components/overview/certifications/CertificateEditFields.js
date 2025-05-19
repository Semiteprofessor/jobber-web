import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cloneDeep, filter, findIndex } from 'lodash';
import { useContext, useState } from 'react';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import Button from 'src/shared/button/Button';
import Dropdown from 'src/shared/dropdown/Dropdown';
import TextInput from 'src/shared/inputs/TextInput';
import { yearsList } from 'src/shared/utils/util.service';
const CertificateEditFields = ({ type, selectedCertificate, setShowCertificateAddForm, setShowCertificateEditForm }) => {
    const { sellerProfile, setSellerProfile } = useContext(SellerContext);
    const [certificateItem, setCertificateItem] = useState({
        name: selectedCertificate && selectedCertificate.name ? selectedCertificate.name : '',
        from: selectedCertificate && selectedCertificate.from ? selectedCertificate.from : '',
        year: selectedCertificate && selectedCertificate.year ? selectedCertificate.year : 'Year'
    });
    const [year, setYear] = useState(selectedCertificate && selectedCertificate.year ? `${selectedCertificate.year}` : 'Year');
    const onHandleUpdate = () => {
        setCertificateItem({ ...certificateItem, year });
        if (type === 'add') {
            const newItem = {
                name: certificateItem.name,
                from: certificateItem.from,
                year
            };
            const clonedCertificates = cloneDeep(sellerProfile.certificates);
            clonedCertificates.push(newItem);
            if (setSellerProfile && setShowCertificateAddForm) {
                setSellerProfile({ ...sellerProfile, certificates: clonedCertificates });
                setShowCertificateAddForm(false);
            }
        }
        else {
            const itemIndex = findIndex(sellerProfile?.certificates, (value) => value.name === selectedCertificate?.name);
            const clonedCertificates = cloneDeep(sellerProfile?.certificates);
            const clonedItem = { name: certificateItem.name, from: certificateItem.from, year, _id: selectedCertificate?._id };
            clonedCertificates.splice(itemIndex, 1, clonedItem);
            const filtered = filter(clonedCertificates, (item) => item.name !== '');
            if (setSellerProfile && setShowCertificateEditForm) {
                setSellerProfile({ ...sellerProfile, certificates: filtered });
                setShowCertificateEditForm(false);
            }
        }
    };
    return (_jsxs("div", { className: "flex w-full flex-col", children: [_jsxs("div", { className: "mb-16 px-3", children: [_jsx(TextInput, { className: "border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none", placeholder: "Certificate or Award", type: "text", name: "name", value: certificateItem.name, onChange: (event) => {
                            setCertificateItem({ ...certificateItem, name: event.target.value });
                        } }), _jsx(TextInput, { className: "border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none", placeholder: "Certificate From (e.g: Google)", type: "text", name: "from", value: certificateItem.from, onChange: (event) => {
                            setCertificateItem({ ...certificateItem, from: event.target.value });
                        } }), _jsx("div", { className: "relative", children: _jsx(Dropdown, { text: year, maxHeight: "300", mainClassNames: "absolute bg-white z-50", values: yearsList(100), setValue: setYear }) })] }), _jsxs("div", { className: "z-20 my-4 mt-10 flex cursor-pointer justify-center md:z-0 md:mt-0", children: [_jsx(Button, { disabled: (year === 'Year' || !certificateItem.name || !certificateItem.from) && type === 'add', className: `md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2
          ${(year === 'Year' || !certificateItem.name || !certificateItem.from) && type === 'add'
                            ? 'cursor-not-allowed opacity-40'
                            : 'cursor-pointer'}
          `, label: `${type === 'add' ? 'Add' : 'Update'}`, onClick: onHandleUpdate }), "\u00A0\u00A0", _jsx(Button, { className: "md:text-md rounded bg-gray-300 px-6 py-1 text-center text-sm font-bold hover:bg-gray-200 focus:outline-none md:py-2", label: "Cancel", onClick: () => {
                            if (type === 'add' && setShowCertificateAddForm) {
                                setShowCertificateAddForm(false);
                            }
                            else if (type === 'edit' && setShowCertificateEditForm) {
                                setShowCertificateEditForm(false);
                            }
                        } })] })] }));
};
export default CertificateEditFields;
