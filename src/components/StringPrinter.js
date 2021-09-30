import React, {Component} from 'react'
import {init} from 'ityped'

/**
 * 自动打字效果
 */
class StringPrinter extends Component {

  componentDidMount() {
    // 自动打印文案
    const content = [
      'System.out.println(\"Hi, Welcome to Shiguangping.\");'
    ]
    const myElement = document.querySelector('#myElement')
    init(myElement, {showCursor: false, strings: content})
  }

  render() {
    return <div id="myElement" style={{color:'#fff'}}></div>
  }
}

export default StringPrinter