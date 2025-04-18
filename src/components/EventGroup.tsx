import React from "react";
import styled from "styled-components/native";
import theme from "src/global/theme";

interface EventGroupProps {
  title: string;
  children?: React.ReactNode;
}

export default function EventGroup({ title, children }: EventGroupProps) {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  );
}


const Container = styled.View`
  margin-top: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${theme.colors.text}; 
  font-family: ${theme.fonts.bold};
`;
