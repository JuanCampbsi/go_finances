import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { categories } from '../../utils/categories';
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
  Header,
  Trash
} from './styles';


export interface TransactionCardProps {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props extends TouchableOpacityProps {
  data: TransactionCardProps;
}

export function TransactionCard({ data, ...rest }: Props) {
  const [category] = categories.filter(
    item => item.key === data.category
  );
  return (
    <Container> 
      <Header {...rest}>       
          <Title>
            {data.name}
          </Title>
          <Trash name='trash'/>
      </Header>
      
      <Amount type={data.type}>
          {data.type === 'negative' && '-'}
          {data.amount}
        </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>
            {category.name}
          </CategoryName>
        </Category>

        <Date>
          {data.date}
        </Date>
      </Footer>

    </Container>
  );
}

export default TransactionCard;
