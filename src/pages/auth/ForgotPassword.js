import React, { Component } from 'react';
import { View, Text, Form, Item, Input, Label, Icon, Button, Container, Content, Footer, FooterTab, H1 } from 'native-base';
import BasicHeader from '../../components/basic_header';


class ForgotPassword extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <Container>
                <BasicHeader />
                <Content style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                }} contentContainerStyle={{
                    display: 'flex',
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <View>
                        <H1 style={{
                            fontWeight: 'bold', textAlign: 'center'
                        }}>Forgot Password</H1>
                        <Text style={{
                            textAlign: 'center', marginTop: 16
                        }}>Enter the email address associated with this account.</Text>
                    </View>
                    <View style={{
                        height: 200,
                        width: '100%',
                        backgroundColor: 'grey'
                    }}>

                    </View>
                    <Form>
                        <Item floatingLabel style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 40
                        }}>
                            <Icon name='mail' />
                            <Label>Email</Label>
                            <Input />
                        </Item>
                        <Button style={{
                            marginTop: 50,
                            borderColor: '#82589F',
                            borderRadius: 20,
                            backgroundColor: '#82589F'
                            // width:100
                        }}><Text style={{ textAlign: 'center', width: '100%', fontWeight: 'bold', fontSize: 22 }}>Submit</Text></Button>
                    </Form>
                    <Button light transparent style={{
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

export default ForgotPassword;
