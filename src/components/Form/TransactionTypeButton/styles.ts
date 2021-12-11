import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface TypeProps {
  type: 'up' | 'down';
}
interface ContainerProps {
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-width: ${({isActive}) => isActive ? 0 : 1.5}px;
  border-style: solid; 
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  padding: 16px;

  ${({ isActive, type }) => isActive && type === 'up' && css `
      background-color: ${({ theme }) => theme.colors.sucess_light};
  `}; 

${({ isActive, type }) => isActive && type === 'down' && css `
      background-color: ${({ theme }) => theme.colors.attention_light};
  `}; 
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
 
  ${({ type }) => type === 'up' && css `
      color: ${({ theme }) => theme.colors.sucess};
    `};

  ${({ type }) => type === 'down' && css`
      color: ${({ theme }) => theme.colors.attention};
    `};
`;