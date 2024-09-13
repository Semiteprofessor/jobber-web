import { jsx as _jsx } from "react/jsx-runtime";
const TextAreaInput = (props) => {
    return (_jsx("textarea", { id: props.id, name: props.name, value: props.value, readOnly: props.readOnly, className: props.className, maxLength: props.maxLength, style: props.style, rows: props.rows, placeholder: props.placeholder, onChange: props.onChange, onClick: props.onClick, onFocus: props.onFocus, onBlur: props.onBlur, onKeyUp: props.onKeyUp, onKeyDown: props.onKeyDown, autoComplete: "false" }));
};
export default TextAreaInput;
