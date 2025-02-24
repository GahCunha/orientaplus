import styled from 'styled-components/native';
import theme from '../../global/theme';
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { TouchableOpacity } from 'react-native';


export const Container = styled.View`
    flex: 1;
    height: 100%;
    padding: ${getStatusBarHeight() + 20}px 20px 0 20px;
    background-color: ${theme.colors.background};
    `;

export const Title = styled.Text`
    margin-top: 20px;
    font-size: 24px;
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text};
    `;

export const Button = styled(TouchableOpacity) <{ backgroundColor: string }>`
  padding: 15px;
  margin-top:auto;  
  margin-bottom: 20px;
  border-radius: 20px;
  background-color: ${(props) => props.backgroundColor};
  align-items: center;
  justify-content: center;
  width: 48%;
  height: 50px;
  align-self:center;
`;


export const ButtonText = styled.Text`
  font-size: 16px;
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.text_light };
  `;