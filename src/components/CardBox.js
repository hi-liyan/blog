import React, {Component} from "react";

/**
 * <pre>
 *  卡片
 *
 *  属性：
 *  title：标题
 *  img: 图片
 *
 *  示例：
 *  <CardBox title='标题'>Hello World</CardBox>
 * </pre>
 */
class CardBox extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {title, children, img} = this.props
    return (
      <div className="card-demo shadow--tl" style={{marginBottom: '20px'}}>
        <div className="card">
          <div className="card__header" style={{
            display: title ? 'block' : 'none'
          }}>
            <h3>{title}</h3>
          </div>
          <div className="card__body">
            <div>{img ? <img src={img} alt=""/> : null}</div>
            {children}
          </div>
        </div>
      </div>
    );
  }

}

export default CardBox