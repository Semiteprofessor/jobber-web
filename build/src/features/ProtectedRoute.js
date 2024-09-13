import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import HomeHeader from 'src/shared/header/components/HomeHeader';
import { applicationLogout, saveToSessionStorage } from 'src/shared/utils/util.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { addAuthUser } from './auth/reducers/auth.reducer';
import { useCheckCurrentUserQuery } from './auth/services/auth.service';
const ProtectedRoute = ({ children }) => {
    const authUser = useAppSelector((state) => state.authUser);
    const showCategoryContainer = useAppSelector((state) => state.showCategoryContainer);
    const header = useAppSelector((state) => state.header);
    const [tokenIsValid, setTokenIsValid] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { data, isError } = useCheckCurrentUserQuery();
    const checkUser = useCallback(async () => {
        if (data && data.user) {
            setTokenIsValid(true);
            dispatch(addAuthUser({ authInfo: data.user }));
            saveToSessionStorage(JSON.stringify(true), JSON.stringify(authUser.username));
        }
        if (isError) {
            setTokenIsValid(false);
            applicationLogout(dispatch, navigate);
        }
    }, [data, dispatch, navigate, isError, authUser.username]);
    useEffect(() => {
        checkUser();
    }, [checkUser]);
    if ((data && data.user) || authUser) {
        if (tokenIsValid) {
            return (_jsxs(_Fragment, { children: [header && header === 'home' && _jsx(HomeHeader, { showCategoryContainer: showCategoryContainer }), children] }));
        }
        else {
            return _jsx(_Fragment, {});
        }
    }
    else {
        return _jsx(_Fragment, { children: _jsx(Navigate, { to: "/" }) });
    }
};
export default ProtectedRoute;
