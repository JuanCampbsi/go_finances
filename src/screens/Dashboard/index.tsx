  import React, { useCallback, useEffect, useState } from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
 
  import { HighLightCard } from '../../components/HighlightCard';
  import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
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
    Title,
    TransactionList
  } from './styles';
import { useFocusEffect } from '@react-navigation/native';

  export interface DataListProps extends TransactionCardProps {
    id: string;
  }

  export function Dashboard() {
    const [data, setData ]= useState<DataListProps[]>([]);
    
    async function loadTransactions(){
      const dataKey = '@goFinances:transactions';
      const response = await AsyncStorage.getItem(dataKey);
      const transactions = response ? JSON.parse(response) : [];

      const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {

        const amount = Number(item.amount)
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });      
        
          const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      });
      setData(transactionsFormatted);
      console.log(transactionsFormatted)
    }
    
    useEffect(() => {
      loadTransactions();      
    }, []);

    useFocusEffect(
      useCallback(() => {
        loadTransactions();
      }, []),
    );
  

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

          <TransactionList
            data={data }
            keyExtractor={ item => item.id}
            renderItem={({ item }) => <TransactionCard data={ item }/>}
          />          
        </Transactions>
      </Container>
    )
  }

