import styled from 'styled-components/native';
import theme from '../../global/theme';
import { getStatusBarHeight } from "react-native-iphone-x-helper";


export const Container = styled.View`
    flex: 1;
    padding: ${getStatusBarHeight() + 20}px 20px 0 20px;
    background-color: ${theme.colors.background};
    `;

export const Title = styled.Text`
    font-size: 24px;
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text};
    `;