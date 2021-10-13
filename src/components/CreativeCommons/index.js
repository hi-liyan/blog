import React, {Component} from "react";

/**
 * <pre>
 *   CreativeCommons 共享知识声明
 * </pre>
 */
export default class CreativeCommons extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const htmlSrc = "<a rel=\"license\" href=\"http://creativecommons.org/licenses/by-nc-sa/4.0/\"><img alt=\"知识共享许可协议\" style=\"border-width:0\" src=\"https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png\" /></a><br /><span xmlns:dct=\"http://purl.org/dc/terms/\" property=\"dct:title\">本站点内所有创作内容（非声明为转载内容）</span> 由 <a xmlns:cc=\"http://creativecommons.org/ns#\" href=\"https://www.shiguangping.com/\" property=\"cc:attributionName\" rel=\"cc:attributionURL\">李炎</a> 采用 <a rel=\"license\" href=\"http://creativecommons.org/licenses/by-nc-sa/4.0/\">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。"
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: htmlSrc}}></div>
        <br/>
        授权要求：
        <ul>
          <li>署名</li>
          <li>非商业性</li>
          <li>相同许可协议共享</li>
        </ul>
      </div>
    );
  }

}