import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import {  RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';


export const Container = styled.View`
  background-color: ${(theme.colors.shape)};
  
  width: ${RFValue(300)}px;
  border-radius: 5px;

  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
`;

export const Header = styled.View `

`;
export const Title = styled.Text `

`;
export const Icon = styled(Feather) `

`;
export const Footer = styled.View `

`;
export const Amount = styled.Text `
  font-family: ${(theme.fonts.medium)};

  font-size: ${RFValue(32)}px;

  color: ${(theme.colors.text_dark)};

`;
export const LastTransaction = styled.Text `

`;