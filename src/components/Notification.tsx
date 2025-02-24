import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Animated } from "react-native";
import theme from "src/global/theme";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Notification({ message, type, onClose }: NotificationProps) {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();


    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => onClose());
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Container type={type}>
        <Message>{message}</Message>
      </Container>
    </Animated.View>
  );
}

const Container = styled.View<{ type: "success" | "error" }>`
  background-color: ${(props) =>
    props.type === "success" ? theme.colors.button.confirm : theme.colors.button.danger};
  padding: 12px 20px;
  border-radius: 20px;
  align-self: center;
  margin-top: 10px;
`;

const Message = styled.Text`
  color: ${theme.colors.text_light};
  font-size: 14px;
  font-weight: bold;
`;
