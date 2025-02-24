import Header from "src/components/Header";
import { Container, Title, Button, ButtonText } from "./styles";
import theme from "src/global/theme";

export default function ConfigScreen() {
    function handleLogout() {
        console.log("Logout");
    }
    
    return (
        <Container>
            <Header />
            <Title>Configurações</Title>
            <Button onPress={handleLogout} backgroundColor={theme.colors.button.danger}>
                <ButtonText>Sair</ButtonText>
            </Button>
        </Container>
    );
} 
