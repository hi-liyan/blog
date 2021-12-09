import React, {Component} from "react";
import PropTypes from 'prop-types'
import './index.scss'

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

    this.state = {
      width: 100 // svg 宽度
    };
  }

  // 图片放大
  enlarge = () => {
    const {width} = this.state;
    console.log('放大, width=',width);
    if (width < 300) {
      this.setState(() => {
        return {
          width: width + 50
        }
      });
    }
  }

  // 图片缩小
  shrink = () => {
    const {width} = this.state;
    console.log('缩小, width=',width)
    if (width > 50) {
      this.setState(() => {
        return {
          width: width - 50
        }
      });
    }
  }

  render() {
    const {src} = this.props;
    const {width} = this.state;

    return (
      <React.Fragment>
        {/*svg元素*/}
        <div className="svgBoxContainer">
          <div className='svgBox'>
            {src ? <embed src={src} width={width + "%"} type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/" /> : null}
          </div>

          <div className="btnBox">
            <button className={width === 300 ? "button disabled button--outline button--primary" : "button button--outline button--primary"} onClick={()=>{this.enlarge()}}>放大</button>
            <button className={width === 50 ? "button disabled button--outline button--primary" : "button button--outline button--primary"} onClick={()=>{this.shrink()}}>缩小</button>
          </div>
        </div>
      </React.Fragment>
    );
  }

}

SvgBox.proptypes = {
  src: PropTypes.string
}