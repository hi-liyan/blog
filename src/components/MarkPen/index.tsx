import React from "react";

interface MarkPenProps {
  noMark?: boolean,
  color?: string,
  fontWeight?: string,
  underline?: boolean,
  children: string
}

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
const MarkPen = ({noMark, color, children, underline, fontWeight}: MarkPenProps) => {
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
};

export default MarkPen;