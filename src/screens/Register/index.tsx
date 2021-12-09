import React from 'react';
import Button from '../../components/Form/Button';
import Input from '../../components/Form/Input';

import { 
  Container, 
  Title,
  Header,
  Form,
  Filds 
} from './styles';


export function Register() {
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
        </Filds>

        <Button title={'Enviar'}/>
      </Form>  
    </Container>
  );
}

export default Register;