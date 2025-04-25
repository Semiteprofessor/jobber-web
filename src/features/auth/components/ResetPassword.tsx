import { FC, FormEvent, ReactElement, useState } from 'react';
import { AUTH_FETCH_STATUS, IResetPassword } from '../interfaces/auth.interface';
import { useAuthSchema } from 'src/shared/hooks/useAuthSchema';
import { resetPasswordSchema } from '../schemes/auth.schema';
import { useSearchParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../services/auth.service';
import { IResponse } from 'src/shared/shared.interface';

const ResetPassword: FC = (): ReactElement => {
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [userInfo, setUserInfo] = useState<IResetPassword>({
    password: '',
    confirmPassword: ''
  });
  const [status, setStatus] = useState<string>(AUTH_FETCH_STATUS.IDLE);
  const [schemaValidation] = useAuthSchema({ schema: resetPasswordSchema, userInfo });
  const [searchParams] = useSearchParams({});
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onResetPassword = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const isValid: boolean = await schemaValidation();
      if (isValid) {
        const result: IResponse = await resetPassword({
          password: userInfo.password,
          confirmPassword: userInfo.confirmPassword,
          token: `${searchParams.get('token')}`
        }).unwrap();
        setAlertMessage(`${result.message}`);
        setStatus(AUTH_FETCH_STATUS.SUCCESS);
        setUserInfo({ password: '', confirmPassword: '' });
      }
    } catch (error) {
      setStatus(AUTH_FETCH_STATUS.ERROR);
      setAlertMessage(error?.data.message);
    }
  };
  return <div>ResetPassword</div>;
};

export default ResetPassword;
