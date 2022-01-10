import React, {useState} from "react";
import styled from "@emotion/styled";

interface SvgBoxProps {
  src: string
}

/**
 * <pre>
 *   SvgBox 用于展示svg图片
 *   该组件基于<embed>封装，由于<embed>组件不属于HTML规范，所以部分老的浏览器展示可能存在问题
 *
 *   属性：
 *    src: 文件地址
 *
 *   示例：
 *
 * </pre>
 */
const SvgBox = ({src}: SvgBoxProps) => {

  const [width, setWidth] = useState(100);

  // 图片放大
  const enlarge = () => {
    if (width < 300) {
      setWidth(width + 50);
    }
  }

  // 图片缩小
  const shrink = () => {
    if (width > 50) {
      setWidth(width - 50);
    }
  }

  // @ts-ignore
  return (
    <>
      {/*svg元素*/}
      <Container>
        <div className='svgBox'>
          {src ? <embed src={src} width={width + "%"} type="image/svg+xml" /> : null}
        </div>

        <div className="btnBox">
          <button
            className={width === 300 ? "button disabled button--outline button--primary" : "button button--outline button--primary"}
            onClick={enlarge}>
            放大
          </button>
          <button
            className={width === 50 ? "button disabled button--outline button--primary" : "button button--outline button--primary"}
            onClick={shrink}>
            缩小
          </button>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  margin-bottom: 20px; // 底部外边距
  border-radius: 7px; // 圆角
  padding: 20px;
  box-shadow: #7f7f7f 1px 1px 10px; // 阴影

  .svgBox {
    overflow: scroll;
    height: 25vw;
  }

  .btnBox {
    position: absolute;
    right: 20px;
    bottom: 20px;
    
    button:nth-of-type(1) {
      margin-right: 10px;
    }
  }
`;

export default SvgBox;