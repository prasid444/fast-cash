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
import { withDomains, RESTExecutor } from '../lib/domain';
import { Toast,Spinner } from 'native-base';
import { showErrorInToast, country_list } from '../lib/utils/util';
import NeuDropdown from '../components/neu_dropdown';
import { formatMoney } from '../lib/utils/util';

const transaction={
    "mpin": "string",
  "receiver_phone_number": "string",
  "transaction_amount": 0
}

const AMOUNT_STEP=0;
const MPIN_STEP=1;

class ReceiveMoneyPage extends Component {
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
       selectedUser:selected_contact,
       step:AMOUNT_STEP,
       mpin_value:""
    }

    this.send_money=RESTExecutor.post().config({
        label:'request'
    }).callbacks((success)=>{
        Toast.show({
            type:'success',
            text:"Transaction Request Successfull."
        });
        this.props.history.push({
            pathname: '/transactiondetails',
            state: {
              transaction:{...success.result.transaction,own:false}
            }
          });
    },(error)=>{
        showErrorInToast(error);
    }).connect(props.domains.transaction);


    this.get_user=RESTExecutor.list().config({
        label:'user_detail'
      }).callbacks((success)=>{
      },(error)=>{
        showErrorInToast(error)
      }).connect(props.domains.user);
    
  }

  stateUpdater = ({
    stateKey,
    valueKey,
    value,
    appendObj = {},
    callback
}) => {
    let newData = this.state[stateKey];
    this.has_changed = true;
    if (valueKey) {
        newData[valueKey] = value;
    }
    if (appendObj) {
        Object.assign(newData, appendObj)
    }
    console.log(newData);
    this.setState({
        [stateKey]: newData
    }, () => {
        typeof callback === 'function' && callback()
    })
}
  
  render() {
    const {send_amount,selectedUser,step,mpin_value}=this.state;
    let send_money_resp=this.send_money.response();

    let get_user_resp=this.get_user.response();
    let user_data=get_user_resp.result||{};

    return (<Container style={{
        backgroundColor: 'inherit',
    }}>
         <View style={{
              display:'flex',
              flexDirection:'column',
              justifyContent:'space-between',
              flex:1,
              overflow:'scroll',
              padding:4,
            //   backgroundColor:'red'
          }}>
       <BasicHeader
       bodyStyle={{flex:null}}
       body={
         <Text style={{
           width:'100%',
           textAlign:'center',
           fontSize:18,
           fontWeight:'500',
           opacity:0.8
       }}>From : {selectedUser.number}</Text>
       }
       />
        {/* <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            // backgroundColor:'green'
        }}>
            <Text style={{
                fontWeight:'200'
            }}>From : </Text>
            <Text style={{
                fontWeight:'bold'
        }}>{selectedUser.number}</Text>
        </View> */}
        <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            width:'100%',
            alignItems:'center',
        }}>
            <Text style={{
                fontWeight:'200'
            }}>Country Code : </Text>
        <NeuDropdown
          value={selectedUser&&selectedUser.code}
          options={country_list}
          placeholder="ZIP CODE"
          keyText='dial_code'
          labelText='dial_code'
          width={'40%'} style={{
            width:'100%',
            borderRadius:10
          }}  noPressedState={true} 
          onChange={(value)=>{
              this.stateUpdater({
                  stateKey:'selectedUser',
                  value:value,
                  valueKey:'code'
              })
          }}
          />
        </View>
        {step==AMOUNT_STEP&&<React.Fragment>
        <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            // paddingTop:4,
            flexWrap:'nowrap',
            overflow:'hidden'
        }}>
            <Text style={{
                fontWeight:'200',
                fontSize:30
            }}>Rs. </Text>
            <Text style={{
                fontWeight:'400',
                fontSize:40
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
            }}>{formatMoney(user_data.current_balance)}</Text>
        </View>
        </React.Fragment>}
      
       <View>
       {step==AMOUNT_STEP&&
        <NeuKeypad 
        hasDot
        maxLength={6} onChange={(keys)=>{
          this.setState({
            send_amount:keys
          })

        }}/>}
        {step==MPIN_STEP&&
        <NeuKeypad 
        maxLength={4} onChange={(keys)=>{
          this.setState({
            mpin_value:keys
          })
        }}/>}
        </View>
     <View style={{
         display:'flex',
         width:'100%',
         flexDirection:'row',
         justifyContent:'center',
     }}>
         {send_money_resp.fetching?
    <Spinner />
    :
    <NeuSliderButton 
    style={{
        width:'70%'
    }}
        placeholder={`SlIDE TO ${step==AMOUNT_STEP?"REQUEST":"CONFIRM"}`}

    onEndReached={()=>{
        if(!selectedUser.number||send_amount==""||send_amount=="00.00"||!selectedUser.code){
            Toast.show({
                type:"danger",
                text:"Phone Number, Country code and amount required"
            });
            return;

        }else{
            this.props.history.push({
                pathname:'/confirm-transaction',
                state:{
                    amount:send_amount,
                    selectedUser:selectedUser,
                    type:'REQUEST'
                }
            });
        //     if(step==AMOUNT_STEP){
        //         this.setState({
        //             step:MPIN_STEP
        //         });
        //     }else{
        //         if(mpin_value==""){
        //             Toast.show({
        //                 type:"danger",
        //                 text:"MPIN is required for transaction"
        //             });
        //             return;
        //         }
        // this.send_money.execute({
        //     "mpin": "1111",
        //     "sender_phone_number": `${selectedUser.code}${selectedUser.number}`,
        //     "transaction_amount": parseFloat(send_amount)
        // });
        // }
        }
        // this.props.history.push('/transactiondetails')
    }}/>}
        </View>

        </View>
    </Container>
     
    );
  }
}

export default ReceiveMoneyPage=withDomains(ReceiveMoneyPage,"transaction","user");
