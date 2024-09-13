import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
import { yearsList } from 'src/shared/utils/util.service';
import Dropdown from '../../../../../shared/dropdown/Dropdown';
const SellerCertificateFields = ({ certificatesFields, setCertificatesFields }) => {
    const adCertificateFields = () => {
        const newfield = {
            name: '',
            from: '',
            year: 'Year'
        };
        if (certificatesFields && setCertificatesFields) {
            setCertificatesFields([...certificatesFields, newfield]);
        }
    };
    const removeCertificateFields = (index) => {
        if (certificatesFields && setCertificatesFields && certificatesFields.length > 1) {
            const data = [...certificatesFields];
            data.splice(index, 1);
            setCertificatesFields([...data]);
        }
    };
    const handleCertificateFieldsChange = (event, index) => {
        if (certificatesFields && setCertificatesFields) {
            const target = event.target;
            const data = [...certificatesFields];
            data[index][target.name] = target.value;
            setCertificatesFields([...data]);
        }
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("h2", { className: "pb-4 text-xl font-bold", children: "Awards/Certificates" }), _jsx(Button, { className: "md:text-md h-7 rounded bg-sky-500 px-6 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-8", onClick: adCertificateFields, label: "Add More" })] }), certificatesFields?.map((input, index) => (_jsxs("div", { children: [_jsxs("div", { className: "flex flex-col", children: [_jsx(TextInput, { className: "border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none", placeholder: "Certificate or Award", type: "text", name: "name", value: input.name, onChange: (event) => handleCertificateFieldsChange(event, index) }), _jsx(TextInput, { className: "border-grey mb-4 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none", placeholder: "Certificate From (e.g: Google)", type: "text", name: "from", value: input.from, onChange: (event) => handleCertificateFieldsChange(event, index) })] }), _jsxs("div", { className: "relative flex flex-col", children: [_jsx(Dropdown, { text: `${input.year}`, maxHeight: "300", mainClassNames: "absolute bg-white z-10", values: yearsList(100), onClick: (item) => {
                                    const data = [...certificatesFields];
                                    data[index]['year'] = `${item}`;
                                    if (setCertificatesFields) {
                                        setCertificatesFields([...data]);
                                    }
                                } }), certificatesFields.length > 1 && index > 0 && (_jsx("div", { className: "mb-4 mt-16", children: _jsx(Button, { className: "md:text-md h-7 rounded bg-red-500 px-6 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:px-8", onClick: () => removeCertificateFields(index), label: "Delete" }) }))] })] }, index)))] }));
};
export default SellerCertificateFields;
