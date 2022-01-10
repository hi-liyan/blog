import React from "react";
import {Image} from "rebass";

interface ImgBoxProps {
  src: string,
  width?: string,
  inline?: boolean
}

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
const ImgBox = ({src, width = "70%", inline = false}: ImgBoxProps) => {
  return (
    <div style={{display: inline ? 'inline' : 'block'}}>
      <Image src={src} sx={{
        width: width,
        borderRadius: 8,
      }} style={{marginRight: 20, marginBottom: 20}}/>
    </div>
  );
}

export default ImgBox;