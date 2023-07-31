import React from "react";


const TextInput = (props) => {
  const registerName = props.registerName || "name";
  const placeHolder = props.placeholder || "Name";
  const label = props.label || "Name";
  const minLength = props.minLength || 0;
  const maxLength = props.maxLength || 100;

  return (
    <input
      key={registerName}
      type="text"
      className="form-control my-2 p-2"
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

export default TextInput;