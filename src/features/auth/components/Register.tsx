import { ChangeEvent, FC, ReactElement, useRef, useState } from 'react';
import { useDeviceData, useMobileOrientation } from 'react-device-detect';
import { FaCamera, FaChevronLeft, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import Alert from 'src/shared/alert/Alert';
import Button from 'src/shared/button/Button';
import Dropdown from 'src/shared/dropdown/Dropdown';
import { updateCategoryContainer } from 'src/shared/header/reducers/category.reducer';
import { updateHeader } from 'src/shared/header/reducers/header.reducer';
import TextInput from 'src/shared/inputs/TextInput';
import { IModalBgProps } from 'src/shared/modals/interfaces/modal.interface';
import ModalBg from 'src/shared/modals/ModalBg';
import { IResponse } from 'src/shared/shared.interface';
import { checkImage, readAsBase64 } from 'src/shared/utils/image-utils.service';
import { countriesList, saveToSessionStorage } from 'src/shared/utils/utils.service';
import { useAppDispatch } from 'src/store/store';

import { useAuthSchema } from '../hooks/useAuthSchema';
import { ISignUpPayload } from '../interfaces/auth.interface';
import { addAuthUser } from '../reducers/auth.reducer';
import { updateLogout } from '../reducers/logout.reducer';
import { registerUserSchema } from '../schemes/auth.schema';
import { useSignUpMutation } from '../services/auth.service';

const RegisterModal: FC<IModalBgProps> = ({ onClose, onToggle }): ReactElement => {
  const mobileOrientation = useMobileOrientation();
  const deviceData = useDeviceData(window.navigator.userAgent);
  const [step, setStep] = useState<number>(1);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [country, setCountry] = useState<string>('Select Country');
  const [passwordType, setPasswordType] = useState<string>('password');
  const [profileImage, setProfileImage] = useState<string>('https://placehold.co/330x220?text=Profile+Image');
  const [showImageSelect, setShowImageSelect] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<ISignUpPayload>({
    username: '',
    password: '',
    email: '',
    country: '',
    profilePicture: '',
    browserName: deviceData.browser.name,
    deviceType: mobileOrientation.isLandscape ? 'browser' : 'mobile'
  });
  return <div className="font-bold">RegisterModal</div>;
};

export default RegisterModal;
