import { useCallback, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { useCheckCurrentUserQuery } from './auth/services/auth.service';
import { useGetSellerByUsernameQuery } from './sellers/services/seller.service';
import { IReduxState } from 'src/store/store.interface';
import { useGetCurrentBuyerByUsernameQuery } from './buyer/services/buyer.service';
import { addAuthUser } from './auth/reducers/auth.reducer';
import { addBuyer } from './buyer/reducers/buyer.reducer';
import { addSeller } from './sellers/reducers/seller.reducer';
import { getDataFromLocalStorage, saveToSessionStorage } from 'src/shared/utils/util.service';
import { socket } from 'src/sockets/socket.service';
import Index from './index/Index';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';

const AppPage = () => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const appLogout = useAppSelector((state: IReduxState) => state.logout);
  const showCategoryContainer = useAppSelector((state: IReduxState) => state.showCategoryContainer);
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
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
    } catch (error) {
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
    return !tokenIsValid && !authUser.id ? <Index /> : <>{isBuyerLoading && isSellerLoading ? <CircularPageLoader /> : <>
    <HomeHeader show /></>}</>;
  }
  return <div>AppPage</div>;
};

export default AppPage;
