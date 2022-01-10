import React, {useEffect} from 'react'
import {init} from 'ityped'

interface StringPrinterProps {
  contents: string[]
}

/**
 * 自动打字效果（用于首页自动打字文案）
 */
const StringPrinter = ({contents}: StringPrinterProps) => {

  useEffect(() => {
    // 自动打印文案
    const myElement = document.querySelector('#myElement')
    init(myElement, {showCursor: false, strings: contents})
  }, []);

    return <div id="myElement" style={{color:'#fff'}}></div>
}

export default StringPrinter;