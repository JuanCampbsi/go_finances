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
  TransactionList,
  LoadContainer,
  LogoutButton
} from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';


export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighLightProps {
  amount: string;
  lastTransaction: string;
}

interface HighLightData {
  entries: HighLightProps;
  expansives: HighLightProps;
  total: HighLightProps;
}

export function Dashboard() {
  const [isRemove, setIsRemove] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataListProps[]>([]);
  const [highLightData, setHighLightData] = useState<HighLightData>({} as HighLightData);

  const theme = useTheme();
  const { signOut, user } = useAuth();

  function getLastTransaction(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) {

    const collectionFilttered = collection
    .filter(transaction => transaction.type === type)

    if(collectionFilttered.length === 0)
      return 0;

    const lastTransactions = new Date(
      Math.max.apply(Math, collectionFilttered
        .map(transaction => new Date(transaction.date).getTime())
      ))
    return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString('pt-BR', { month: 'long' })}`
  }

  async function loadTransactions() {
    const dataKey = `@goFinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expansiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {

        if (item.type === 'positive') {
          entriesTotal += Number(item.amount);
        } else {
          expansiveTotal += Number(item.amount);
        }

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
    const lastTransactionEntries = getLastTransaction(transactions, 'positive');
    const lastTransactionExpansive = getLastTransaction(transactions, 'negative');
    const totalInterval = lastTransactionExpansive === 0 
    ? 'Não há transações'
    : `01 à ${lastTransactionExpansive}`

    const total = entriesTotal - expansiveTotal;
    setHighLightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionEntries === 0 
        ? 'Não há transações' 
        :`Última entrada dia ${lastTransactionEntries}`
      },
      expansives: {
        amount: expansiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionExpansive === 0 
        ? 'Não há transações' 
        : `Última saída dia ${lastTransactionExpansive}`
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })
    setIsLoading(false);
    setIsRemove(false);
  }

  async function handleRemove(id: string) {
    const dataKey = `@goFinances:transactions_user:${user.id}`;
    const dataArray = await AsyncStorage.getItem(dataKey);
    const currentData = dataArray ? JSON.parse(dataArray) : []; 

    try {
      const dataNew = [...currentData];
      const newData = currentData.findIndex((item: DataListProps) => item.id === id);
      dataNew.splice(newData, 1);
      
      setData(oldSate => oldSate.filter(
          item => item.id !== id
      ));
      AsyncStorage.setItem(dataKey, JSON.stringify(dataNew)); 
             
    } catch (error) {

    }
    setIsRemove(true);
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();      
    }, [isRemove]),
  );


  return (
    <Container>
      {
        isLoading ?
          <LoadContainer>
            <ActivityIndicator
              color={theme.colors.primary}
              size={'large'}
            />
          </LoadContainer>
          :
          <>
            <Header>
              <UserWrapper>
                <UserInfo>
                  <Photo
                    source={{ uri: user.photo }} />
                  <User>
                    <UserGreeting>Olá, </UserGreeting>
                    <UserName>{ user.name }</UserName>
                  </User>
                </UserInfo>

              <LogoutButton onPress={ signOut }>
                <Icon name={'power'} />
              </LogoutButton>
              </UserWrapper>
            </Header>

            <HighLightCards >
              <HighLightCard
                type='up'
                title={'Entradas'}
                amount={highLightData.entries.amount}
                lastTransaction={highLightData.entries.lastTransaction}
              />
              <HighLightCard
                type='down'
                title={'Saídas'}
                amount={highLightData.expansives.amount}
                lastTransaction={highLightData.expansives.lastTransaction}
              />
              <HighLightCard
                type='total'
                title={'Total'}
                amount={highLightData.total.amount}
                lastTransaction={highLightData.total.lastTransaction} />
            </HighLightCards>

            <Transactions>
              <Title>Listagem</Title>

              <TransactionList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                  <TransactionCard
                    data={item}
                    onPress={() => handleRemove(item.id)}
                  />}
              />
            </Transactions>
          </>
      }
    </Container>
  )
}

