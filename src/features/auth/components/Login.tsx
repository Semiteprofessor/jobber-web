import React, { FC, ReactElement } from "react";
import { useDeviceData, useMobileOrientation } from "react-device-detect";
import { IHeaderModalProps } from "../../../shared/header/interfaces/header.interface";
import ModalBg from "../../../shared/modals/ModalBg";
import Button from "../../../shared/button/Button";
import { FaTimes } from "react-icons/fa";
import { IModalBgProps } from "../../../shared/modals/modal.interface";

const LoginModal: FC<IModalBgProps> = ({
  onClose,
  onToggle,
  onTogglePassword,
}): ReactElement => {
  const mobileOrientation = useMobileOrientation();
  const deviceData = useDeviceData(window.navigator.userAgent);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [passwordType, setPasswordType] = useState<string>("password");
  const [userInfo, setUserInfo] = useState<ISignInPayload>({
    username: "",
    password: "",
    browserName: deviceData.browser.name,
    deviceType: mobileOrientation.isLandscape ? "browser" : "mobile",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [schemaValidation] = useAuthSchema({
    schema: loginUserSchema,
    userInfo,
  });
  const [signIn, { isLoading }] = useSignInMutation();
  return (
    <ModalBg>
      <div className="relative top-[20%] mx-auto w-11/12 max-w-md rounded-lg bg-white md:w-2/3">
        <div className="relative px-5 py-5">
          <div className="mb-5 flex justify-between text-2xl font-bold text-gray-600">
            <h1 className="flex w-full justify-center">Sign In to Jobber</h1>
            <Button
              testId="closeModal"
              className="cursor-pointer rounded text-gray-400 hover:text-gray-600"
              role="button"
              label={<FaTimes className="icon icon-tabler icon-tabler-x" />}
              onClick={onClose}
            />
          </div>
          {alertMessage && <Alert />}
        </div>
      </div>
    </ModalBg>
  );
};

export default LoginModal;
