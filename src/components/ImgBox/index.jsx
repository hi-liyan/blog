import React, {Component} from "react";
import {Image} from "rebass";
import PropTypes from 'prop-types'

/**
 * <pre>
 *   ImgBox 图片
 *
 *   api：
 *     src: 照片源
 *     width: 照片宽度，默认值 50%
 * </pre>
 */
export default class ImgBox extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {src, width='70%'} = this.props
    return (
      <div style={{marginBottom: 20}}>
        <Image src={src} sx={{
          width: width,
          borderRadius: 8,
        }}/>
      </div>
    );
  }
}

ImgBox.proptypes = {
  src: PropTypes.string,
  width: PropTypes.string
}