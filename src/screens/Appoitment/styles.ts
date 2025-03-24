import styled from "styled-components/native";
import theme from "../../global/theme";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;
  padding: ${getStatusBarHeight() + 20}px 20px 0 20px;
  background-color: ${theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.text};
`;

export const calendarTheme = {
  backgroundColor: theme.colors.card_background,
  calendarBackground: theme.colors.background,
  textSectionTitleColor: theme.colors.text,
  selectedDayBackgroundColor: theme.colors.primary,
  selectedDayTextColor: theme.colors.text_light,
  todayTextColor: theme.colors.primary,
  todayBackgroundColor: theme.colors.card_background,
  dayTextColor: theme.colors.text,
  textDisabledColor: theme.colors.neutral.tertiary,
  dotColor: theme.colors.primary,
  selectedDotColor: theme.colors.text_light,
  arrowColor: theme.colors.primary,
  monthTextColor: theme.colors.text,
  indicatorColor: theme.colors.primary,
  textDayFontFamily: theme.fonts.regular,
  textMonthFontFamily: theme.fonts.bold,
  textDayHeaderFontFamily: theme.fonts.regular,
};

export const ActiveEventContainer = styled.View`
  min-height: auto;
  padding: 20px;
  background-color: ${theme.colors.card_background};
  border-radius: 8px;
  margin: 20px;
`;

export const ActiveEventTitle = styled.Text`
  font-size: 16px;
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.text};
  margin-bottom: 10px;
`;

export const ActiveEventDetail = styled.Text`
  font-size: 14px;
  font-family: ${theme.fonts.regular};
  color: ${theme.colors.text};
  margin-bottom: 5px;
`;

export const ActiveEventMessage = styled.Text`
  margin-top: 20px;
  font-size: 14px;
  font-family: ${theme.fonts.regular};
  color: ${theme.colors.text};
  text-align: center;
`;
