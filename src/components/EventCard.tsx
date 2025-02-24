import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "src/global/theme";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  iconName: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
}

export default function EventCard({ title, date, time, iconName, onPress }: EventCardProps) {
  return (
    <CardContainer>
      <LeftIndicator />
      <Content>
        <Title>{title}</Title>
        <DateText>{date} - {time}</DateText>
      </Content>
      {onPress && (
        <EditButton onPress={onPress}>
          <MaterialIcons name={iconName} size={20} color={theme.colors.neutral.tertiary} />
        </EditButton>
      )}
    </CardContainer>
  );
}


const CardContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.card_background};
  border-radius: 12px;
  margin-bottom: 10px;
  width: 100%;
  overflow: hidden;
`;

const LeftIndicator = styled.View`
  width: 8px;
  height: 100%;
  background-color: ${theme.colors.primary}; 
  overflow: hidden;
`;

const Content = styled.View`
  flex: 1;
  padding: 0px 10px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.text};
  font-family: ${theme.fonts.bold};
`;

const DateText = styled.Text`
  font-size: 14px;
  color: ${theme.colors.neutral.tertiary};
  font-family: ${theme.fonts.regular};
`;

const EditButton = styled(TouchableOpacity)`
  height: 100%;
  background-color: ${theme.colors.neutral.quaternary};
  padding: 5%;
`;
