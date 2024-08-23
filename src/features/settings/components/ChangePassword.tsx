import { ChangeEvent, FC, ReactElement, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Alert from 'src/shared/alert/Alert';
import Button from 'src/shared/button/Button';
import TextInput from 'src/shared/inputs/TextInput';
import { PASSWORD_TYPE } from 'src/shared/utils/static-data';
import { applicationLogout, isFetchBaseQueryError, showErrorToast } from 'src/shared/utils/utils.service';
import { useAppDispatch } from 'src/store/store';

import { useChangePasswordMutation } from '../services/settings.service';

interface IPasswordItem {
  currentPassword: string;
  newPassword: string;
  passwordType: string;
}

const ChangePassword: FC = (): ReactElement => {
  const [passwordItem, setPasswordItem] = useState<IPasswordItem>({
    currentPassword: '',
    newPassword: '',
    passwordType: PASSWORD_TYPE.PASSWORD
  });
  const [alertMessage, setAlertMessage] = useState<string>('');
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const [changePassword] = useChangePasswordMutation();

  const updatePassword = async (): Promise<void> => {
    try {
      await changePassword({ currentPassword: passwordItem.currentPassword, newPassword: passwordItem.newPassword }).unwrap();
      setAlertMessage('Password updated successfully.');
      setTimeout(() => {
        applicationLogout(dispatch, navigate);
      }, 3000);
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        setAlertMessage(error?.data?.message);
        showErrorToast(error?.data?.message);
      }
    }
  };

  return (
    <div>
      {alertMessage && <Alert type="error" message={alertMessage} />}
      <>
        <label htmlFor="currentPassword" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
          Current Password
        </label>
        <TextInput
          id="currentPassword"
          name="currentPassword"
          type="password"
          value={passwordItem.currentPassword}
          className="mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
          placeholder="Enter current password"
          onChange={(event: ChangeEvent) => {
            setPasswordItem({ ...passwordItem, currentPassword: (event.target as HTMLInputElement).value });
          }}
        />
      </></div>;
};

export default ChangePassword;
