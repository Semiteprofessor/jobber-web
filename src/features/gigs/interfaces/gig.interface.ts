import { Dispatch, SetStateAction } from "react";
import {
  IRatingCategories,
  IReviewDocument,
} from "src/features/order/interfaces/review.interface";
import { ISellerDocument } from "src/features/sellers/interfaces/seller.interface";

export interface ITagsInputProps {
  title: string;
  placeholder: string;
  gigInfo: ICreateGig;
  tags: string[];
  itemName: string;
  itemInput: string;
  inputErrorMessage: boolean;
  counterText: string;
  setItem: Dispatch<SetStateAction<string[]>>;
  setItemInput: Dispatch<SetStateAction<string>>;
  setGigInfo: Dispatch<SetStateAction<ICreateGig>>;
}

export interface IGigPaginateProps {
  gigs: ISellerGig[];
  totalGigs: number;
  itemsPerPage: number;
  showNumbers: boolean;
  setItemFrom: Dispatch<SetStateAction<string>>;
  setPaginationType: Dispatch<SetStateAction<string>>;
}

export interface IAllowedGigItem {
  gigTitle: string;
  basicTitle: string;
  basicDescription: string;
  descriptionCharacters: string;
}

export interface IGigDropdown {
  budget: boolean;
  deliveryTime: boolean;
}
