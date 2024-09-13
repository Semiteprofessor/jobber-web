import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { useCheckCurrentUserQuery } from './auth/services/auth.service';
import { useGetSellerByUsernameQuery } from './sellers/services/seller.service';
import { useGetCurrentBuyerByUsernameQuery } from './buyer/services/buyer.service';
import { addAuthUser } from './auth/reducers/auth.reducer';
import { addBuyer } from './buyer/reducers/buyer.reducer';
import { addSeller } from './sellers/reducers/seller.reducer';
import { applicationLogout, getDataFromLocalStorage, saveToSessionStorage } from 'src/shared/utils/util.service';
import { socket } from 'src/sockets/socket.service';
import Index from './index/Index';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import HomeHeader from 'src/shared/header/components/HomeHeader';
import Home from './home/components/Home';
const AppPage = () => {
    const authUser = useAppSelector((state) => state.authUser);
    const appLogout = useAppSelector((state) => state.logout);
    const showCategoryContainer = useAppSelector((state) => state.showCategoryContainer);
    const [tokenIsValid, setTokenIsValid] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { data: currentUserData, isError } = useCheckCurrentUserQuery(undefined, { skip: authUser.id === null });
    const { data: buyerData, isLoading: isBuyerLoading } = useGetCurrentBuyerByUsernameQuery(undefined, { skip: authUser.id === null });
    const { data: sellerData, isLoading: isSellerLoading } = useGetSellerByUsernameQuery(`${authUser.username}`, {
        skip: authUser.id === null
    });
    const checkUser = useCallback(async () => {
        try {
            if (currentUserData && currentUserData.user && !appLogout) {
                setTokenIsValid(true);
                dispatch(addAuthUser({ authInfo: currentUserData.user }));
                dispatch(addBuyer(buyerData?.buyer));
                dispatch(addSeller(sellerData?.seller));
                saveToSessionStorage(JSON.stringify(true), JSON.stringify(authUser.username));
                const becomeASeller = getDataFromLocalStorage('becomeASeller');
                if (becomeASeller) {
                    navigate('/seller_onboarding');
                }
                if (authUser.username !== null) {
                    socket.emit('loggedInUsers', authUser.username);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }, [currentUserData, navigate, dispatch, appLogout, authUser.username, buyerData, sellerData]);
    const logoutUser = useCallback(async () => {
        if ((!currentUserData && appLogout) || isError) {
            setTokenIsValid(false);
            applicationLogout(dispatch, navigate);
        }
    }, [currentUserData, dispatch, navigate, appLogout, isError]);
    useEffect(() => {
        checkUser();
        logoutUser();
    }, [checkUser, logoutUser]);
    if (authUser) {
        return !tokenIsValid && !authUser.id ? (_jsx(Index, {})) : (_jsx(_Fragment, { children: isBuyerLoading && isSellerLoading ? (_jsx(CircularPageLoader, {})) : (_jsxs(_Fragment, { children: [_jsx(HomeHeader, { showCategoryContainer: showCategoryContainer }), _jsx(Home, {})] })) }));
    }
    else {
        return _jsx(Index, {});
    }
};
export default AppPage;
