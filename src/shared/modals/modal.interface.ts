import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from "react";
import { IMessageDocument } from "../../features/chat/interfaces/chat.interface";
import { IOrderDocument } from "../../features/order/interfaces/order.interface";
import { IBuyerDocument } from "../../features/buyer/interfaces/buyer.interface";
import { IAuthUser } from "../../features/auth/interfaces/auth.interface";

export interface IModalBgProps {
  children?: ReactNode;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  onToggle?: Dispatch<SetStateAction<boolean>>;
  onTogglePassword?: Dispatch<SetStateAction<boolean>>;
}

export interface IModalProps {
  header?: string;
  gigTitle?: string;
  singleMessage?: IMessageDocument;
  order?: IOrderDocument;
  receiver?: IBuyerDocument;
  authUser?: IAuthUser;
  type?: string;
  approvalModalContent?: IApprovalModalContent;
  hideCancel?: boolean;
  cancelBtnHandler?: () => void;
  onClick?: () => void;
  onClose?: () => void;
}

export interface IApprovalModalContent {
  header: string;
  body: string;
  btnText: string;
  btnColor: string;
}
