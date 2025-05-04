import browseImage from "src/assets/browse.png";
import collaborate from "src/assets/collaborate.png";
import contact from "src/assets/contact.png";
import create from "src/assets/create.png";
import { IAuthUser } from "src/features/auth/interfaces/auth.interface";
import { IBuyerDocument } from "src/features/buyer/interfaces/buyer.interface";
import { ISellerGig } from "src/features/gigs/interfaces/gig.interface";
import { ICategory } from "src/features/home/interfaces/home.interface";
import { IRatingTypes } from "src/features/order/interfaces/review.interface";
import { ISellerDocument } from "src/features/sellers/interfaces/seller.interface";

import { ISliderImagesText } from "../shared.interface";

export const initialAuthUserValues: IAuthUser = {
  profilePublicId: null,
  country: null,
  createdAt: null,
  email: null,
  emailVerificationToken: null,
  emailVerified: null,
  id: null,
  passwordResetExpires: null,
  passwordResetToken: null,
  profilePicture: null,
  updatedAt: null,
  username: null,
  browserName: null,
  deviceType: null,
};

export const emptyBuyerData: IBuyerDocument = {
  _id: "",
  username: "",
  email: "",
  profilePicture: "",
  country: "",
  isSeller: false,
  purchasedGigs: [],
  createdAt: "",
};
