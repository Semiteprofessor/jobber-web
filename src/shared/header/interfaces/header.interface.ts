import { Dispatch, SetStateAction } from "react";
import { IAuthUser } from "src/features/auth/interfaces/auth.interface";
import { IBuyerDocument } from "src/features/buyer/interfaces/buyer.interface";
import { ISellerDocument } from "src/features/sellers/interfaces/seller.interface";

export interface IReduxHeader {
  type: string;
  payload: string;
}

export interface IReduxShowCategory {
  type: string;
  payload: boolean;
}

export interface IReduxNotification {
  type?: string;
  payload: INotification;
}

export interface INotification {
  hasUnreadMessage?: boolean;
  hasUnreadNotification?: boolean;
}
