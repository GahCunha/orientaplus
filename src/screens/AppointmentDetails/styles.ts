import styled from "styled-components/native";
import theme from "../../global/theme";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { TouchableOpacity } from "react-native";

export const Container = styled.View`
  flex: 1;
  padding: ${getStatusBarHeight() + 20}px 20px 0 20px;
  background-color: ${theme.colors.background};
`;

export const HeaderCalendar = styled.View`
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin-bottom: 20px;
`;

export const DateContainer = styled.View`
  background-color: ${theme.colors.primary_light};
  padding: 10px;
  border-radius: 10px;
  align-items: center;
`;

export const MonthText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.neutral.tertiary};
  font-family: ${theme.fonts.regular};
`;

export const DayText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${theme.colors.text};
  font-family: ${theme.fonts.bold};
`;

export const TimeText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.text};
  font-family: ${theme.fonts.bold};
  margin-left: 30%;
`;

export const SubjectContainer = styled.View`
  background-color: ${theme.colors.card_background};
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const SubjectTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.text};
  font-family: ${theme.fonts.bold};
`;

export const SubjectDescription = styled.Text`
  font-size: 14px;
  color: ${theme.colors.neutral.tertiary};
  margin-top: 5px;
  font-family: ${theme.fonts.regular};
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
  font-family: ${theme.fonts.bold};
  color: ${(props) => props.color || theme.colors.text_light};
`;


export const SubjectInput = styled.TextInput`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.text};
  height: 268px;
  padding: 10px;
  font-family: ${theme.fonts.regular};
  background-color: ${theme.colors.neutral.secondary};
  border-radius: 8px;
  text-align-vertical: top;
`;



export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const CloseButton = styled(TouchableOpacity)`
  background-color: ${theme.colors.button.danger};
  padding: 12px 20px;
  border-radius: 10px;
  margin-top: 10px;
`;

// 🔹 Estilizando a seleção de horários
export const TimePickerBox = styled.View`
  background-color: ${theme.colors.background};
  padding: 20px;
  border-radius: 20px;
  width: 80%;
  align-items: center;
  elevation: 5;
`;

export const TimeSlotButton = styled.TouchableOpacity`
  background-color: ${theme.colors.neutral.secondary};
  padding: 15px;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 10px;
  align-items: center;
`;

export const TimeSlotText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text};
`;