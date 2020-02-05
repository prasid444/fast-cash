/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-alert */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable space-infix-ops */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import { View, Text, Container, Content } from 'native-base';
import NeuButton from '../components/neu_button';
import NeuKeypad from '../components/neu_keypad';
import NeuView from '../components/neu_view';
import NeuPressedView from '../components/neu_pressedview';
import NeuUnpressedView from '../components/neu_unpressedview';
import { RESTExecutor, withDomains } from '../lib/domain';
import { showErrorInToast } from '../lib/utils/util';
import { Toast } from 'native-base';
import {defaultHomepageRoute} from '../routes';
import { Redirect } from 'react-router-native';

class LoginPage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       pressedKeys:"",
       showKeyPad:false
    }
    this.login_signup=RESTExecutor.post().config({
      label:'login_signup'
    }).callbacks((success)=>{
        Toast.show({
          type:"success",
          text:success.result.message
        });
        this.props.history.push({
          pathname:'/pin-enter',
          state:{
            user_pin:success.result.otp
          }
        });
    },(error)=>{
      showErrorInToast(error)
    }).connect(props.domains.user)
  }
  
  render() {
    const {pressedKeys,showKeyPad}=this.state;
    let login_signup_resp=this.login_signup.response();
    const {authenticator}=this.props;
    if(authenticator.isAuthenticated()){
      return <Redirect
       to={defaultHomepageRoute}
     />
    }

    return (<Container>
        <Content contentContainerStyle={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',
            flex:1,
            padding:24,
            backgroundColor:'rgba(245, 245, 245,1)'
        }}>
        <Text style={{
            fontSize:50,
            fontWeight:'100',
            opacity:0.8
        }}>Simple Cash</Text>
        <View>
        <Text style={{
            fontWeight:'100',
            opacity:0.5
        }}>Enter your mobile number to continue</Text>
        <View style={{
          display:'flex',
          flexDirection:'row',
          flexWrap:'nowrap',
          width:'100%',
          paddingLeft:'5%',
          paddingRight:'5%'
          // backgroundColor:'red'
        }}>
          <NeuButton width={'30%'} style={{
            width:'100%',
            borderRadius:10
          }}  noPressedState={true} onPress={()=>{

          }}>
            
            <Text style={{
              opacity:0.6,
            }}>+977</Text>
          </NeuButton>
          <NeuButton width={'70%'} style={{
            width:'100%',
            borderRadius:10
          }}  noPressedState={true} onPress={()=>{
            this.setState({showKeyPad:true})

          }}>
            {pressedKeys.length==0?
             <Text style={{
              opacity:0.2,
              width:'100%',
              textAlign:'left',
              paddingLeft:8,
              paddingRight:8
            }}>9860167527</Text>
            :
            <Text style={{
            opacity:0.6,
            width:'100%',
            textAlign:'left',
            paddingLeft:8,
            paddingRight:8
            }}>{pressedKeys}</Text>}</NeuButton>
        </View>
        {true&&
        <NeuKeypad maxLength={10} onChange={(keys)=>{
          this.setState({
            pressedKeys:keys
          })

        }}/>}
        </View>
     <View style={{
         display:'flex',
         width:'100%',
         flexDirection:'row',
         justifyContent:'center',
     }}>
     <NeuButton disabled={login_signup_resp.fetching}  noPressedState={true}   width={'80%'} style={{ backgroundColor:'white',borderRadius: 50}} onPress={() => {

          if(pressedKeys.length!=10){
            Toast.show({type:'danger',text:"Please Enter Valid Phone Number"})
          }else{
            this.props.history.push({
              pathname:'/pin-enter',
              state:{
                user_pin:"467141",
                user_number:`+977${pressedKeys}`
              }
            });
            // this.login_signup.execute({
            //   "phone_number":`+977${pressedKeys}`
            // });
          }
        }}>
          <Text style={{ opacity: 0.9 }}>CONTINUE</Text>
        </NeuButton>
        </View>

        </Content>
    </Container>
     
    );
  }
}

export default withDomains(LoginPage,"user","appAuth");
