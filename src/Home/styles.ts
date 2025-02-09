import styled from 'styled-components/native';


export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }: any) => theme.colors.background};
    align-items: center;
    justify-content: center;
    `;

export const Title = styled.Text`
    font-size: 24px;
    font-family: ${({ theme }: any) => theme.fonts.bold};
    color: ${({ theme }: any) => theme.colors.text};
    `;