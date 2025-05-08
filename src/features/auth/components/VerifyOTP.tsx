import { Action } from '@reduxjs/toolkit';
import { ChangeEvent, FC, lazy, LazyExoticComponent, ReactElement, useState } from 'react';
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
import { IHeader } from 'src/shared/header/interfaces/header.interface';
import { updateCategoryContainer } from 'src/shared/header/reducers/category.reducer';
import { updateHeader } from 'src/shared/header/reducers/header.reducer';
import TextInput from 'src/shared/inputs/TextInput';
import { IResponse } from 'src/shared/shared.interface';
import { saveToSessionStorage, showErrorToast } from 'src/shared/utils/util.service';
import { socket } from 'src/sockets/socket.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

import { addAuthUser } from '../reducers/auth.reducer';
import { updateLogout } from '../reducers/logout.reducer';
import { useVerifyOTPMutation } from '../services/auth.service';

const IndexHeader: LazyExoticComponent<FC<IHeader>> = lazy(() => import('src/shared/header/components/Header'));

const VerifyOTP: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const showCategoryContainer = useAppSelector((state: IReduxState) => state.showCategoryContainer);
  const mobileOrientation = useMobileOrientation();
  const deviceData = useDeviceData(window.navigator.userAgent);
  const [otp, setOTP] = useState<string>('');
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();

  const onVerifyOTP = async (): Promise<void> => {
    try {
      const data = {
        otp,
        browserName: deviceData.browser.name,
        deviceType: mobileOrientation.isLandscape ? 'browser' : 'mobile'
      };
      const result: IResponse = await verifyOTP(data).unwrap();
      dispatch(addAuthUser({ authInfo: result.user }));
      const buyerResponse = await dispatch(buyerApi.endpoints.getCurrentBuyerByUsername.initiate() as unknown as Action);
      dispatch(addBuyer(buyerResponse.data?.buyer));
      const sellerResponse = await dispatch(
        sellerApi.endpoints.getSellerByUsername.initiate(`${result.user?.username}`) as unknown as Action
      );
      dispatch(addSeller(sellerResponse.data?.seller));
      dispatch(updateLogout(false));
      dispatch(updateHeader('home'));
      dispatch(updateCategoryContainer(true));
      saveToSessionStorage(JSON.stringify(true), JSON.stringify(result.user?.username));
      socket.emit('loggedInUsers', `${result?.user?.username}`);
      setHasLoaded(true);
      navigate('/');
    } catch (error) {
      setHasLoaded(false);
      showErrorToast(error?.data?.message ?? 'Error verifying OTP');
    }
  };

  return (
    <>
      <IndexHeader navClass="navbar peer-checked:navbar-active fixed z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none" />
      <div className="container mx-auto flex flex-col items-center justify-center px-6 py-8 mt-32 lg:py-0">
        <div className="md:w-[30%] font-bold border-b pb-2 sm:w-[60%]">Authentication</div>
        <div className="md:w-[30%] flex flex-col justify-center sm:w-[60%]"></div>
      </div>
    </>
  );
};

export default VerifyOTP;
