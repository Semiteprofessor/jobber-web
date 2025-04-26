import { FC, ReactElement, useState } from 'react';
import { AUTH_FETCH_STATUS, IResetPassword } from '../interfaces/auth.interface';
import { useAuthSchema } from '../hooks/useAuthSchema';

const ResetPassword: FC = (): ReactElement => {
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [userInfo, setUserInfo] = useState<IResetPassword>({
    password: '',
    confirmPassword: ''
  });
  const [status, setStatus] = useState<string>(AUTH_FETCH_STATUS.IDLE);
  const [schemaValidation] = useAuthSchema({});
  return <div>ResetPassword</div>;
};

export default ResetPassword;
