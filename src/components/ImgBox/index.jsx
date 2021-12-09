import React, {Component} from "react";
import {Image} from "rebass";
import PropTypes from 'prop-types';

/**
 * <pre>
 *   ImgBox 图片
 *
 *   api：
 *     src: 照片源
 *     width: 照片宽度，默认值 70%
 *     inline: 行内标签
 * </pre>
 */
export default class ImgBox extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {src, width='70%', inline=false} = this.props
    return (
      <div style={{display: inline ? 'inline' : 'block'}}>
        <Image src={src} sx={{
          width: width,
          borderRadius: 8,
        }} style={{marginRight: 20, marginBottom: 20}}/>
      </div>
    );
  }
}

ImgBox.proptypes = {
  src: PropTypes.string,
  width: PropTypes.string,
  inline: PropTypes.bool
}