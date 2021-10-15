import React, {Component} from "react";
import PropTypes from 'prop-types'
import './index.scss'

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
 *    <ShadowBox img='https://images.shiguangping.com/imgs/20211013095137.png'/>
 *    <ShadowBox title='标题'>Hello World</ShadowBox>
 * </pre>
 */
class ShadowBox extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {children, img, title, width} = this.props
    return (
      <div className='containerBox' style={{width: width}}>
        {/*标题*/}
        <div className='titleBox' style={{display: title ? 'block' : 'none'}}>
          <h3>{title}</h3>
        </div>
        {/*图片元素*/}
        <div>{img ? <img src={img} alt=""/> : null}</div>
        {/*子元素*/}
        {children}
      </div>
    );
  }
}

ShadowBox.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.string
}

export default ShadowBox