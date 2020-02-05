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
import { View, Text, Container, Content, Button } from 'native-base';
import NeuButton from '../components/neu_button';
import NeuKeypad from '../components/neu_keypad';
import NeuView from '../components/neu_view';
import { Toast } from 'native-base';
import { ScrollView } from 'react-native';

class PinEnterPage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       pressedKeys:"",
       remainingTime:30
    }

    this.startCounting()
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
    const {pressedKeys,remainingTime}=this.state;
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
        }}>Enter the 6-digit code sent to:</Text>
        <Text style={{
            fontWeight:'500',
            fontSize:18,
            marginTop:6,
        }}>+94 333 444 5555</Text>
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
            }}>000000</Text>
            :
            <Text style={{
            opacity:0.6,
            width:'100%',
            textAlign:'center',
            paddingLeft:8,
            paddingRight:8
            }}>{pressedKeys}</Text>}</NeuButton>
        </View>
        <NeuKeypad maxLength={6} onChange={(keys)=>{
          this.setState({
            pressedKeys:keys
          })

        }}/>
        <View style={{
            paddingTop:20
        }}>
            <Text style={{
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
            }}><Text>Resend</Text></Button>}
        </View>
        </View>
        <View style={{
         display:'flex',
         width:'100%',
         flexDirection:'row',
         justifyContent:'center',
     }}>
     <NeuButton  noPressedState={true}   width={'80%'} style={{backgroundColor:'white',borderRadius: 50}} onPress={() => {
        //   alert("I was pressed")
        this.props.history.push('/home')
        }}>
          <Text style={{ opacity: 0.9 }}>CONTINUE</Text>
        </NeuButton>
        </View>
        </Content>
    </Container>
    );
  }
}

export default PinEnterPage;
