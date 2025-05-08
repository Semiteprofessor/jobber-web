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
import { saveToSessionStorage, showErrorToast } from 'src/shared/utils/utils.service';
import { socket } from 'src/sockets/socket.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';

import { addAuthUser } from '../reducers/auth.reducer';
import { updateLogout } from '../reducers/logout.reducer';
import { useVerifyOTPMutation } from '../services/auth.service';

const IndexHeader: LazyExoticComponent<FC<IHeader>> = lazy(() => import('src/shared/header/components/Header'));
