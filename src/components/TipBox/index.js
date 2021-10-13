import React, {Component} from "react";
import PropTypes from 'prop-types'

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
class TipBox extends Component {

  constructor(props, context) {
    super(props, context);
  }

  getColor() {
    const {type} = this.props
    switch (type) {
      case 'tip':
        return '#e6f6e6'
      default:
        return '#e6f6e6'
    }
  }

  render() {
    const {children} = this.props
    return (
      <div style={{
        backgroundColor: this.getColor(),
        marginBottom: '20px',
        borderLeft: '5px solid rgba(15, 154, 15, 1)',
        borderRadius: '7px',
        padding: '20px 15px',
      }}>
        {children}
      </div>
    );
  }

}

TipBox.propTypes = {
  type: PropTypes.oneOf(['tip'])
}

export default TipBox