import React from "react";
import styled from "@emotion/styled";

interface ArticleCreationProps {
    createDate?: string;
    editDate?: string;
}

/**
 * ArticleCreation 展示文章创作日期
 *
 * api:
 *  createDate: 创作时间，如 2021-12-7
 */
const ArticleCreation = ({createDate, editDate}: ArticleCreationProps) => {

    const createDateArr = createDate?.split("-"); // 分隔日期
    const editDateArr = editDate?.split("-");

    return (
        <Container>
            {!createDateArr || <span>{createDateArr[0]}年{createDateArr[1]}月{createDateArr[2]}日 创建</span>}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {!editDateArr || <span>{editDateArr[0]}年{editDateArr[1]}月{editDateArr[2]}日 编辑</span>}
        </Container>
    );
}

const Container = styled.div`
  margin-top: -30px !important;
  margin-bottom: 30px;
  font-size: smaller;
  color: #827397;
`;

export default ArticleCreation;