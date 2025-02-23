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

// Estilização
const SlotButton = styled(TouchableOpacity) <{ isSelected: boolean }>`
  width: 100%;
  padding: 15px;
  margin: 5px 0;
  border-radius: 10px;
  background-color: ${(props: { isSelected: boolean }) => (props.isSelected ? "#6A1B9A" : "#D3D3D3")};
  align-items: start;
`;

const SlotText = styled(Text) <{ isSelected: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props: { isSelected: boolean }) => (props.isSelected ? "#fff" : "#333")};
`;
