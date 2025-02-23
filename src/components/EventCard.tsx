import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons';

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
                    <MaterialIcons name={iconName} size={20} color="#7D7D7D" />
                </EditButton>
            )}
        </CardContainer>
    );
}

const CardContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  background-color: #eaeaea;
  border-radius: 12px;
  margin-bottom: 10px;
  width: 100%;
  overflow: hidden;
`;

const LeftIndicator = styled(View)`
    width: 8px;
    height: 100%;
    background-color: #6a1b9a;
    overflow: hidden;
`;

const Content = styled(View)`
  flex: 1;
  padding: 0px 10px;
`;

const Title = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const DateText = styled(Text)`
  font-size: 14px;
  color: #555;
`;

const EditButton = styled(TouchableOpacity)`
height: 100%;
  background-color: #f0f0f0;
    padding: 5%;
`;