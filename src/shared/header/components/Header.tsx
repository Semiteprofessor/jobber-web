import { FC, lazy, LazyExoticComponent, ReactElement, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IHeader, IHeaderModalProps } from "../interfaces/header.interface";
import LoginModal from "../../../features/auth/components/Login";
import { Link } from "react-router-dom";
import { IButtonProps } from "../../shared.interface";

const Button: LazyExoticComponent<FC<IButtonProps>> = lazy(
  () => import("../../../shared/button/Button")
);

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
      <header>
        <nav className={navClass}>
          <div className="m-auto px-6 xl:container md:px-12 lg:px-6">
            <div className="flex flex-wrap items-center justify-between gap-6 md:gap-0 md:py-3 lg:py-5">
              <div className="flex w-full items-center justify-between lg:w-auto">
                <Link
                  to="/"
                  className="relative z-10 cursor-pointer text-3xl font-semibold text-white"
                >
                  Jobber
                </Link>
                <div className="peer-checked:hamburger relative z-20 -mr-6 block cursor-pointer p-6 lg:hidden">
                  <Button
                    className="m-auto h-0.5 w-5 rounded transition duration-300"
                    onClick={() => setOpenSidebar(!openSidebar)}
                    label={
                      <>{openSidebar ? <FaTimes className="" /> : <FaBars />}</>
                    }
                  />
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
