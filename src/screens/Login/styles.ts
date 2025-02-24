import styled from 'styled-components/native';
import theme from '../../global/theme';
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.background};
  padding: 20px;
`;

export const CalendarImage = styled.Image`
  width: 150px;
  height: 150px;
  margin-bottom: 40px;
`;
