import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import {  RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';


export const Container = styled.View`
  background-color: ${(theme.colors.shape)};
  
  width: ${RFValue(300)}px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;

  border-radius: 5px;
  
`;

export const Header = styled.View `
  flex-direction: row;
  justify-content: space-between;
`;
export const Title = styled.Text `

`;
export const Icon = styled(Feather) `
  font-size: ${RFValue(40)}px;
`;
export const Footer = styled.View `

`;
export const Amount = styled.Text `
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;

  color: ${({ theme }) => theme.colors.text_dark};

  margin-top: 38px;

`;
export const LastTransaction = styled.Text `
   font-size: ${RFValue(12)}px;

   color: ${(theme.colors.text)};
`;