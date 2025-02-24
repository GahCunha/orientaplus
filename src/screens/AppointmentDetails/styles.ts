import styled from 'styled-components/native';
import theme from '../../global/theme';
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
    flex: 1;
    padding: ${getStatusBarHeight() + 20}px 20px 0 20px;
    background-color: ${theme.colors.background};
`;

export const HeaderCalendar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const DateContainer = styled.View`
  background-color: #e6e6e6;
  padding: 10px;
  border-radius: 10px;
  align-items: center;
`;

export const MonthText = styled.Text`
  font-size: 16px;
  color: #555;
`;

export const DayText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #333;
`;

export const TimeText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const SubjectContainer = styled.View`
  background-color: #e6e6e6;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const SubjectTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const SubjectDescription = styled.Text`
  font-size: 14px;
  color: #555;
  margin-top: 5px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const ActionButton = styled(TouchableOpacity)<{ backgroundColor: string }>`
  padding: 15px;
  border-radius: 20px;
  background-color: ${(props) => props.backgroundColor};
  align-items: center;
  justify-content: center;
  width: 48%;
  height: 50px;
`;

export const ButtonText = styled.Text<{ color?: string }>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.color || theme.colors.neutral.secondary};
`;

export const SubjectInput = styled.TextInput`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  height: 100px;
  padding: 10px;
`;