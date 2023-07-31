import React from "react";
import useStyles from "../../styles/styles";


const EmailInput = (props) => {
  const registerName = props.registerName || "email";
  const placeHolder = props.placeholder || "Email";
  const label = props.label || "Email";
const classes=useStyles()
  return (
    <input
      key={registerName}
      type="text"
      className={`${classes.root2} form-control my-2 p-2`}
      placeholder={placeHolder}
      onChange={(e) => props.onUpdate(e.target.value)}
      {...props.register(registerName, {
        required: `${label} is required`,
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Please provide a proper email id",
        },
      })}
    />
  );
};

export default EmailInput;