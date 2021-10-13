import React, {Component} from "react";
import PropTypes from 'prop-types'

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
export default class SvgBox extends Component{
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {src} = this.props

    return (
      <React.Fragment>
        {/*svg元素*/}
        <div>{src ? <embed src={src} type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/" /> : null}</div>
      </React.Fragment>
    );
  }

}

SvgBox.proptypes = {
  src: PropTypes.string
}