import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";

interface TimeSlotProps {
  time: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function TimeSlot({ time, isSelected, onPress }: TimeSlotProps) {
  return (
    <SlotButton isSelected={isSelected} onPress={onPress}>
      <SlotText isSelected={isSelected}>{time}</SlotText>
    </SlotButton>
  );
}

// 🔹 Estilização com `theme.ts`
const SlotButton = styled(TouchableOpacity) <{ isSelected: boolean }>`
  width: 100%;
  height: 70px;
  padding: 15px;
  margin: 5px 0;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isSelected ? props.theme.colors.primary : props.theme.colors.neutral.secondary};
  align-items: flex-start;
  justify-content: center;
`;

const SlotText = styled(Text) <{ isSelected: boolean }>`
  font-family: ${(props) => props.theme.fonts.bold};
  font-size: 20px;
  color: ${(props) =>
    props.isSelected ? props.theme.colors.text_light : props.theme.colors.text};
`;
