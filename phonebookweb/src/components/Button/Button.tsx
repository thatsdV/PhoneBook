import React from "react";

import "./Button.css";

type ButtonProps = {
  type?: "button" | "reset" | "submit";
  label?: string;
  btnType?: "default" | "inspireBlue" | "other";
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  label,
  btnType = "default",
  onClick,
}) => {
  const btnClassDict: { [index: string]: string } = {
    default: "btn-inspire",
    inspireBlue: "btn-inspire-blue",
    other: "btn-no-border",
  };

  return (
    <button className={`btn ${btnClassDict[btnType]}`} type={type} onClick={onClick}>
      <span>{label}</span>
    </button>
  );
};
