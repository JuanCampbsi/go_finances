import React, { useCallback, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import HistoryCard from '../../components/HistoryCard';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer,

} from './styles';

import { categories } from '../../utils/categories';
import { useAuth } from '../../hooks/auth';


interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string,
  name: string,
  total: Number,
  totalFormatted: string,
  color: string,
  percent: string
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectDate, setSelectDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  const theme = useTheme();
  const { user } = useAuth();

  function handleChangeDate(action: 'next' | 'prev') {
    if (action === 'next') {
      setSelectDate(addMonths(selectDate, 1));
    } else {
      setSelectDate(subMonths(selectDate, 1));
    }
  }

  async function loadData() {
    setIsLoading(true);
    const dataKey = `@goFinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
      .filter((expensive: TransactionData) =>
        expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectDate.getFullYear()
      );

    const expansivesTotal = expensives
      .reduce((acumullator: number, expensive: TransactionData) => {
        return acumullator + Number(expensive.amount);
      }, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          });

        const percent = `${(categorySum / expansivesTotal * 100).toFixed(0)} %`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
        });
      }

    })
    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }


  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectDate]),
  );


  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

        {
          isLoading ?
            <LoadContainer>
              <ActivityIndicator
                color={theme.colors.primary}
                size={'large'}
              />
            </LoadContainer> :

            <Content
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 24,
                paddingBottom: useBottomTabBarHeight(),
              }}
            >

              <MonthSelect>
                <MonthSelectButton onPress={() => handleChangeDate('prev')}>
                  <MonthSelectIcon name={'chevron-left'} />
                </MonthSelectButton>

                <Month>
                  {
                    format(selectDate, `MMMM, yyyy`, { locale: ptBR })
                  }
                </Month>

                <MonthSelectButton onPress={() => handleChangeDate('next')}>
                  <MonthSelectIcon name={'chevron-right'} />
                </MonthSelectButton>
              </MonthSelect>


              <ChartContainer>
                <VictoryPie
                  data={totalByCategories}
                  colorScale={totalByCategories.map(category => category.color)}
                  style={{
                    labels: {
                      fontSize: RFValue(18),
                      fontWeight: 'bold',
                      fill: theme.colors.shape
                    }
                  }}
                  labelRadius={50}
                  x={(d) => d.percent }              
                  y={(d) => d.total }                  
                />
              </ChartContainer>

              {
                totalByCategories.map(item => (
                  <HistoryCard
                    key={item.key}
                    title={item.name}
                    amount={item.totalFormatted}
                    color={item.color}
                  />
                ))
              }
            </Content>
        }
    </Container>
  );
}

