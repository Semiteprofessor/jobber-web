import { FC } from "react";
import  { IButtonProps } from "../shared.interface";
const Button: FC<IButtonProps> = (props) => {
    const {id, label, className, disabled, role, type, testId, onClick} = props;
  return <button data-testid={testId} id={id} type={type} className={className} role={role} disabled={disabled} onClick={onClick}>{label}</button>;
};

export default Button;
