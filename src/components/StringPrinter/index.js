import React, {Component} from 'react'
import {init} from 'ityped'
import PropTypes from 'prop-types'

/**
 * 自动打字效果（用于首页自动打字文案）
 */
class StringPrinter extends Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const {contents} = this.props
    // 自动打印文案
    const myElement = document.querySelector('#myElement')
    init(myElement, {showCursor: false, strings: contents})
  }

  render() {
    return <div id="myElement" style={{color:'#fff'}}></div>
  }

}

// 组件属性校验
StringPrinter.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.string)
}

export default StringPrinter