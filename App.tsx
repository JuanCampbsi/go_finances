import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';

import { ThemeProvider } from 'styled-components/native';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'react-native';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme'

import { Routes }from './src/routes';

import { AuthProvider, useAuth } from './src/hooks/auth';


export default function App() {
  const [fontsLoader] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const { userStorageLoading } = useAuth(); 

  if (!fontsLoader || userStorageLoading) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle={'light-content'} />  
          <AuthProvider>
            <Routes />
          </AuthProvider>       
    </ThemeProvider>
  )

}
