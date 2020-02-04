import React, { Component } from 'react';
import { View, Text, Form, Item, Input, Label, Icon, Button, Container, Content, Footer, FooterTab, H1 } from 'native-base';
import BasicHeader from '../../components/basic_header';


class Signup extends Component {
  render() {
    return (
      <Container>
      <BasicHeader />
      <Content style={{
        paddingLeft: 20,
        paddingRight: 20,
      }} contentContainerStyle={{
        display:'flex',
        height:'100%',
        flexDirection:'column',
        justifyContent:'space-between'
      }}>
        <View>
          <H1 style={{
            fontWeight:'bold',textAlign:'center'
          }}>Sign Up</H1>
          <Text style={{
            textAlign:'center',marginTop:16
          }}>Enter your personal details and create your account.</Text>
        </View>
        <Form>
        <Item floatingLabel style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline'
          }}>
            <Icon name='person' />
            <Label>Full Name</Label>
            <Input />
          </Item>
          <Item floatingLabel style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            marginTop: 40
          }}>
            <Icon name='mail' />
            <Label>Email</Label>
            <Input />
          </Item>
          <Item floatingLabel style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            marginTop: 40
          }}>
            <Icon name='key' />
            <Label>Password</Label>
            <Input />
          </Item>
          <Item floatingLabel style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            marginTop: 40
          }}>
            <Icon name='key' />
            <Label>Confirm Password</Label>
            <Input />
          </Item>
        <Button style={{
            marginTop: 50,
            borderColor:'#82589F',
            borderRadius:20,
            backgroundColor:'#82589F'
            // width:100
          }}><Text style={{ textAlign: 'center', width: '100%',fontWeight:'bold',fontSize:22 }}>Sign up</Text></Button>

        </Form>
        <Button light transparent onPress={()=>{
            this.props.history.replace('/login')
          }} style={{
          }}>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%'
            }}>
              <Text style={{ textAlign: 'center', color: 'black' }}>
                Already have an account?</Text><Text style={{
                  color: 'red'
                }}> Sign in !!</Text>
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

export default Signup;
