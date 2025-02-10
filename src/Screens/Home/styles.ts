import styled from 'styled-components/native';
import theme from '../../global/theme';

export const Container = styled.View`
    flex: 1;
    background-color: ${theme.colors.background};
    align-items: center;
    justify-content: center;
    `;

export const Title = styled.Text`
    font-size: 24px;
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text};
    `;