import { useNavigation } from "@react-navigation/native";
import LoginButton from "src/components/LoginButton";
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
        type="google"
        onPress={() => handleLogin("Google")}
      />

      <LoginButton
        icon="apple1"
        text="Continuar com Apple ID"
        type="apple"
        onPress={() => handleLogin("Apple")}
      />
    </Container>
  );
}

