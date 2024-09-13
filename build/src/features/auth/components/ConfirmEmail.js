import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from 'src/store/store';
import { useVerifyEmailMutation } from '../services/auth.service';
import { AUTH_FETCH_STATUS } from '../interfaces/auth.interface';
import { addAuthUser } from '../reducers/auth.reducer';
import Alert from 'src/shared/alert/Alert';
const ConfirmEmail = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [status, setStatus] = useState(AUTH_FETCH_STATUS.IDLE);
    const [searchParams] = useSearchParams({});
    const dispatch = useAppDispatch();
    const [verifyEmail] = useVerifyEmailMutation();
    const onVerifyEmail = useCallback(async () => {
        try {
            const result = await verifyEmail(`${searchParams.get('v_token')}`).unwrap();
            setAlertMessage('Email verified successfully.');
            setStatus(AUTH_FETCH_STATUS.SUCCESS);
            dispatch(addAuthUser({ authInfo: result.user }));
        }
        catch (error) {
            setStatus(AUTH_FETCH_STATUS.ERROR);
            setAlertMessage(error?.data.message);
        }
    }, [dispatch, searchParams, verifyEmail]);
    useEffect(() => {
        onVerifyEmail();
    }, [onVerifyEmail]);
    return (_jsxs("div", { className: "container mx-auto flex flex-col items-center justify-center px-6 py-8 mt-20 lg:py-0", children: [_jsx("div", { className: "w-[30%]", children: _jsx(Alert, { type: status, message: alertMessage }) }), _jsx(Link, { to: "/", className: "rounded bg-sky-500 px-6 py-3 mt-5 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-4 md:py-2 md:text-base", children: "Continue to Home" })] }));
};
export default ConfirmEmail;
