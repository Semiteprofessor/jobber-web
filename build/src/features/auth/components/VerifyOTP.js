import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { lazy, useState } from 'react';
import { useDeviceData, useMobileOrientation } from 'react-device-detect';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { addBuyer } from 'src/features/buyer/reducers/buyer.reducer';
import { buyerApi } from 'src/features/buyer/services/buyer.service';
import Home from 'src/features/home/components/Home';
import { addSeller } from 'src/features/sellers/reducers/seller.reducer';
import { sellerApi } from 'src/features/sellers/services/seller.service';
import Button from 'src/shared/button/Button';
import HomeHeader from 'src/shared/header/components/HomeHeader';
import { updateCategoryContainer } from 'src/shared/header/reducers/category.reducer';
import { updateHeader } from 'src/shared/header/reducers/header.reducer';
import TextInput from 'src/shared/inputs/TextInput';
import { saveToSessionStorage, showErrorToast } from 'src/shared/utils/util.service';
import { socket } from 'src/sockets/socket.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { addAuthUser } from '../reducers/auth.reducer';
import { updateLogout } from '../reducers/logout.reducer';
import { useVerifyOTPMutation } from '../services/auth.service';
const IndexHeader = lazy(() => import('src/shared/header/components/Header'));
const VerifyOTP = () => {
    const authUser = useAppSelector((state) => state.authUser);
    const showCategoryContainer = useAppSelector((state) => state.showCategoryContainer);
    const mobileOrientation = useMobileOrientation();
    const deviceData = useDeviceData(window.navigator.userAgent);
    const [otp, setOTP] = useState('');
    const [hasLoaded, setHasLoaded] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
    const onVerifyOTP = async () => {
        try {
            const data = {
                otp,
                browserName: deviceData.browser.name,
                deviceType: mobileOrientation.isLandscape ? 'browser' : 'mobile'
            };
            const result = await verifyOTP(data).unwrap();
            dispatch(addAuthUser({ authInfo: result.user }));
            const buyerResponse = await dispatch(buyerApi.endpoints.getCurrentBuyerByUsername.initiate());
            dispatch(addBuyer(buyerResponse.data?.buyer));
            const sellerResponse = await dispatch(sellerApi.endpoints.getSellerByUsername.initiate(`${result.user?.username}`));
            dispatch(addSeller(sellerResponse.data?.seller));
            dispatch(updateLogout(false));
            dispatch(updateHeader('home'));
            dispatch(updateCategoryContainer(true));
            saveToSessionStorage(JSON.stringify(true), JSON.stringify(result.user?.username));
            socket.emit('loggedInUsers', `${result?.user?.username}`);
            setHasLoaded(true);
            navigate('/');
        }
        catch (error) {
            setHasLoaded(false);
            showErrorToast(error?.data?.message ?? 'Error verifying OTP');
        }
    };
    const renderVerifyOTP = () => {
        return (_jsxs(_Fragment, { children: [_jsx(IndexHeader, { navClass: "navbar peer-checked:navbar-active fixed z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none" }), _jsxs("div", { className: "container mx-auto flex flex-col items-center justify-center px-6 py-8 mt-32 lg:py-0", children: [_jsx("div", { className: "md:w-[30%] font-bold border-b pb-2 sm:w-[60%]", children: "Authentication" }), _jsxs("div", { className: "md:w-[30%] flex flex-col justify-center sm:w-[60%]", children: [_jsx("span", { className: "flex self-center rounded-full w-10 h-10 shrink-0 grow-0 p-3 m-5 border border-gray-300", children: _jsx(FaEnvelope, {}) }), _jsxs("p", { className: "text-center mb-3", children: ["Check your inbox, we've sent you a code which expires in ", _jsx("span", { className: "font-bold", children: "10 minutes" }), "."] }), _jsxs("div", { className: "relative mb-3", children: [_jsx("div", { className: "absolute left-0 flex h-full cursor-pointer items-center pl-3 text-gray-600", children: _jsx(FaLock, {}) }), _jsx(TextInput, { id: "otp", name: "otp", type: "number", value: otp, className: "flex h-10 w-full pl-9 items-center rounded border border-gray-300 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none", placeholder: "6-Digit Code", onChange: (event) => {
                                                setOTP(event.target.value);
                                            } })] }), _jsx("div", { className: "flex w-full items-center justify-center", children: _jsx(Button, { disabled: !otp, className: `text-md block w-full cursor-pointer rounded bg-sky-500 px-8 py-2 text-center font-bold text-white hover:bg-sky-400 focus:outline-none ${!otp ? 'cursor-not-allowed' : 'cursor-pointer'}`, label: `${isLoading ? 'VERIFICATION IN PROGRESS...' : 'VERIFY'}`, onClick: onVerifyOTP }) })] })] })] }));
    };
    if (authUser) {
        return !hasLoaded && !authUser.id ? (renderVerifyOTP()) : (_jsxs(_Fragment, { children: [_jsx(HomeHeader, { showCategoryContainer: showCategoryContainer }), _jsx(Home, {})] }));
    }
    else {
        return renderVerifyOTP();
    }
};
export default VerifyOTP;
