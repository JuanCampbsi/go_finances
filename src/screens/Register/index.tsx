import React, {useEffect, useState} from 'react';
import { 
  Modal, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert 
} from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Form/Button';
import InputForm from '../../components/Form/InputForm';
import CategorySelectButton from '../../components/Form/CategorySelectButton';
import TransactionTypeButton from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';

import { 
  Container, 
  Title,
  Header,
  Form,
  Filds,
  FildsTypeButton
} from './styles';

interface FormData {
  name: string,
  amount: string
}
type NavigationProps = {
  navigate:(screen:string) => void;
}

const schema = Yup.object().shape({
  name: Yup
  .string()
  .required('Nome é obrigatório'),
  amount: Yup
  .number()
  .typeError('Informe um valor númerico')
  .positive('O valor não pode ser negativo')
  .required('O valor é obrigatório')
})

export function Register() {
  const dataKey = '@goFinances:transactions';
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })
  const navigation = useNavigation<NavigationProps>();

  const { 
    control, 
    handleSubmit,
    reset,
    formState: { errors }
   } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionType (type: 'positive' | 'negative'){
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false);
  }

  async function handleRegister(form : FormData){
    if(!transactionType)
      return Alert.alert('Selecione o tipo da transação')

    if(category.key === 'category')
     return Alert.alert('Selecione a categoria')

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try {     
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
      
      reset();
      setTransactionType('');
      setCategory({
          key: 'category',
          name: 'Categoria'
      });

      navigation.navigate('Listagem');

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar');
    }    
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Filds>
            <InputForm
              name='name'
              control={control}
              placeholder={'Nome'}
              autoCapitalize='sentences'   
              autoCorrect={false}
              error={ errors.name && errors.name.message }        
            />
            <InputForm 
              name='amount'
              control={control}
              placeholder={'Preço'}  
              keyboardType='numeric'  
              error={ errors.amount && errors.amount.message }        
        
            />

            <FildsTypeButton>
              <TransactionTypeButton 
                title={'Income'}
                type={'up'}
                onPress={() => handleTransactionType('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton 
                title={'Outcome'}
                type={'down'}
                onPress={() => handleTransactionType('negative')}
                isActive={transactionType === 'negative'}
            />
            </FildsTypeButton>

            <CategorySelectButton 
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Filds>

          <Button 
            title={'Enviar'}
            onPress={handleSubmit(handleRegister)}
          />
        </Form> 

        <Modal visible={categoryModalOpen}>
          <CategorySelect 
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal> 
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default Register;