import React from 'react';
import { HighLightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';
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
  HighLightCards,
  Transactions,
  Title
} from './styles';


export function Dashboard() {
  const data= {
    title: 'Desenvolvimento de site',
    amount: 'R$ 12.000,00',
    category: {
      name:'Vendas',
      icon:'dollar-sign'
    },
    date: '13/04/2020',
  };

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
          type='up'
          title={'Entradas'} 
          amount={'R$ 17.400,00'}
          lastTransaction={'Última entrada dia 13 de abril'}
          />
        <HighLightCard 
          type='down'
          title={'Saídas'}
          amount={'R$ 1.259,00'}
          lastTransaction={'Última saída dia 03 de abril'}
          />
        <HighLightCard 
          type='total'
          title={'Total'} 
          amount={'R$ 16.141,00'} 
          lastTransaction={'01 à 16 de abril'}/>
      </HighLightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionCard data={ data }/>
        <TransactionCard data={ data }/>
      </Transactions>
    </Container>
  )
}

