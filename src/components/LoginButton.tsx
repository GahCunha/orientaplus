import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

interface LoginButtonProps {
  icon: keyof typeof AntDesign.glyphMap;
  text: string;
  backgroundColor: string;
  textColor: string;
  iconColor: string;
  onPress: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  icon,
  text,
  backgroundColor,
  textColor,
  iconColor,
  onPress,
}) => {
  return (
    <ButtonContainer onPress={onPress} backgroundColor={backgroundColor}>
      <AntDesign name={icon} size={24} color={iconColor} />
      <ButtonText color={textColor}>{text}</ButtonText>
    </ButtonContainer>
  );
};

// Styled Components
const ButtonContainer = styled(TouchableOpacity)<{ backgroundColor: string }>`
  flex-direction: row;
  align-items: center;
  width: 90%;
  height: 50px;
  background-color: ${({ backgroundColor }: { backgroundColor: string }) => backgroundColor};
  border-radius: 25px;
  padding: 10px;
  margin-bottom: 15px;
  justify-content: center;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  elevation: 5;
`;

const ButtonText = styled.Text<{ color: string }>`
  font-size: 16px;
  font-weight: bold;
  color: ${({ color }: { color: string }) => color};
  margin-left: 10px;
`;

export default LoginButton;
