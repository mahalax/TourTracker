import React from "react";
import  useStyles from "../../styles/styles";


const PasswordInput = (props) => {
  const registerName = props.registerName || "password";
  const placeHolder = props.placeholder || "********";
  const label = props.label || "Password";
  const minLength = props.minLength || 8;
  const maxLength = props.maxLength || 16;
const classes = useStyles()
  return (
    <input
      key={registerName}
      type="password"
      className={`${classes.root2} form-control my-2 p-2`}
      placeholder={placeHolder}
      onChange={(e) => props.onUpdate(e.target.value)}
      {...props.register(registerName, {
        required: `${label} is required`,
        minLength: {
          value: minLength,
          message: `${label} length must be atleast ${minLength} characters`,
        },
        maxLength: {
          value: maxLength,
          message: `${label} length must be maximum ${maxLength} characters`,
        },
      })}
    />
  );
};

export default PasswordInput;