import { IAuthUser } from "src/features/auth/interfaces/auth.interface";

export type DivElementRefType = HTMLDivElement;

export interface ICheckoutProps {
  gigId: string;
  offer: IOffer;
}

export interface IOrderProps {
  order: IOrderDocument;
  authUser: IAuthUser;
}

export interface IOrderActivitiesProps {
  order: IOrderDocument;
  authUser: IAuthUser;
  viewDeliveryBtnClicked?: boolean;
  showDeliveryPanel?: boolean;
  showReviewPanel?: boolean;
}

export interface IOffer {
  [key: string]: string | number | boolean | undefined;
  gigTitle: string;
  price: number;
  description: string;
  deliveryInDays: number;
  oldDeliveryDate: string;
  newDeliveryDate: string;
  accepted: boolean;
  cancelled: boolean;
  reason?: string; // this is the reason for extending the delivery date
}

export interface IOrderDeliveredProps {
  ref?: HTMLDivElement;
}

export interface IOrderInvoice {
  invoiceId: string;
  orderId: string;
  date: string;
  buyerUsername: string;
  orderService: IOrderInvoiceService[];
}
