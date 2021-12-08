import React from 'react';
import HighLightCard from '../../components/HighlightCard';
import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighLightCards
} from './styles';


export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{ uri: 'https://avatars.githubusercontent.com/u/45372981?v=4g' }} />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Juan Campos</UserName>
            </User>
          </UserInfo>

          <Icon name={'power'} />
        </UserWrapper>
      </Header>
      <HighLightCards >
        <HighLightCard  
          title={'Entradas'} 
          amount={'R$ 17.400,00'}
          lastTransaction={'Última entrada dia 13 de abril'}
          />
        <HighLightCard 
          title={'Saídas'}
          amount={'R$ 1.259,00'}
          lastTransaction={'Última saída dia 03 de abril'}
          />
        <HighLightCard 
          title={'Total'} 
          amount={'R$ 16.141,00'} 
          lastTransaction={'01 à 16 de abril'}/>
      </HighLightCards>
    </Container>
  )
}

