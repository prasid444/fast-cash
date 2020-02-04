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
import { View, Text, Container, Content, Icon } from 'native-base';
import NeuButton from '../components/neu_button';
import NeuKeypad from '../components/neu_keypad';
import NeuView from '../components/neu_view';
import NeuSliderButton from '../components/neu_slider_button';

class SendMoneyPage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       send_amount:"00.00"
    }
  }
  
  render() {
    const {send_amount}=this.state;
    return (<Container>
        <View style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',
            flex:1,
            padding:24,
            // backgroundColor:'red'
        }}>
        <View style={{
            display:'flex',
            flexDirection:'row',
            // backgroundColor:'red'
        }}>
            <NeuButton width={80} style={{
            width:'100%',
            borderRadius:40,
            backgroundColor:'white'
          }}  noPressedState={true} onPress={()=>{
              this.props.history.goBack()

          }}>
              <Icon style={{
                  opacity:0.4
              }} name='ios-arrow-back' type='Ionicons'/>
          </NeuButton>
        </View>
        <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center'
        }}>
            <Text style={{
                fontWeight:'200'
            }}>To : </Text>
            <Text style={{
                fontWeight:'bold'
            }}>Anuj Poudel</Text>
        </View>
        <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            paddingTop:40,
            flexWrap:'nowrap',
            overflow:'hidden'
        }}>
            <Text style={{
                fontWeight:'200',
                fontSize:30
            }}>Rs. </Text>
            <Text style={{
                fontWeight:'400',
                fontSize:60
            }}>{send_amount}</Text>
        </View>
        <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
        }}>
            <Text style={{
                fontWeight:'200',
            }}>Balance : </Text>
            <Text style={{
                fontWeight:'200',
            }}>Rs. </Text>

            <Text style={{
                fontWeight:'bold',
            }}>1,100.00</Text>
        </View>
        <View>
        <NeuKeypad maxLength={6} onChange={(keys)=>{
          this.setState({
            send_amount:keys
          })

        }}/>
        </View>
     <View style={{
         display:'flex',
         width:'100%',
         flexDirection:'row',
        //  justifyContent:'center',
     }}>
    <NeuSliderButton/>
     {/* <NeuButton  noPressedState={true}   width={'80%'} style={{ height: 80,backgroundColor:'white',borderRadius: 50}} onPress={() => {
          alert("I was pressed")
        }}>
          <Text style={{ opacity: 0.9 }}>CONTINUE</Text>
        </NeuButton> */}
        </View>

        </View>
    </Container>
     
    );
  }
}

export default SendMoneyPage;
