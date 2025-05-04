import React, { FC } from "react";
import { IModalBgProps } from "./modal.interface";

const ModalBg: FC<IModalBgProps> = ({ children }) => {
  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 h-full w-full z-50 overflow-hidden">
      ModalBg
    </div>
  );
};

export default ModalBg;
