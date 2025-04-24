import { ChangeEvent, FC, FormEvent, ReactElement, useState } from 'react';
import { AUTH_FETCH_STATUS, IResetPassword } from '../interfaces/auth.interface';
import { useAuthSchema } from 'src/shared/hooks/useAuthSchema';
import { resetPasswordSchema } from '../schemes/auth.schema';
import { useSearchParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../services/auth.service';
import { IResponse } from 'src/shared/shared.interface';
import Header from 'src/shared/header/components/Header';
import Alert from 'src/shared/alert/Alert';
import TextInput from 'src/shared/inputs/TextInput';

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
  return (
    <>
      <Header navClass="navbar peer-checked:navbar-active fixed z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none" />
      <div className="relative mt-24 mx-auto w-11/12 max-w-md rounded-lg bg-white md:w-2/3">
        <div>
          <h2>
            {alertMessage && <Alert type={status} message={alertMessage} />}
            <form className="mt-4 space-y-4 md:space-y-5 lg:mt-5">
              <div>
                <label htmlFor="password" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                  Password
                </label>
                <TextInput
                  id="password"
                  name="password"
                  type="password"
                  value={userInfo.password}
                  className="flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                  placeholder="Enter password"
                  onChange={(event: ChangeEvent) => {
                    setUserInfo({ ...userInfo, password: (event.target as HTMLInputElement).value });
                  }}
                />
              </div>
            </form>
          </h2>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
