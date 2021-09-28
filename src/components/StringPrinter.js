import React, {Component} from 'react'
import {init} from 'ityped'

/**
 * 自动打字效果
 */
class StringPrinter extends Component {

  componentDidMount(props) {
    // 自动打印文案
    const content = [
      'System.out.println(\"Hi, I am Liyan\");'
    ]

    const myElement = document.querySelector('#myElement')
    init(myElement, {showCursor: false, strings: content})
  }

  render() {
    return <div id="myElement" style={{color:'#fff'}}></div>
  }
}

export default StringPrinter