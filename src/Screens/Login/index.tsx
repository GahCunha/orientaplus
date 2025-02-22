import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import LoginButton from "src/components/LoginButton";
import theme from "src/global/theme";


export default function LoginScreen() {
  const navigation = useNavigation();

  const handleLogin = (provider: string) => {
    console.log(`Login com ${provider}`);
    alert(`Login com ${provider}`);
    navigation.navigate("Main" as never);
  };

  return (
    <Container>
      <CalendarImage source={require("@assets/icon.png")} />

      <LoginButton
        icon="google"
        text="Continuar com o Google"
        backgroundColor={theme.colors.background}
        textColor={theme.colors.text}
        iconColor='red'
        onPress={() => handleLogin("Google")}
      />

      <LoginButton
        icon="apple1"
        text="Continuar com Apple ID"
        backgroundColor="#000"
        textColor={theme.colors.background}
        iconColor={theme.colors.background}
        onPress={() => handleLogin("Apple")}
      />
    </Container>
  );
}

// Styled Components
const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 20px;
`;

const CalendarImage = styled(Image)`
  width: 150px;
  height: 150px;
  margin-bottom: 40px;
`;
