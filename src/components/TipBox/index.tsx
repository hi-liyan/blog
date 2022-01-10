import React, {ReactChildren} from "react";
import styled from "@emotion/styled";

interface TipBoxProps {
  type: "tip",
  children: ReactChildren
}

/**
 * <pre>
 *  TipBox 小贴士盒子（与 :::tip ::: 语法样式类似）
 *
 *  属性：
 *  type：告示框类型
 *    - tip 绿色（默认值）
 *
 *  示例：
 *  <TipBox type='tip'>Hello World</TipBox>
 * </pre>
 */
const TipBox = ({type, children}: TipBoxProps) => {

  const getColor = () => {
    switch (type) {
      case 'tip':
        return '#e6f6e6'
      default:
        return '#e6f6e6'
    }
  }

  return (
    <Container color={getColor()}>
      {children}
    </Container>
  );
};

const Container = styled.div`
  backgroundColor: ${props => props.color};
  marginBottom: 20px;
  borderLeft: 5px solid rgba(15, 154, 15, 1);
  borderRadius: 7px;
  padding: 20px 15px;
`;

export default TipBox;