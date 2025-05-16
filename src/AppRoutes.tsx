import { FC, ReactNode, Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import ResetPassword from './features/auth/components/ResetPassword';
import AppPage from './features/AppPage';
import ConfirmEmail from './features/auth/components/ConfirmEmail';
import VerifyOTP from './features/auth/components/VerifyOTP';
import GigsIndexDisplay from './features/index/gig-tabs/GigsIndexDisplay';
import GigInfoDisplay from './features/index/gig-tabs/GigInfoDisplay';
import Home from './features/home/components/Home';
import ProtectedRoute from './features/ProtectedRoute';
import AddSeller from './features/sellers/components/add/AddSeller';

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
    },
    {
      path: 'verify_otp',
      element: (
        <Suspense>
          <VerifyOTP />
        </Suspense>
      )
    },
    {
      path: '/search/categories/:category',
      element: (
        <Suspense>
          <Layout backgroundColor="#ffffff">
            <GigsIndexDisplay type="categories" />
          </Layout>
        </Suspense>
      )
    },
    {
      path: '/gigs/search',
      element: (
        <Suspense>
          <Layout backgroundColor="#ffffff">
            <GigsIndexDisplay type="search" />
          </Layout>
        </Suspense>
      )
    },
    {
      path: '/gig/:gigId/:title',
      element: (
        <Suspense>
          <Layout backgroundColor="#ffffff">
            <GigInfoDisplay />
          </Layout>
        </Suspense>
      )
    },
    {
      path: '/',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <Home />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/users/:username/:buyerId/orders',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <BuyerDashboard />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    },
    {
      path: '/seller_onboarding',
      element: (
        <Suspense>
          <ProtectedRoute>
            <Layout backgroundColor="#ffffff">
              <AddSeller />
            </Layout>
          </ProtectedRoute>
        </Suspense>
      )
    }
  ];
  return useRoutes(routes);
};

export default AppRouter;
