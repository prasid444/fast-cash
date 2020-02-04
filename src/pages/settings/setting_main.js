import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  List,
} from 'native-base';
import BasicHeader from '../../components/basic_header';

class SettingMain extends Component {
  render() {
    return (
      <Container>
        <BasicHeader
          title="Settings"
          onLeftClick={() => {
            this.props.history.goBack();
          }}
        />
        <Content>
          <List>
            <ListItem icon>
              <Left>
                <Button style={{backgroundColor: '#FF9501'}}>
                  <Icon active name="airplane" />
                </Button>
              </Left>
              <Body>
                <Text>Airplane Mode</Text>
              </Body>
              <Right>
                <Switch value={false} />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{backgroundColor: '#007AFF'}}>
                  <Icon active name="wifi" />
                </Button>
              </Left>
              <Body>
                <Text>Wi-Fi</Text>
              </Body>
              <Right>
                <Text>GeekyAnts</Text>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{backgroundColor: '#007AFF'}}>
                  <Icon active name="bluetooth" />
                </Button>
              </Left>
              <Body>
                <Text>Bluetooth</Text>
              </Body>
              <Right>
                <Text>On</Text>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default SettingMain;
