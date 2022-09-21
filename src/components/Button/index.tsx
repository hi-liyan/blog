import React from "react";
import {ReactChildren} from "react";
import './index.scss';

interface ButtonProps {
  children?: ReactChildren | string
}

/**
 * 按钮
 * @param children
 * @constructor
 */
const Button = ({children}: ButtonProps) => {

  return (
    <div className="btnDiv">
      {children}
    </div>
  );
}

export default Button;