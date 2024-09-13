import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { AUTH_FETCH_STATUS } from '../interfaces/auth.interface';
import { useAuthSchema } from 'src/features/auth/hooks/useAuthSchema';
import { resetPasswordSchema } from '../schemes/auth.schema';
import { useSearchParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../services/auth.service';
import Header from 'src/shared/header/components/Header';
import Alert from 'src/shared/alert/Alert';
import TextInput from 'src/shared/inputs/TextInput';
import Button from 'src/shared/button/Button';
const ResetPassword = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [userInfo, setUserInfo] = useState({
        password: '',
        confirmPassword: ''
    });
    const [status, setStatus] = useState(AUTH_FETCH_STATUS.IDLE);
    const [schemaValidation] = useAuthSchema({ schema: resetPasswordSchema, userInfo });
    const [searchParams] = useSearchParams({});
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const onResetPassword = async (event) => {
        event.preventDefault();
        try {
            const isValid = await schemaValidation();
            if (isValid) {
                const result = await resetPassword({
                    password: userInfo.password,
                    confirmPassword: userInfo.confirmPassword,
                    token: `${searchParams.get('token')}`
                }).unwrap();
                setAlertMessage(`${result.message}`);
                setStatus(AUTH_FETCH_STATUS.SUCCESS);
                setUserInfo({ password: '', confirmPassword: '' });
            }
        }
        catch (error) {
            setStatus(AUTH_FETCH_STATUS.ERROR);
            setAlertMessage(error?.data.message);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Header, { navClass: "navbar peer-checked:navbar-active fixed z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none" }), _jsx("div", { className: "relative mt-24 mx-auto w-11/12 max-w-md rounded-lg bg-white md:w-2/3", children: _jsx("div", { children: _jsxs("h2", { children: [alertMessage && _jsx(Alert, { type: status, message: alertMessage }), _jsxs("form", { className: "mt-4 space-y-4 md:space-y-5 lg:mt-5", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "text-sm font-bold leading-tight tracking-normal text-gray-800", children: "Password" }), _jsx(TextInput, { id: "password", name: "password", type: "password", value: userInfo.password, className: "flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none", placeholder: "Enter password", onChange: (event) => {
                                                    setUserInfo({ ...userInfo, password: event.target.value });
                                                } })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "text-sm font-bold leading-tight tracking-normal text-gray-800", children: "Confirm Password" }), _jsx(TextInput, { id: "confirmPassword", name: "confirmPassword", type: "password", value: userInfo.confirmPassword, className: "flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none", placeholder: "Enter confirm password", onChange: (event) => {
                                                    setUserInfo({ ...userInfo, confirmPassword: event.target.value });
                                                } })] }), _jsx(Button, { disabled: !userInfo.password || !userInfo.confirmPassword, className: `text-md block w-full cursor-pointer rounded bg-sky-500 px-8 py-2 text-center font-bold text-white hover:bg-sky-400 focus:outline-none ${!userInfo.password || !userInfo.confirmPassword ? 'cursor-not-allowed' : 'cursor-pointer'}`, label: `${isLoading ? 'RESET PASSWORD IN PROGRESS...' : 'RESET PASSWORD'}`, onClick: onResetPassword })] })] }) }) })] }));
};
export default ResetPassword;
