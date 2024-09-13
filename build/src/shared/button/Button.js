import { jsx as _jsx } from "react/jsx-runtime";
const Button = (props) => {
    const { id, label, className, disabled, role, type, testId, onClick } = props;
    return _jsx("button", { "data-testid": testId, id: id, type: type, className: className, role: role, disabled: disabled, onClick: onClick, children: label });
};
export default Button;
