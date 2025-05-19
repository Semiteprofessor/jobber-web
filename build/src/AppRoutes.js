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
import CurrentSellerProfile from './features/sellers/components/profile/CurrentSellerProfile';
import SellerProfile from './features/sellers/components/profile/SellerProfile';
import Seller from './features/sellers/components/dashboard/Seller';
import SellerDashboard from './features/sellers/components/dashboard/SellerDashboard';
import ManageOrders from './features/sellers/components/dashboard/ManageOrders';
import ManageEarnings from './features/sellers/components/dashboard/ManageEarnings';
import AddGig from './features/gigs/components/gig/AddGig';
import EditGig from './features/gigs/components/gig/EditGig';
import GigView from './features/gigs/components/view/GigView';
import Gigs from './features/gigs/components/gigs/Gigs';
import Chat from './features/chat/components/Chat';
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
        },
        {
            path: '/seller_profile/:username/:sellerId/view',
            element: (_jsx(Suspense, { children: _jsx(ProtectedRoute, { children: _jsx(Layout, { backgroundColor: "#ffffff", children: _jsx(SellerProfile, {}) }) }) }))
        },
        {
            path: '/:username/:sellerId',
            element: (_jsx(Suspense, { children: _jsx(ProtectedRoute, { children: _jsx(Layout, { backgroundColor: "#ffffff", children: _jsx(Seller, {}) }) }) })),
            children: [
                {
                    path: 'seller_dashboard',
                    element: _jsx(SellerDashboard, {})
                },
                {
                    path: 'manage_orders',
                    element: _jsx(ManageOrders, {})
                },
                {
                    path: 'manage_earnings',
                    element: _jsx(ManageEarnings, {})
                }
            ]
        },
        {
            path: '/manage_gigs/new/:sellerId',
            element: (_jsx(Suspense, { children: _jsx(ProtectedRoute, { children: _jsx(Layout, { backgroundColor: "#ffffff", children: _jsx(AddGig, {}) }) }) }))
        },
        {
            path: '/manage_gigs/edit/:gigId',
            element: (_jsx(Suspense, { children: _jsx(ProtectedRoute, { children: _jsx(Layout, { backgroundColor: "#ffffff", children: _jsx(EditGig, {}) }) }) }))
        },
        {
            path: '/gig/:username/:title/:sellerId/:gigId/view',
            element: (_jsx(Suspense, { children: _jsx(ProtectedRoute, { children: _jsx(Layout, { backgroundColor: "#ffffff", children: _jsx(GigView, {}) }) }) }))
        },
        {
            path: '/categories/:category',
            element: (_jsx(Suspense, { children: _jsx(ProtectedRoute, { children: _jsx(Layout, { backgroundColor: "#ffffff", children: _jsx(Gigs, { type: "categories" }) }) }) }))
        },
        {
            path: '/categories/:category',
            element: (_jsx(Suspense, { children: _jsx(ProtectedRoute, { children: _jsx(Layout, { backgroundColor: "#ffffff", children: _jsx(Gigs, { type: "categories" }) }) }) }))
        },
        {
            path: '/search/gigs',
            element: (_jsx(Suspense, { children: _jsx(ProtectedRoute, { children: _jsx(Layout, { backgroundColor: "#ffffff", children: _jsx(Gigs, { type: "search" }) }) }) }))
        },
        {
            path: '/inbox',
            element: (_jsx(Suspense, { children: _jsx(Layout, { backgroundColor: "#ffffff", children: _jsx(Chat, {}) }) }))
        },
        {
            path: '/inbox/:username/:conversationId',
            element: (_jsx(Suspense, { children: _jsx(ProtectedRoute, { children: _jsx(Layout, { backgroundColor: "#ffffff", children: _jsx(Chat, {}) }) }) }))
        },
        // {
        //   path: '/gig/checkout/:gigId',
        //   element: (
        //     <Suspense>
        //       <ProtectedRoute>
        //         <Layout backgroundColor="#ffffff">
        //           <Checkout />
        //         </Layout>
        //       </ProtectedRoute>
        //     </Suspense>
        //   )
        // },
        // {
        //   path: '/gig/order/requirement/:gigId',
        //   element: (
        //     <Suspense>
        //       <ProtectedRoute>
        //         <Layout backgroundColor="#ffffff">
        //           <Requirement />
        //         </Layout>
        //       </ProtectedRoute>
        //     </Suspense>
        //   )
        // },
        // {
        //   path: '/orders/:orderId/activities',
        //   element: (
        //     <Suspense>
        //       <ProtectedRoute>
        //         <Layout backgroundColor="#f5f5f5">
        //           <Order />
        //         </Layout>
        //       </ProtectedRoute>
        //     </Suspense>
        //   )
        // },
        // {
        //   path: '/:username/edit',
        //   element: (
        //     <Suspense>
        //       <ProtectedRoute>
        //         <Layout backgroundColor="#f5f5f5">
        //           <Settings />
        //         </Layout>
        //       </ProtectedRoute>
        //     </Suspense>
        //   )
        // },
        // {
        //   path: '*',
        //   element: (
        //     <Suspense>
        //       <Error />
        //     </Suspense>
        //   )
        // }
    ];
    return useRoutes(routes);
};
export default AppRouter;
