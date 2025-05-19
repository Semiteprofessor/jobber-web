import { ChangeEvent, FC, ReactElement, useState } from 'react';
import { useDeviceData, useMobileOrientation } from 'react-device-detect';
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Alert from 'src/shared/alert/Alert';
import Button from 'src/shared/button/Button';
import { updateCategoryContainer } from 'src/shared/header/reducers/category.reducer';
import { updateHeader } from 'src/shared/header/reducers/header.reducer';
import TextInput from 'src/shared/inputs/TextInput';
import { IModalBgProps } from 'src/shared/modals/interfaces/modal.interface';
import ModalBg from 'src/shared/modals/ModalBg';
import { IResponse } from 'src/shared/shared.interface';
import { saveToSessionStorage } from 'src/shared/utils/util.service';
import { useAppDispatch } from 'src/store/store';

import { useAuthSchema } from '../hooks/useAuthSchema';
import { ISignInPayload } from '../interfaces/auth.interface';
import { addAuthUser } from '../reducers/auth.reducer';
import { updateLogout } from '../reducers/logout.reducer';
import { loginUserSchema } from '../schemes/auth.schema';
import { useSignInMutation } from '../services/auth.service';

const LoginModal: FC<IModalBgProps> = ({ onClose, onToggle, onTogglePassword }): ReactElement => {
  const mobileOrientation = useMobileOrientation();
  const deviceData = useDeviceData(window.navigator.userAgent);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [passwordType, setPasswordType] = useState<string>('password');
  const [userInfo, setUserInfo] = useState<ISignInPayload>({
    username: '',
    password: '',
    browserName: deviceData.browser.name,
    deviceType: mobileOrientation.isLandscape ? 'browser' : 'mobile'
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [schemaValidation] = useAuthSchema({ schema: loginUserSchema, userInfo });
  const [signIn, { isLoading }] = useSignInMutation();

  const onLoginUser = async (): Promise<void> => {
    try {
      const isValid: boolean = await schemaValidation();
      if (isValid) {
        const result: IResponse = await signIn(userInfo).unwrap();
        if (result && (result.browserName || result.deviceType)) {
          navigate('/verify_otp');
        } else {
          setAlertMessage('');
          dispatch(addAuthUser({ authInfo: result.user }));
          dispatch(updateLogout(false));
          dispatch(updateHeader('home'));
          dispatch(updateCategoryContainer(true));
          saveToSessionStorage(JSON.stringify(true), JSON.stringify(result.user?.username));
        }
      }
    } catch (error) {
      setAlertMessage(error?.data.message);
    }
  };

  return (
    <ModalBg>
      <div className="relative top-[20%] mx-auto w-11/12 max-w-md rounded-lg bg-white md:w-2/3">
        <div className="relative px-5 py-5">
          <div className="mb-5 flex justify-between text-2xl font-bold text-gray-600">
            <h1 className="flex w-full justify-center">Sign In to Jobber</h1>
            <Button
              testId="closeModal"
              className="cursor-pointer rounded text-gray-400 hover:text-gray-600"
              role="button"
              label={<FaTimes className="icon icon-tabler icon-tabler-x" />}
              onClick={onClose}
            />
          </div>
          {alertMessage && <Alert />}
        </div>
      </div>
    </ModalBg>
  );
};

export default LoginModal;
