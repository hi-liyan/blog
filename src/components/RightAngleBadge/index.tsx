import React from "react";
import styled from "@emotion/styled";

/**
 * 直角徽章
 */
const RightAngleBadge = ({children}:{children: React.ReactNode}) => {
    return(
      <Container>
        {children}
      </Container>
    );
}

const Container = styled.div`
  display: inline-block;
  margin-right: 7px;
  margin-bottom: 15px;
  padding: 3px 8px;
  background-color: #44CC11;
  color: #FFFFFF;
  font-size: small;
  font-weight: bold;
`;

export default RightAngleBadge;