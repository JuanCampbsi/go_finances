import React from 'react';
import { Text } from 'react-native';

import { 
  Container, 
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName

} from './styles';


export function Dashboard() {
  return (
    <Container>
      <Header>

      <UserInfo>
        <Photo>
          <User>
            <UserGreeting>
              <UserName>

              </UserName>
            </UserGreeting>
          </User>
        </Photo>
      </UserInfo>

      </Header>
    </Container>
  )
}

