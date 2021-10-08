import React, {Component} from "react";

/**
 * <pre>
 *  告示框
 *  与 :::tip ::: 类似。
 *
 *  属性：
 *  type：告示框类型
 *    - tip 绿色（默认值）
 *
 *  示例：
 *  <ColorBox type='tip'>Hello World</ColorBox>
 * </pre>
 */
class ColorBox extends Component {

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
    return (
      <div style={{
        backgroundColor: this.getColor(),
        marginBottom: '20px',
        borderLeft: '5px solid rgba(15, 154, 15, 1)',
        borderRadius: '7px',
        padding: '20px 15px',
      }}>
        {this.props.children}
      </div>
    );
  }

}

export default ColorBox