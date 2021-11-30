import React from 'react';
import HighLightCard from '../../components/HighlightCard';

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon

} from './styles';


export function Dashboard() {
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

      <HighLightCard />

    </Container>
  )
}

