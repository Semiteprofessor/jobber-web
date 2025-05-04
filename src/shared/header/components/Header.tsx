import { FC, ReactElement, useState } from "react";
import { IHeader, IHeaderModalProps } from "../interfaces/header.interface";

const Header: FC<IHeader> = ({ navClass }): ReactElement => {
  const [showModal, setShowModal] = useState<IHeaderModalProps>({
    login: false,
    register: false,
    forgotPassword: false,
  });
  return <div>Header</div>;
};

export default Header;
