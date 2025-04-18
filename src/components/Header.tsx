import styled from "styled-components/native";
import theme from "src/global/theme";

export default function Header() {
  return (
    <Container>
      <Logo source={require("@assets/icon.png")} />
      <Avatar />
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
`;

const Logo = styled.Image`
  width: 80px;
  height: 80px;
`;

const Avatar = styled.View`
    width: 60px;
    height: 60px;
    background-color: ${theme.colors.neutral.secondary};
    border-radius: 40px;
    //border: 1px solid ${theme.colors.primary};
`;