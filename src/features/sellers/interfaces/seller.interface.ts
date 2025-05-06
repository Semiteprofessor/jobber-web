import { Dispatch, SetStateAction } from "react";
import { ISellerGig } from "src/features/gigs/interfaces/gig.interface";
import { IOrderDocument } from "src/features/order/interfaces/order.interface";
import { IRatingCategories } from "src/features/order/interfaces/review.interface";

export type SellerContextType = {
  gigs: ISellerGig[];
  pausedGigs: ISellerGig[];
  orders: IOrderDocument[];
  seller: ISellerDocument | null;
};

export interface ILanguage {
  [key: string]: string | number | undefined;
  _id?: string;
  language: string;
  level: string;
}

export interface IExperience {
  [key: string]: string | number | boolean | undefined;
  _id?: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  currentlyWorkingHere: boolean | undefined;
}
