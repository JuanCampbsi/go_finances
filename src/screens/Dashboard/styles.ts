import styled from 'styled-components/native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useReducer } from 'react';

export const Container = styled.View `
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;
export const Header = styled.View `
    background-color: ${({ theme }) => theme.colors.primary};
    width: 100%;
    height: ${RFPercentage(42)}px;

`;

export const UserInfo = styled.View `


`;
export const Photo = styled.View `


`;
export const User = styled.View `


`;
export const UserGreeting = styled.View `


`;
export const UserName = styled.View `


`;