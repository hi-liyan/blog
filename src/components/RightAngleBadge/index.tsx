import React from "react";
import styled from "@emotion/styled";

interface Props {
    children: React.ReactNode;
    color?: string
}

/**
 * 直角徽章
 */
const RightAngleBadge = ({children, color = "#44CC11"}: Props) => {
    return(
      <Container color={color}>
        {children}
      </Container>
    );
}

const Container = styled.div(props => ({
  display: 'inline-block',
  marginRight: '7px',
  marginBottom: '15px',
  padding: '3px 8px',
  backgroundColor: props.color,
  color: '#FFFFFF',
  fontSize: 'small',
  fontWeight: 'bold'
}));

export default RightAngleBadge;