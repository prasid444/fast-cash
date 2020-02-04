/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Spinner,
} from 'native-base';
import BasicHeader from '../../components/basic_header';
import {withDomains} from '../../lib/domain';
import {Redirect} from 'react-router-native';
import {defaultWorkspaceRoute} from '../../routes';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form_data: {
        email: 'paneruenish.ep@gmail.com',
        password: 'Paneru123',
      },
    };
  }

  stateUpdater = ({stateKey, valueKey, value, appendObj = {}, callback}) => {
    let newData = this.state[stateKey];
    this.has_changed = true;
    if (valueKey) {
      newData[valueKey] = value;
    }
    if (appendObj) {
      Object.assign(newData, appendObj);
    }
    this.setState(
      {
        [stateKey]: newData,
      },
      () => {
        typeof callback === 'function' && callback();
      },
    );
  };

  render() {
    const {form_data} = this.state;
    const {authenticator} = this.props;
    if (authenticator.isAuthenticated()) {
      return <Redirect to={defaultWorkspaceRoute} />;
    }
    let auth_resp = authenticator.response();
    return (
      <Container>
        <BasicHeader />
        <Content
          style={{
            paddingLeft: 20,
            paddingRight: 20,
          }}
          contentContainerStyle={{
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            // alignItems:'center'
          }}>
          <View
            style={{
              height: 200,
              width: '100%',
              backgroundColor: 'grey',
            }}
          />
          <Form>
            <Item
              floatingLabel
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline',
              }}>
              <Icon name="mail" />
              <Label>Email</Label>
              <Input
                value={form_data.email}
                onChangeText={value => {
                  this.stateUpdater({
                    stateKey: 'form_data',
                    value: value,
                    valueKey: 'email',
                  });
                }}
              />
            </Item>
            <Item
              floatingLabel
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline',
                marginTop: 40,
              }}>
              <Icon name="key" />
              <Label>Password</Label>
              <Input
                secureTextEntry
                value={form_data.password}
                onChangeText={value => {
                  this.stateUpdater({
                    stateKey: 'form_data',
                    value: value,
                    valueKey: 'password',
                  });
                }}
              />
            </Item>
            <Button
              light
              transparent
              onPress={() => {
                this.props.history.replace('/forgot-password');
              }}
              style={{
                marginTop: 20,
              }}>
              <Text
                style={{textAlign: 'right', width: '100%', color: '#82589F'}}>
                Forgot Password?
              </Text>
            </Button>
            <Button
              bordered
              style={{
                marginTop: 50,
                borderColor: auth_resp.fetching ? '#ddd' : '#82589F',
                borderRadius: 20,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                // width:100
              }}
              disabled={auth_resp.fetching}
              onPress={() => {
                // authenticator.persistTokens({
                //   access_token:"ACCESS",
                //   refresh_token:"REFRESH"
                // });
                authenticator.login(form_data);
              }}>
              {auth_resp.fetching ? (
                <Spinner />
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    color: '#82589F',
                    fontWeight: 'bold',
                    fontSize: 22,
                  }}>
                  Login
                </Text>
              )}
            </Button>
          </Form>
          <Button
            light
            transparent
            onPress={() => {
              this.props.history.replace('/register');
            }}
            style={{}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
              }}>
              <Text style={{textAlign: 'center', color: 'black'}}>
                Don't have an account?
              </Text>
              <Text
                style={{
                  color: 'red',
                }}>
                {' '}
                Sign up !!
              </Text>
            </View>
          </Button>
        </Content>
        {/* <Footer style={{height:20,borderColor:'rgba(0,0,0,0)',backgroundColor:'transparent'}}>
          <FooterTab>
            
          </FooterTab>
        </Footer> */}
      </Container>
    );
  }
}

export default withDomains(Login, 'appAuth');
