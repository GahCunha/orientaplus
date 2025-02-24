import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import theme from "src/global/theme"; // 🔹 Importando o tema

interface LoginButtonProps {
  icon: keyof typeof AntDesign.glyphMap;
  text: string;
  type: "google" | "apple"; // Define tipos para escolher cores automaticamente
  onPress: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ icon, text, type, onPress }) => {
  const isGoogle = type === "google";

  return (
    <ButtonContainer isGoogle={isGoogle} onPress={onPress}>
      <AntDesign name={icon} size={24} color={isGoogle ? "#EA4335" : theme.colors.text_light} />
      <ButtonText isGoogle={isGoogle}>{text}</ButtonText>
    </ButtonContainer>
  );
};

// Styled Components
const ButtonContainer = styled(TouchableOpacity)<{ isGoogle: boolean }>`
  flex-direction: row;
  align-items: center;
  width: 90%;
  height: 50px;
  background-color: ${(props) => (props.isGoogle ? theme.colors.background : theme.colors.neutral.primary)};
  border-radius: 25px;
  padding: 10px;
  margin-bottom: 15px;
  justify-content: center;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  shadow-offset: 0px 5px;
`;

const ButtonText = styled.Text<{ isGoogle: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.isGoogle ? theme.colors.text : theme.colors.text_light)};
  margin-left: 10px;
`;

export default LoginButton;
