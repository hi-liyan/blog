import React from "react";
import styled from "@emotion/styled";

interface ArticleCreationProps {
    createDate: string
}

/**
 * ArticleCreation 展示文章创作日期
 *
 * api:
 *  createDate: 创作时间，如 2021-12-7
 */
const ArticleCreation = ({createDate}: ArticleCreationProps) => {

    const createArr = createDate.split("-"); // 分隔日期
    return (
      <Container>
          <span>{createArr[0]}年{createArr[1]}月{createArr[2]}日 编辑</span>
      </Container>
    );
}

const Container = styled.div`
  margin-bottom: 30px;
  font-size: smaller;
  color: #aaaaaa;
`;

export default ArticleCreation;