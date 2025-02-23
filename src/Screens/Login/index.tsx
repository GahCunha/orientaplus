import { useNavigation } from "@react-navigation/native";
import LoginButton from "src/components/LoginButton";
import theme from "src/global/theme";
import { CalendarImage, Container } from "./styles";


export default function LoginScreen() {
  const navigation = useNavigation();

  const handleLogin = (provider: string) => {
    console.log(`Login com ${provider}`);
    alert(`Login com ${provider}`);
    navigation.navigate("Main" as never);
    navigation.reset({
      index: 0,
      routes: [{ name: "Main" }], 
    });
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

