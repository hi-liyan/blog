import React, {Component} from "react";
import PropTypes from 'prop-types'

/**
 * <pre>
 *  MarkPen 马克笔
 *
 *  属性：
 *  noMark：去掉背景颜色
 *  underline: 文字下划线（red）
 *  color：马克笔颜色
 *  fontWeight：字体粗细
 *
 *  示例：
 *  <MarkPen color='#000' fontWeight='bold'>Hello World</MarkPen>
 * </pre>
 */
class MarkPen extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {noMark, color, fontWeight, underline, children} = this.props
    return (
      <span style={{
        display: 'inline-block',
        borderRadius: '5px',
        padding: '0 3px',
        backgroundColor: noMark ? 'null' : (color ? color : '#ffedc9'),
        color: '#000',
        fontWeight: fontWeight
      }}>
        <span style={{
          borderBottom: underline ? '1px solid #f00' : null
        }}>{children}</span>
      </span>
    );
  }
}

MarkPen.proptypes = {
  noMark: PropTypes.bool,
  color: PropTypes.string,
  fontWeight: PropTypes.string,
  underline: PropTypes.bool,
  children: PropTypes.string
}

export default MarkPen