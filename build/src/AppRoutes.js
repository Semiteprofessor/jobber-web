import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import ResetPassword from './features/auth/components/ResetPassword';
import AppPage from './features/AppPage';
import ConfirmEmail from './features/auth/components/ConfirmEmail';
import VerifyOTP from './features/auth/components/VerifyOTP';
import GigsIndexDisplay from './features/index/gig-tabs/GigsIndexDisplay';
import GigInfoDisplay from './features/index/gig-tabs/GigInfoDisplay';
import Home from './features/home/components/Home';
import ProtectedRoute from './features/ProtectedRoute';
import AddSeller from './features/sellers/components/add/AddSeller';
import BuyerDashboard from './features/buyer/components/Dashboard';
const Layout = ({ backgroundColor = '#fff', children }) => (_jsx("div", { style: { backgroundColor }, className: "flex flex-grow", children: children }));
const AppRouter = () => {
    const routes = [
        {
            path: '/',
            element: _jsx(AppPage, {})
        },
        {
            path: 'reset_password',
            element: (_jsx(Suspense, { children: _jsx(ResetPassword, {}) }))
        },
        {
            path: 'confirm_email',
            element: (_jsx(Suspense, { children: _jsx(ConfirmEmail, {}) }))
        },
        {
            path: 'verify_otp',
            element: (_jsx(Suspense, { children: _jsx(VerifyOTP, {}) }))
        },
        {
            path: '/search/categories/:category',
            element: (_jsx(Suspense, { children: _jsx(Layout, { backgroundColor: "#ffffff", children: _jsx(GigsIndexDisplay, { type: "categories" }) }) }))
        },
        {
            path: '/gigs/search',
            element: (_jsx(Suspense, { children: _jsx(Layout, { backgroundColor: "#ffffff", children: _jsx(GigsIndexDisplay, { type: "search" }) }) }))
        },
        {
            path: '/gig/:gigId/:title',
            element: (_jsx(Suspense, { children: _jsx(Layout, { backgroundColor: "#ffffff", children: _jsx(GigInfoDisplay, {}) }) }))
        },
        {
            path: '/',
            element: (_jsx(Suspense, { children: _jsx(ProtectedRoute, { children: _jsx(Layout, { backgroundColor: "#ffffff", children: _jsx(Home, {}) }) }) }))
        },
        {
            path: '/users/:username/:buyerId/orders',
            element: (_jsx(Suspense, { children: _jsx(ProtectedRoute, { children: _jsx(Layout, { backgroundColor: "#ffffff", children: _jsx(BuyerDashboard, {}) }) }) }))
        },
        {
            path: '/seller_onboarding',
            element: (_jsx(Suspense, { children: _jsx(ProtectedRoute, { children: _jsx(Layout, { backgroundColor: "#ffffff", children: _jsx(AddSeller, {}) }) }) }))
        },
        {
            path: '/seller_profile/:username/:sellerId/edit',
            element: (_jsx(Suspense, { children: _jsx(ProtectedRoute, { children: _jsx(Layout, { backgroundColor: "#ffffff", children: _jsx(CurrentSellerProfile, {}) }) }) }))
        }
    ];
    return useRoutes(routes);
};
export default AppRouter;
