import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { useDeviceData, useMobileOrientation } from 'react-device-detect';
import { FaCamera, FaChevronLeft, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import Alert from 'src/shared/alert/Alert';
import Button from 'src/shared/button/Button';
import Dropdown from 'src/shared/dropdown/Dropdown';
import { updateCategoryContainer } from 'src/shared/header/reducers/category.reducer';
import { updateHeader } from 'src/shared/header/reducers/header.reducer';
import TextInput from 'src/shared/inputs/TextInput';
import ModalBg from 'src/shared/modals/ModalBg';
import { checkImage, readAsBase64 } from 'src/shared/utils/image-utils.service';
import { countriesList, saveToSessionStorage } from 'src/shared/utils/util.service';
import { useAppDispatch } from 'src/store/store';
import { useAuthSchema } from '../hooks/useAuthSchema';
import { addAuthUser } from '../reducers/auth.reducer';
import { updateLogout } from '../reducers/logout.reducer';
import { registerUserSchema } from '../schemes/auth.schema';
import { useSignUpMutation } from '../services/auth.service';
const RegisterModal = ({ onClose, onToggle }) => {
    const mobileOrientation = useMobileOrientation();
    const deviceData = useDeviceData(window.navigator.userAgent);
    const [step, setStep] = useState(1);
    const [alertMessage, setAlertMessage] = useState('');
    const [country, setCountry] = useState('Select Country');
    const [passwordType, setPasswordType] = useState('password');
    const [profileImage, setProfileImage] = useState('https://placehold.co/330x220?text=Profile+Image');
    const [showImageSelect, setShowImageSelect] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
        email: '',
        country: '',
        profilePicture: '',
        browserName: deviceData.browser.name,
        deviceType: mobileOrientation.isLandscape ? 'browser' : 'mobile'
    });
    const fileInputRef = useRef(null);
    const dispatch = useAppDispatch();
    const [schemaValidation] = useAuthSchema({ schema: registerUserSchema, userInfo });
    const [signUp, { isLoading }] = useSignUpMutation();
    const handleFileChange = async (event) => {
        const target = event.target;
        if (target.files) {
            const file = target.files[0];
            const isValid = checkImage(file, 'image');
            if (isValid) {
                const dataImage = await readAsBase64(file);
                setProfileImage(`${dataImage}`);
                setUserInfo({ ...userInfo, profilePicture: `${dataImage}` });
            }
            setShowImageSelect(false);
        }
    };
    const onRegisterUser = async () => {
        try {
            const isValid = await schemaValidation();
            if (isValid) {
                const result = await signUp(userInfo).unwrap();
                setAlertMessage('');
                dispatch(addAuthUser({ authInfo: result.user }));
                dispatch(updateLogout(false));
                dispatch(updateHeader('home'));
                dispatch(updateCategoryContainer(true));
                saveToSessionStorage(JSON.stringify(true), JSON.stringify(result.user?.username));
            }
        }
        catch (error) {
            setAlertMessage(error?.data.message);
        }
    };
    return (_jsx(ModalBg, { children: _jsxs("div", { className: "relative top-[10%] mx-auto w-11/12 max-w-md rounded bg-white md:w-2/3", children: [_jsx("div", { className: "relative px-5 py-5", children: _jsxs("div", { className: "flex justify-between text-2xl font-bold text-gray-600", children: [step > 1 && (_jsx(Button, { className: "cursor-pointer rounded text-gray-400 hover:text-gray-600", role: "button", onClick: () => setStep(step - 1), label: _jsx(FaChevronLeft, { className: "icon icon-tabler icon-tabler-x" }) })), _jsx("h1", { className: "flex w-full justify-center", children: "Join Jobber" }), _jsx(Button, { className: "cursor-pointer rounded text-gray-400 hover:text-gray-600", role: "button", onClick: onClose, label: _jsx(FaTimes, { className: "icon icon-tabler icon-tabler-x" }) })] }) }), _jsx("div", { className: "flex w-full items-center justify-center px-5 py-5", children: _jsxs("ol", { className: "flex w-full", children: [_jsx("li", { className: "flex w-full items-center text-white after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:border-sky-500 after:content-[''] dark:after:border-sky-500", children: _jsx("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500 font-bold dark:bg-sky-500 lg:h-12 lg:w-12", children: "1" }) }), _jsx("li", { className: "flex items-center", children: _jsx("span", { className: `flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white lg:h-12 lg:w-12 ${step === 2 ? 'bg-sky-500 dark:bg-sky-500' : 'bg-sky-300/50 dark:bg-sky-300/50'}`, children: "2" }) })] }) }), _jsx("div", { className: "px-5", children: alertMessage && _jsx(Alert, { type: "error", message: alertMessage }) }), step === 1 && (_jsxs("div", { className: "relative px-5 py-5", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "username", className: "text-sm font-bold leading-tight tracking-normal text-gray-800", children: "Username" }), _jsx(TextInput, { id: "username", name: "username", type: "text", value: userInfo.username, className: "mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none", placeholder: "Enter username", onChange: (event) => {
                                        setUserInfo({ ...userInfo, username: event.target.value });
                                    } })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "text-sm font-bold leading-tight tracking-normal text-gray-800", children: "Email" }), _jsx(TextInput, { id: "email", name: "email", type: "email", value: userInfo.email, className: "mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none", placeholder: "Enter email", onChange: (event) => {
                                        setUserInfo({ ...userInfo, email: event.target.value });
                                    } })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "text-sm font-bold leading-tight tracking-normal text-gray-800", children: "Password" }), _jsxs("div", { className: "relative mb-5 mt-2", children: [_jsx("div", { className: "absolute right-0 flex h-full cursor-pointer items-center pr-3 text-gray-600", children: passwordType === 'password' ? (_jsx(FaEyeSlash, { onClick: () => setPasswordType('text'), className: "icon icon-tabler icon-tabler-info-circle" })) : (_jsx(FaEye, { onClick: () => setPasswordType('password'), className: "icon icon-tabler icon-tabler-info-circle" })) }), _jsx(TextInput, { id: "password", name: "password", type: passwordType, value: userInfo.password, className: "flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none", placeholder: "Enter password", onChange: (event) => {
                                                setUserInfo({ ...userInfo, password: event.target.value });
                                            } })] })] }), _jsx(Button, { disabled: !userInfo.username || !userInfo.email || !userInfo.password, className: `text-md block w-full cursor-pointer rounded bg-sky-500 px-8 py-2 text-center font-bold text-white hover:bg-sky-400 focus:outline-none ${!userInfo.username || !userInfo.email || !userInfo.password ? 'cursor-not-allowed' : 'cursor-pointer'}`, label: "Continue", onClick: () => setStep(2) })] })), step === 2 && (_jsxs("div", { className: "relative px-5 py-5", children: [_jsxs("div", { className: "h-24", children: [_jsx("label", { htmlFor: "country", className: "text-sm font-bold leading-tight tracking-normal text-gray-800", children: "Country" }), _jsx("div", { id: "country", className: "relative mb-5 mt-2", children: _jsx(Dropdown, { text: country, maxHeight: "200", mainClassNames: "absolute bg-white z-50", showSearchInput: true, values: countriesList(), setValue: setCountry, onClick: (item) => {
                                            setCountry(item);
                                            setUserInfo({ ...userInfo, country: item });
                                        } }) })] }), _jsxs("div", { className: "relative", children: [_jsx("label", { htmlFor: "profilePicture", className: "text-sm font-bold leading-tight tracking-normal text-gray-800", children: "Profile Picture" }), _jsxs("div", { onMouseEnter: () => setShowImageSelect(true), onMouseLeave: () => setShowImageSelect(false), className: "relative mb-5 mt-2 w-[20%] cursor-pointer", children: [profileImage && (_jsx("img", { id: "profilePicture", src: profileImage, alt: "Profile Picture", className: "left-0 top-0 h-20 w-20 rounded-full bg-white object-cover" })), !profileImage && (_jsx("div", { className: "left-0 top-0 flex h-20 w-20 cursor-pointer justify-center rounded-full bg-[#dee1e7]" })), showImageSelect && (_jsx("div", { onClick: () => fileInputRef.current?.click(), className: "absolute left-0 top-0 flex h-20 w-20 cursor-pointer justify-center rounded-full bg-[#dee1e7]", children: _jsx(FaCamera, { className: "flex self-center" }) })), _jsx(TextInput, { name: "image", ref: fileInputRef, type: "file", style: { display: 'none' }, onClick: () => {
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = '';
                                                }
                                            }, onChange: handleFileChange })] })] }), _jsx(Button, { disabled: !userInfo.country || !userInfo.profilePicture, className: `text-md block w-full cursor-pointer rounded bg-sky-500 px-8 py-2 text-center font-bold text-white hover:bg-sky-400 focus:outline-none ${!userInfo.country || !userInfo.profilePicture ? 'cursor-not-allowed' : 'cursor-pointer'}`, label: `${isLoading ? 'SIGNUP IN PROGRESS...' : 'SIGNUP'}`, onClick: onRegisterUser })] })), _jsx("hr", {}), _jsx("div", { className: "px-5 py-4", children: _jsx("div", { className: "ml-2 flex w-full justify-center text-sm font-medium", children: _jsxs("div", { className: "flex justify-center", children: ["Already a memeber?", ' ', _jsx("p", { onClick: () => {
                                        if (onToggle) {
                                            onToggle(true);
                                        }
                                    }, className: "ml-2 flex cursor-pointer text-blue-600 hover:underline", children: "Sign In" })] }) }) })] }) }));
};
export default RegisterModal;
