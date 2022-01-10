import React, {ReactChildren} from "react";

interface BadgeProps {
  type: "primary" | "secondary" | "success" | "info" | "warning" | "danger",
  children: ReactChildren | string,
  random?: boolean
}

/**
 * 徽章
 * <pre>
 *
 * </pre>
 */
const Badge = ({type = "primary", children, random = false}: BadgeProps) => {
  const types = ["primary", "secondary", "success", "info", "warning", "danger"]; // 可选类型数据
  if (random) { // 类型随机
    type = types[parseInt((Math.random() * 6).toString())] as typeof type
  }

  return (
    <>
      <span style={{display: "inline"}} className={"badge badge--" + type}>{children}</span>
      <span> </span>
    </>
  );
}

export default Badge;