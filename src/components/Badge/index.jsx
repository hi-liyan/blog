import React, {Component} from 'react';

/**
 * 徽章
 * <pre>
 *
 * </pre>
 */
export default class Badge extends Component {

  render() {
    let {type='primary', children, random=false} = this.props
    const types = ['primary','secondary','success','info','warning','danger']; // 可选类型数据
    if (random) { // 类型随机
      type = types[parseInt((Math.random()*6).toString())]
    }
    return (
      <React.Fragment>
        <span style={{display: 'inline'}} className={'badge badge--' + type}>{children}</span>
        <span> </span>
      </React.Fragment>
    );
  }
}