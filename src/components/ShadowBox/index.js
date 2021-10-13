import React, {Component} from "react";
import PropTypes from 'prop-types'
import './index.scss'

/**
 * <pre>
 *   ShadowBox 带有阴影的容器
 *
 *   属性：
 *    img: 图片地址（如果容器只显示图片，可以使用闭合标签）
 *
 *   示例：
 *    <ShadowBox img='https://images.shiguangping.com/imgs/20211013095137.png'/>
 *    <ShadowBox>Hello World</ShadowBox>
 * </pre>
 */
class ShadowBox extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {children, img, title} = this.props
    return (
      <div className='containerBox'>
        <div className='titleBox' style={{display: title ? 'block' : 'none'}}>
          <h3>{title}</h3>
        </div>
        <div>{img ? <img src={img} alt=""/> : null}</div>
        {children}
      </div>
    );
  }
}

ShadowBox.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string
}

export default ShadowBox