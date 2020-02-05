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
import BasicHeader from '../components/basic_header';

class SendMoneyPage extends Component {
  constructor(props) {
    super(props)
  
    let location=this.props.location||{};
    let location_state=location.state||{};
    let selected_contact=location_state.selected_contact||{};
    // this.setState({selectedUser:selected_contact})

    console.log("this state",this.state)
    console.log("this selected",location_state)
    this.state = {
       send_amount:"00.00",
       selectedUser:selected_contact
    }
    
  }
  
  render() {
    const {send_amount,selectedUser}=this.state;
    return (<Container style={{
        backgroundColor: 'inherit',
    }}>
        <BasicHeader/>
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
            justifyContent:'center'
        }}>
            <Text style={{
                fontWeight:'200'
            }}>To : </Text>
            <Text style={{
                fontWeight:'bold'
        }}>{selectedUser.name}</Text>
        </View>
        <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            paddingTop:16,
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
    <NeuSliderButton onEndReached={()=>{
        this.props.history.push('/transactiondetails')
    }}/>
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
