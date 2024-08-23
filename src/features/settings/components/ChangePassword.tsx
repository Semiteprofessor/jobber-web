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

const ChangePassword = () => {
  return <div>ChangePassword</div>;
};

export default ChangePassword;
