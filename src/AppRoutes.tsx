import { FC, ReactNode, Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import ResetPassword from './features/auth/components/ResetPassword';
import AppPage from './features/AppPage';

const Layout = ({ backgroundColor = '#fff', children }: { backgroundColor: string; children: ReactNode }): JSX.Element => (
  <div style={{ backgroundColor }} className="flex flex-grow">
    {children}
  </div>
);

const AppRouter: FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <AppPage />
    },
    {
      path: 'reset_password',
      element: (
        <Suspense>
          <ResetPassword />
        </Suspense>
      )
    },
    {
      path: 'confirm_email',
      element: (
        <Suspense>
          <ConfirmEmail />
        </Suspense>
      )
    }
  ];
  return useRoutes(routes);
};

export default AppRouter;
