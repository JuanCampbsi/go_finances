import styled from 'styled-components/native';

export const Container = styled.View `
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    align-items: center;
    justify-content: center;
   

`;

export const Title = styled.Text `
    font-family: ${({ theme}) => theme.fonts.bold};
    font-size: 24px;
    color: ${({ theme }) => theme.colors.title};

`;