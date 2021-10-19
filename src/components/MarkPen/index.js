import React, {Component} from "react";

/**
 * <pre>
 *  MarkPen 马克笔
 *
 *  属性：
 *  display：展示方式
 *  color：马克杯颜色
 *  fontWeight：字体粗细
 *  underline: 文字下划线（red）
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
    const {display, color, fontWeight, underline} = this.props
    return (
      <div style={{
        display: display ? display : 'inline-block',
        borderRadius: '5px',
        padding: '0 3px',
        backgroundColor: color ? color : (underline ? 'null' : '#ffedc9'),
        color: '#000',
        fontWeight: fontWeight
      }}>
        <span style={{
          borderBottom: underline ? '1px solid #f00' : null
        }}>{this.props.children}</span>
      </div>
    );
  }

}

export default MarkPen