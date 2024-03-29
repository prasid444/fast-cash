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
import { View, Text, Container, Content, Button, Spinner } from 'native-base';
import NeuButton from '../components/neu_button';
import NeuKeypad from '../components/neu_keypad';
import NeuView from '../components/neu_view';
import { Toast } from 'native-base';
import { ScrollView } from 'react-native';
import { withDomains, RESTExecutor } from '../lib/domain';
import { Redirect } from 'react-router-native';
import { defaultHomepageRoute } from '../routes';
import { showErrorInToast } from '../lib/utils/util';

class MPINSetupPage extends Component {
  constructor(props) {
    super(props)
  

    let location = this.props.location || {};
    let location_state = location.state || {};

    this.state = {
       pressedKeys:"",
       remainingTime:30,
       isChanging:location_state.isChanging
    }


    this.set_mpin=RESTExecutor.post().config({
        label:'mpin_set'
    }).callbacks((success)=>{

        Toast.show({
            text:"MPIN Setup Completed",
            type:'success'
        });
        this.props.history.push('/home')
    },(error)=>{
        showErrorInToast(error);
        try{
            this.mpin_keyboard.reset()
        }catch(e){}
    }).connect(props.domains.user)
    // this.startCounting()
  }
  
  startCounting=()=>{
      this.start_counting=setInterval(()=>{
        let  remainingTime=this.state.remainingTime;
        if(remainingTime!=0){
            remainingTime--;
            this.setState({remainingTime})
        }else{
            try{
                clearInterval(this.start_counting)
            }catch(e){

            }
        }
      },1000);
  }

  render() {
    const {pressedKeys,isChanging}=this.state;
    let mpin_label=Array(pressedKeys.length).fill("*").join("");

    let mpin_set_resp=this.set_mpin.response()
    return (
    <Container style={{
      backgroundColor:'inherit',
      // flex:1
    }}>
        <Content style={{
          // flex:1,
          // overflow:'scroll'
        }} contentContainerStyle={{
            display:'flex',
            flexDirection:'column',
            height:'100%',
            justifyContent:'space-between',
            // flex:1,
            padding:24,
            overflow:'scroll'
            // backgroundColor:'red'
        }}>
          <Text></Text>
        {/* <Text style={{
            fontSize:50,
            fontWeight:'100'
        }}>Simple Cash</Text> */}
        <View>
        <Text style={{
            fontWeight:'100'
  }}>{isChanging?"Set new 4-digit code: ":"Set the 4-digit code for further transactions:"}</Text>
        {/* <Text style={{
            fontWeight:'500',
            fontSize:18,
            marginTop:6,
        }}>{userPhone}</Text> */}
        <View style={{
          display:'flex',
          flexDirection:'row',
          flexWrap:'nowrap',
          width:'100%',
          paddingLeft:'5%',
          paddingRight:'5%',
          alignItems:'center',
          justifyContent:'center',
          paddingTop:12,
          paddingBottom:12
          // backgroundColor:'red'
        }}>
          
          <NeuButton width={'60%'} style={{
            width:'100%',
            borderRadius:30
          }}  noPressedState={true} onPress={()=>{

          }}>
            {pressedKeys.length==0?
             <Text style={{
              opacity:0.2,
              width:'100%',
              textAlign:'center',
              paddingLeft:8,
              paddingRight:8
            }}>0000</Text>
            :
            <Text style={{
            opacity:1,
            width:'100%',
            textAlign:'center',
            paddingLeft:8,
            paddingRight:8
            }}>{mpin_label}</Text>}</NeuButton>
        </View>
        <NeuKeypad maxLength={4} 
        onRef={(ref)=>{
            this.mpin_keyboard=ref
        }}
        onChange={(keys)=>{
          this.setState({
            pressedKeys:keys
          })

        }}/>
        <View style={{
            paddingTop:20
        }}>
            {/* <Text style={{
                opacity: 0.4,
            }}>Didn't receive code?</Text>
            {remainingTime!=0?
            <Text>Request new code in 00:{remainingTime}</Text>
            :<Button transparent onPress={()=>{
                Toast.show({
                    type:'success',
                    text:"Pin sent. Please check your messages"
                });
                this.setState({
                    remainingTime:30
                },()=>{
                    this.startCounting()
                })
            }}><Text>Resend</Text></Button>} */}
        </View>
        </View>
        <View style={{
         display:'flex',
         width:'100%',
         flexDirection:'row',
         justifyContent:'center',
     }}>
    {mpin_set_resp.fetching?<Spinner/>:
     <NeuButton  noPressedState={true}   
     disabled={mpin_set_resp.fetching}
     width={'80%'} style={{backgroundColor:'white',borderRadius: 50}} onPress={() => {
        //   alert("I was pressed")
        // this.props.history.push('/home')
        // authenticator.login({
        //   otp:pressedKeys,
        //   phone_number:userPhone
        // })
        if(typeof pressedKeys==='string'&& pressedKeys.length==4){
        this.set_mpin.execute({
            mpin:pressedKeys
        });
        }else{
            Toast.show({type:'danger',text:"Enter valid 4 digit code"})
        }
        }}>
          <Text style={{ opacity: 0.9 }}>SUBMIT</Text>
        </NeuButton>}
        </View>
        </Content>
    </Container>
    );
  }
}

export default MPINSetupPage=withDomains(MPINSetupPage,"user");
