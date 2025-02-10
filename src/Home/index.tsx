import { StatusBar } from 'expo-status-bar';
import { Container, Title } from './styles';
import { Image } from 'react-native';

export default function Home() {
  return (
    <>
    <Container>
      <Image source={require('../../assets/logo.png')} 
      style={{ width: 200, height: 200 }}
      />
      
      <Title>TELA INICIAL</Title>
      <StatusBar style="auto" />
    </Container>
    </>
  );
}

