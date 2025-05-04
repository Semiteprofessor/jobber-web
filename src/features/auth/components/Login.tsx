import React, { FC, ReactElement } from "react";
import { IHeaderModalProps } from "../../../shared/header/interfaces/header.interface";

const LoginModal: FC<IHeaderModalProps> = ({
  onClose,
  onToggle,
  onTogglePassword,
}): ReactElement => {
  return (<ModalBg></ModalBg><div>LoginModal</div>);
};

export default LoginModal;
