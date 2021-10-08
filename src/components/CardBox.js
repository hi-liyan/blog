import React, {Component} from "react";

/**
 * <pre>
 *  卡片
 *
 *  属性：
 *  display：展示方式
 *  color：马克杯颜色
 *  fontWeight：字体粗细
 *
 *  示例：
 *  <CardBox>Hello World</CardBox>
 * </pre>
 */
class CardBox extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {title, children} = this.props
    return (
      <div className="card-demo shadow--tl">
        <div className="card">
          <div className="card__header">
            <h3>{title}</h3>
          </div>
          <div className="card__body">
            {children}
          </div>
        </div>
      </div>
    );
  }

}

export default CardBox