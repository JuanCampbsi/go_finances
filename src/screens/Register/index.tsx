import React, {useState} from 'react';
import Button from '../../components/Form/Button';
import CategorySelect from '../../components/Form/CategorySelect';
import Input from '../../components/Form/Input';
import TransactionTypeButton from '../../components/Form/TransactionTypeButton';

import { 
  Container, 
  Title,
  Header,
  Form,
  Filds,
  FildsTypeButton
} from './styles';


export function Register() {
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionType (type: 'up' | 'down'){
    setTransactionType(type);
  }
  

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Filds>
          <Input 
            placeholder={'Nome'}
          />
          <Input 
            placeholder={'Preço'}
          />

          <FildsTypeButton>
            <TransactionTypeButton 
              title={'Income'}
              type={'up'}
              onPress={() => handleTransactionType('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton 
              title={'Outcome'}
              type={'down'}
              onPress={() => handleTransactionType('down')}
              isActive={transactionType === 'down'}
          />
          </FildsTypeButton>

          <CategorySelect 
            title='Categoria'
          />
        </Filds>

        <Button title={'Enviar'}/>
      </Form>  
    </Container>
  );
}

export default Register;