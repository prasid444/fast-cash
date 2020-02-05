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
import NeuUnpressedView from '../components/neu_unpressedview';
import BasicHeader from '../components/basic_header';

class TransactionDetail extends Component {
  render() {
    return (<Container style={{
        backgroundColor:'inherit',
      }}>
          <BasicHeader
        right={<Text style={{
            opacity:0.6,
            width:100
        }}>Transaction Detail</Text>}
        />
        <View style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',
            flex:1,
        }}>
        <View></View>
        <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            paddingTop:40,
            flexWrap:'nowrap',
            overflow:'hidden'
        }}>
            <NeuUnpressedView style={{
                borderRadius:30,
                backgroundColor:'white',
                height:300
            }}>
                <View style={{
                    display:'flex',
                    flexDirection:'column',
                    padding:20,
                    width:'100%',
                    height:'100%',
                    justifyContent:'space-between'
                }}>
                <Text style={{
                    fontWeight:'500',
                    fontSize:30
                }}>Received</Text>
                <View style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'
                   
                }}>
                    <Text style={{
                        opacity: 0.5,
                    }}>Total</Text>
                    <Text style={{
                        fontSize:30
                    }}>Rs. 100.00</Text>
                </View>
                <View style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    opacity: 0.5,
                   
                }}>
                    <Text>Received From</Text>
                    <Text>Anuj Poudel</Text>
                </View>
                <View style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    opacity: 0.5,
                   
                }}>
                    <Text>Received at</Text>
                    <Text>Jan 2,2020 4:00PM</Text>
                </View>
                <View style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    opacity: 0.5,
                   
                }}>
                    <Text>Transaction ID</Text>
                    <Text>110202920</Text>
                </View>
                </View>
            </NeuUnpressedView>
        </View>
        <View>
        </View>
     <View style={{
         display:'flex',
         width:'100%',
         flexDirection:'row',
         justifyContent:'center',
         paddingBottom:16
     }}>
    
     <NeuButton  noPressedState={true}   width={'80%'} style={{backgroundColor:'white',borderRadius: 50}} onPress={() => {
          alert("I was pressed")
        }}>
            <View  style={{ opacity: 0.6,display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center' }}>
        <Icon name='error-outline' type='MaterialIcons'/>
        <Text style={{marginLeft:6}}>Report an issue</Text>
        </View>
        </NeuButton>
        </View>

        </View>
    </Container>
    )
  }
}

export default TransactionDetail;
