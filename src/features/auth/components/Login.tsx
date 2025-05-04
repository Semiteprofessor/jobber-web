import React, { FC, ReactElement } from "react";
import { IHeaderModalProps } from "../../../shared/header/interfaces/header.interface";
import ModalBg from "../../../shared/modals/ModalBg";

const LoginModal: FC<IHeaderModalProps> = ({
  onClose,
  onToggle,
  onTogglePassword,
}): ReactElement => {
  return (
    <ModalBg>
      <div className="relative top-[20%] mx-auto w-11/12 max-w-md rounded-lg bg-white md:w-2/3">
        <div className="relative px-5 py-5">
          <div className="mb-5 flex justify-between text-2xl font-bold text-gray-600">
            <h1 className="flex w-full justify-center">Sign In to Jobber</h1>
          </div>
        </div>
      </div>
    </ModalBg>
  );
};

export default LoginModal;
