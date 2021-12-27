import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HistoryCard from '../../components/HistoryCard';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { 
  Container,
  Header,
  Title,
  Content,
  ChartContainer
 } from './styles';
import { categories } from '../../utils/categories';

 interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
 }
 interface CategoryData{
   key: string,
   name: string,
   total: Number,
   totalFormatted: string,
   color: string,
   percent: string
 }

export function Resume(){
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  const theme = useTheme();

  async function loadData(){
      const dataKey = '@goFinances:transactions';
      const response = await AsyncStorage.getItem(dataKey);
      const responseFormatted = response ? JSON.parse(response) : [];

      const expensives = responseFormatted
      .filter((expensive: TransactionData) => expensive.type === 'negative');

      const expansivesTotal = expensives
        .reduce((acumullator: number, expensive: TransactionData) => {
          return acumullator + Number(expensive.amount);
      }, 0);

      console.log(expansivesTotal)

      const totalByCategory: CategoryData[] = [];

      categories.forEach( category => {
        let categorySum = 0;

        expensives.forEach((expensive:TransactionData) => {
          if(expensive.category === category.key){
            categorySum += Number(expensive.amount);
          }
        });
        
        if(categorySum > 0) {
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
  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      
      <Content>
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
              x='percent'
              y='total'
            />
          </ChartContainer>

        {
            totalByCategories.map( item => (
              <HistoryCard 
                  key={item.key}
                  title={item.name}
                  amount={item.totalFormatted}
                  color={item.color}
              />
            ))
        }
      </Content>
    </Container>
  );
}

