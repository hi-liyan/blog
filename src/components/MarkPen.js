import React, {Component} from "react";

/**
 * <pre>
 *  马克笔
 *
 *  属性：
 *  display：展示方式
 *  color：马克杯颜色
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
    const {display, color, fontWeight} = this.props
    return (
      <div style={{
        display: display ? display : 'inline-block',
        padding: '0 3px',
        backgroundColor: color ? color : '#ffedc9',
        fontWeight: fontWeight
      }}>
        {this.props.children}
      </div>
    );
  }

}

export default MarkPen