import { FC, ReactElement, useState } from "react";
import { IHeader, IHeaderModalProps } from "../interfaces/header.interface";
import LoginModal from "../../../features/auth/components/Login";

const Header: FC<IHeader> = ({ navClass }): ReactElement => {
  const [showModal, setShowModal] = useState<IHeaderModalProps>({
    login: false,
    register: false,
    forgotPassword: false,
  });
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  return (
    <>
      {showModal.login && (
        <LoginModal
          onClose={() =>
            setShowModal((item: IHeaderModalProps) => ({
              ...item,
              login: false,
            }))
          }
          onToggle={() =>
            setShowModal((item: IHeaderModalProps) => ({
              ...item,
              login: false,
              register: true,
            }))
          }
          onTogglePassword={() =>
            setShowModal((item: IHeaderModalProps) => ({
              ...item,
              login: false,
              forgotPassword: true,
            }))
          }
        />
      )}
      {showModal.login && (
        <LoginModal
          onClose={() =>
            setShowModal((item: IHeaderModalProps) => ({
              ...item,
              login: false,
            }))
          }
          onToggle={() =>
            setShowModal((item: IHeaderModalProps) => ({
              ...item,
              login: false,
              register: true,
            }))
          }
          onTogglePassword={() =>
            setShowModal((item: IHeaderModalProps) => ({
              ...item,
              login: false,
              forgotPassword: true,
            }))
          }
        />
      )}
      {showModal.register && (
        <LoginModal
          onClose={() =>
            setShowModal((item: IHeaderModalProps) => ({
              ...item,
              register: false,
            }))
          }
          onToggle={() =>
            setShowModal((item: IHeaderModalProps) => ({
              ...item,
              login: true,
              register: false,
            }))
          }
        />
      )}
      {showModal.forgotPassword && (
        <LoginModal
          onClose={() =>
            setShowModal((item: IHeaderModalProps) => ({
              ...item,
              forgotPassword: false,
            }))
          }
          onToggle={() =>
            setShowModal((item: IHeaderModalProps) => ({
              ...item,
              login: true,
              forgotPassword: false,
            }))
          }
        />
      )}
      <header>Header</header>
    </>
  );
};

export default Header;
