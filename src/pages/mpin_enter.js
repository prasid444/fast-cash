/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-alert */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable space-infix-ops */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {Component} from 'react';
import {Container, Toast} from 'native-base';
import { Text } from 'native-base';
import BasicHeader from '../components/basic_header';
import { View } from 'native-base';
import NeuButton from '../components/neu_button';
import NeuKeypad from '../components/neu_keypad';
import { RESTExecutor, withDomains } from '../lib/domain';
import { showErrorInToast } from '../lib/utils/util';
import { Spinner } from 'native-base';
import NeuSliderButton from '../components/neu_slider_button';

class MPinEnterPage extends Component {
    constructor(props) {
        super(props)

        let location=this.props.location||{};
        let location_state=location.state||{};

        // GETS amount,selectedUser,type:[SEND||REQUEST]

        this.state = {
            ...location_state,
            mpin_value:""
        }

        this.do_transaction=RESTExecutor.post().config({
            label:this.state.type=='SEND'?'create':'request'
        }).callbacks((success)=>{
            let type=this.state.type;

            Toast.show({
                type:'success',
                text:`${type=='SEND'?"Transaction":"Request"} Successfull.`
            });
            this.props.history.push({
                pathname: '/transactiondetails',
                state: {
                  transaction:success.result.transaction
                }
              });
        },(error)=>{
            showErrorInToast(error)
        }).connect(props.domains.transaction);

    }

    render() {
        const {mpin_value,selectedUser={},amount}=this.state;
        let mpin_label=Array(mpin_value.length).fill("*").join("");
        let do_transaction_resp=this.do_transaction.response();

        return (
            <Container style={{
                backgroundColor: 'inherit'
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
       
      
        <React.Fragment>
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
            {mpin_value.length==0?
             <Text style={{
              opacity:0.2,
              width:'100%',
              textAlign:'center',
              paddingLeft:8,
              paddingRight:8
            }}>****</Text>
            :
            <Text style={{
            opacity:1,
            width:'100%',
            textAlign:'center',
            paddingLeft:8,
            paddingRight:8
            }}>{mpin_label}</Text>}</NeuButton>
        </View>
        <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
        }}>
            <Text style={{
                fontWeight:'200',
            }}>Enter your mpin to confirm</Text>
            {/* <Text style={{
                fontWeight:'200',
            }}>Rs. </Text>

            <Text style={{
                fontWeight:'bold',
            }}>1,100.00</Text> */}
        </View>
        </React.Fragment>
        <View>
        
        <NeuKeypad
        key='mpin'
        maxLength={4} 
        onChange={(keys)=>{
          this.setState({
            mpin_value:keys
          })
        }}/>

        </View>
     <View style={{
         display:'flex',
         width:'100%',
         flexDirection:'row',
         justifyContent:'center',
     }}>
    
    {do_transaction_resp.fetching?
    <Spinner />
    :
    <NeuSliderButton
    style={{
        width:'70%'
    }}
    placeholder={`SLIDE TO CONFIRM`}
    onEndReached={()=>{
            if(mpin_value==""){
                Toast.show({
                    type:"danger",
                    text:"MPIN is required for transaction"
                });
                return;
            }
            this.do_transaction.execute({
                "mpin": mpin_value,
                "receiver_phone_number":`${selectedUser.code}${selectedUser.number}`,
                "sender_phone_number":`${selectedUser.code}${selectedUser.number}`,
                "transaction_amount": parseFloat(amount)
            });

    }}/>}
        </View>

        </View>
    
            </Container>
        );
    }
}

export default withDomains(MPinEnterPage,"transaction");
