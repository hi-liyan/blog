import React, {Component} from "react";

import './index.scss'

/**
 * ArticleCreation 展示文章创作日期
 * 
 * api:
 *  createDate: 创作时间，如 2021-12-7
 */
export default class Index extends Component {

    render() {
        const {createDate} = this.props;
        const createArr = createDate.split("-"); // 分隔日期
        return (
            <div className="ArticleCreationContainer">
                <span>{createArr[0]}年{createArr[1]}月{createArr[2]}日 编辑</span>
            </div>
        );
    }
}