import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  ChangeEvent,
  CSSProperties,
  Dispatch,
  KeyboardEvent,
  ReactNode,
  SetStateAction,
} from "react";
import {
  IAuthDocument,
  IAuthResponse,
  IResetPassword,
  ISignInPayload,
  ISignUpPayload,
} from "src/features/auth/interfaces/auth.interface";
import { IBuyerDocument } from "src/features/buyer/interfaces/buyer.interface";
import {
  IConversationDocument,
  IMessageDocument,
} from "src/features/chat/interfaces/chat.interface";
import {
  ICreateGig,
  ISellerGig,
} from "src/features/gigs/interfaces/gig.interface";
import {
  IOrderDocument,
  IOrderNotifcation,
} from "src/features/order/interfaces/order.interface";
import { IReviewDocument } from "src/features/order/interfaces/review.interface";
import {
  IEducation,
  IExperience,
  ILanguage,
  IPersonalInfoData,
  ISellerDocument,
} from "src/features/sellers/interfaces/seller.interface";


