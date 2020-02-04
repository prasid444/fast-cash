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

class LoginPage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       pressedKeys:""
    }
  }
  
  render() {
    const {pressedKeys}=this.state;
    return (<Container>
        <Content contentContainerStyle={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',
            flex:1,
            padding:24,
            backgroundColor:'rgba(250, 250, 248,1)'
        }}>
        <Text style={{
            fontSize:50,
            fontWeight:'100'
        }}>Simple Cash</Text>
        <View>
        <Text style={{
            fontWeight:'100'
        }}>Enter your mobile number to continue</Text>
        <NeuUnpressedView style={{
          backgroundColor:'white',
          borderRadius:20,
        }} />
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
        <NeuKeypad maxLength={10} onChange={(keys)=>{
          this.setState({
            pressedKeys:keys
          })

        }}/>
        </View>
     <View style={{
         display:'flex',
         width:'100%',
         flexDirection:'row',
         justifyContent:'center',
     }}>
     <NeuButton  noPressedState={true}   width={'80%'} style={{ height: 80,backgroundColor:'white',borderRadius: 50}} onPress={() => {
          // alert("I was pressed")
          this.props.history.push('/pin-enter')
        }}>
          <Text style={{ opacity: 0.9 }}>CONTINUE</Text>
        </NeuButton>
        </View>

        </Content>
    </Container>
     
    );
  }
}

export default LoginPage;
