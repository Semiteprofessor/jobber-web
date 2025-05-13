import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/store/store";
import { useCheckCurrentUserQuery } from "./auth/services/auth.service";
import { useGetSellerByUsernameQuery } from "./sellers/services/seller.service";
import { IReduxState } from "src/store/store.interface";


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
  return <div>AppPage</div>;
};

export default AppPage;
