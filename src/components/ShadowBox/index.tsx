import React, {ReactChildren} from "react";
import styled from "@emotion/styled";

interface ShadowBoxProps {
  img: string,
  title?: string,
  width?: string,
  children?: ReactChildren
}

/**
 * <pre>
 *   ShadowBox 带有阴影的盒子
 *
 *   属性：
 *    title: 标题
 *    img: 图片地址（如果只显示一张图片，可以使用自闭合标签）
 *    width: 宽度
 *
 *   示例：
 *    <ShadowBox img='https://upyun.shiguangping.com/imgs/20211013095137.png'/>
 *    <ShadowBox title='标题'>Hello World</ShadowBox>
 * </pre>
 */
const ShadowBox = ({children, img, title, width}: ShadowBoxProps) => {
    return (
      <Container style={{width: width}}>
        {/*标题*/}
        <div className='titleBox' style={{display: title ? 'block' : 'none'}}>
          <h3>{title}</h3>
        </div>
        {/*图片元素*/}
        <div>{img ? <img src={img} alt=""/> : null}</div>
        {/*子元素*/}
        {children}
      </Container>
    );
};

const Container = styled.div`
  margin-bottom: 20px; // 底部外边距
  //border: 1px dashed #000; // 边框
  border-radius: 7px; // 圆角
  box-shadow: #7f7f7f 2px 2px 10px; // 阴影
  padding: 15px; // 内边距
`;

export default ShadowBox