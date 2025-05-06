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

export interface IEducation {
  [key: string]: string | number | undefined;
  _id?: string;
  country: string;
  university: string;
  title: string;
  major: string;
  year: string;
}

export interface ICertificate {
  [key: string]: string | number | undefined;
  _id?: string;
  name: string;
  from: string;
  year: number | string;
}

export interface IPersonalInfoData {
  [key: string]: string;
  fullName: string;
  profilePicture: string;
  description: string;
  responseTime: string;
  oneliner: string;
}

export interface IPersonalInfoProps {
  personalInfo: IPersonalInfoData;
  setPersonalInfo: Dispatch<SetStateAction<IPersonalInfoData>>;
  personalInfoErrors: IPersonalInfoData[];
}
