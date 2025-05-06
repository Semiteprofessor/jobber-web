import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { ISellerGig } from "src/features/gigs/interfaces/gig.interface";
import { IOffer } from "src/features/order/interfaces/order.interface";
import { ISellerDocument } from "src/features/sellers/interfaces/seller.interface";

export interface IChatWindowProps {
  chatMessages: IMessageDocument[];
  isError: boolean;
  isLoading: boolean;
  setSkip?: Dispatch<SetStateAction<boolean>>;
}

export interface IFilePreviewProps {
  image: string;
  file: File;
  isLoading: boolean;
  message: string;
  handleChange: (event: ChangeEvent) => void;
  onSubmit: (event: FormEvent) => void;
  onRemoveImage: () => void;
}

export interface IConversationDocument {
  _id: string;
  conversationId: string;
  senderUsername: string;
  receiverUsername: string;
}
