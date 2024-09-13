import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDeviceData, useMobileOrientation } from "react-device-detect";
import ModalBg from "../../../shared/modals/ModalBg";
import Button from "../../../shared/button/Button";
import { FaTimes } from "react-icons/fa";
const LoginModal = ({ onClose, onToggle, onTogglePassword, }) => {
    const mobileOrientation = useMobileOrientation();
    const deviceData = useDeviceData(window.navigator.userAgent);
    const [alertMessage, setAlertMessage] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [userInfo, setUserInfo] = useState({
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
    return (_jsx(ModalBg, { children: _jsx("div", { className: "relative top-[20%] mx-auto w-11/12 max-w-md rounded-lg bg-white md:w-2/3", children: _jsxs("div", { className: "relative px-5 py-5", children: [_jsxs("div", { className: "mb-5 flex justify-between text-2xl font-bold text-gray-600", children: [_jsx("h1", { className: "flex w-full justify-center", children: "Sign In to Jobber" }), _jsx(Button, { testId: "closeModal", className: "cursor-pointer rounded text-gray-400 hover:text-gray-600", role: "button", label: _jsx(FaTimes, { className: "icon icon-tabler icon-tabler-x" }), onClick: onClose })] }), alertMessage && _jsx(Alert, {})] }) }) }));
};
export default LoginModal;
