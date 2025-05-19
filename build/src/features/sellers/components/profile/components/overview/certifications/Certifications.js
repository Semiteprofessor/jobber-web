import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import { v4 as uuidv4 } from 'uuid';
import CertificateEditFields from './CertificateEditFields';
const Certifications = () => {
    const [showCertificateAddForm, setShowCertificateAddForm] = useState(false);
    const [showCertificateEditForm, setShowCertificateEditForm] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState();
    const { sellerProfile, showEditIcons } = useContext(SellerContext);
    return (_jsxs("div", { className: "border-grey mt-6 border bg-white", children: [_jsxs("div", { className: "mb-1 flex justify-between border-b", children: [_jsx("h4", { className: "flex py-2.5 pl-3.5 text-sm font-bold text-[#161c2d] md:text-base", children: "CERTIFICATIONS" }), showEditIcons && (_jsx("span", { onClick: () => {
                            setShowCertificateAddForm(!showCertificateAddForm);
                            setShowCertificateEditForm(false);
                        }, className: "flex cursor-pointer items-center pr-3.5 text-sm text-[#00698c] md:text-base", children: "Add New" }))] }), _jsxs("ul", { className: "mb-0 list-none pt-1.5", children: [showCertificateAddForm && (_jsx("li", { className: "flex justify-between", children: _jsx(CertificateEditFields, { type: "add", setShowCertificateAddForm: setShowCertificateAddForm }) })), !showCertificateAddForm && (_jsx(_Fragment, { children: sellerProfile?.certificates.map((certificate) => (_jsxs("li", { className: "mb-2 flex justify-between", children: [!showCertificateEditForm && (_jsxs("div", { className: "col-span-3 ml-4 flex flex-col pb-3 text-sm md:text-base", children: [_jsx("div", { className: "mr-3 font-bold ", children: certificate.name }), _jsxs("div", { className: "mr-3 font-normal", children: [certificate.from, " - ", certificate.year] })] })), showCertificateEditForm && selectedCertificate?.name === certificate.name && (_jsx(CertificateEditFields, { type: "edit", selectedCertificate: selectedCertificate, setShowCertificateEditForm: setShowCertificateEditForm })), !showCertificateEditForm && showEditIcons && (_jsx("div", { className: "mr-4", children: _jsx(FaPencilAlt, { onClick: () => {
                                            setShowCertificateAddForm(false);
                                            setShowCertificateEditForm(!showCertificateEditForm);
                                            setSelectedCertificate(certificate);
                                        }, size: "12", className: "ml-1 mt-1.5 cursor-pointer lg:ml-2.5 lg:mt-2" }) }))] }, uuidv4()))) })), sellerProfile?.certificates.length === 0 && !showCertificateAddForm && !showCertificateEditForm && (_jsx("li", { className: "flex justify-between mb-2 ml-4", children: "No information" }))] })] }));
};
export default Certifications;
