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
import { View, Text, CardItem, Body, Card, Icon, Badge } from 'native-base';
import NeuView from './neu_view';
import moment from 'moment';
import { status_colors } from '../pages/transaction_detail';
import { appCurrency } from '../lib/utils/util';
import { formatMoney } from '../lib/utils/util';
import NeuButton from './neu_button';

class TransactionItem extends Component {
    render() {
        //   let transaction={
        //     id_transaction: 2,
        //     transaction_value: 235,
        //     transaction_status: "COMPLETED",
        //     transaction_type: "SENT",
        //     sender_phone_number: "+9779860167527",
        //     receiver_phone_number: "+9779849933272",
        //     transaction_start_time: "2020-02-05T15:19:23.000+0000",
        //     transaction_accept_time: "2020-02-06T10:16:57.000+0000",
        //   }
        let transaction = this.props.transaction || {};
        let own = this.props.own;
        let type = transaction.transaction_type;
        let accepted = moment(transaction.transaction_accept_time).isValid() ?
            moment(transaction.transaction_accept_time) : null;

        let started = moment(transaction.transaction_start_time).isValid() ?
            moment(transaction.transaction_start_time) : null
            ;
        return (<NeuButton
            noPressedState={true}
            pressed={false}
            onPress={() => {
                typeof this.props.onPress == 'function' && this.props.onPress(transaction.id_transaction, transaction)
            }}
            style={{
                borderRadius: 20,
                height: 110,
                backgroundColor: 'white',
                position: 'relative'
                // overflow:'hidden',
                // padding: 12,
            }}>
           <View style={{
                // width: 20,
                // height: 20,
                // borderRadius: 10,
                // backgroundColor:'white',
                position: 'absolute',
                right: -20,
            }}>
                 <NeuButton
                    pressed={false}
                    onPress={()=>{

                    }}
                    noPressedState={true}
                    style={{
                        borderRadius: 20,
                        backgroundColor:'white',
                        width:20,
                        height:35,
                    }}>
                    <Icon style={{
                        fontSize: 20,
                        color:own?status_colors['REJECTED']:status_colors['COMPLETED'],
                        transform:[{rotateZ:own?'0deg':'180deg'}]
                        
                    }} name='triangle-up' type='Entypo' />
                </NeuButton>

            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                // backgroundColor:'red',
                // height:30,
                width: '94%',
                justifyContent: 'space-between',
                marginLeft: '2%',
                marginRight: '4%',
                // padding:4
            }}>
                <View style={{
                    width: 90
                }}>
                    <NeuView
                        pressed={false}
                        style={{
                            borderRadius: 10,
                            backgroundColor: 'white',
                            // overflow:'hidden',
                            // padding: 12,
                            height: 80
                        }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 8
                        }}>
                            <Text style={{
                                fontWeight: '700',
                                fontSize: 24,
                                opacity: 0.8
                            }}>{started && started.format('DD')}</Text>
                            <Text style={{
                                fontWeight: '200',
                                fontSize: 18,
                                opacity: 0.6,
                            }}>{started && started.format('MMM')}</Text>
                        </View>
                    </NeuView>
                </View>
                <View style={{
                    flex: 1,
                    height: '100%',
                    // backgroundColor:'red',
                    paddingTop: 6,
                    paddingBottom: 6,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        flex: 1
                    }}>
                        <Text style={{
                            fontWeight: '600',
                            fontSize: 18,
                            opacity: 0.9,
                        }}>{own ? transaction.receiver_phone_number : transaction.sender_phone_number}</Text>
                        <Text note>{transaction.own ? "Sent" : "Received"}</Text>
                        {type=="REQUESTED"&&<Text note style={{
                                    fontWeight: '500',
                                    fontSize: 14,
                                    // backgroundColor:'red',
                                    // color:status_colors[transaction.transaction_status],
                                    // marginTop:8
                    }}>{type=="REQUESTED"?"REQUESTED":""}</Text>
                            }
                        {/* <Badge success={type=="SENT"} info={type=="REQUESTED"}>
                                        <Text>{type=="REQUESTED"?"REQUEST":"NORMAL"}</Text>
                                    </Badge> */}
                    </View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        // backgroundColor:'red',
                        // flex:1
                    }}>
                        <Text style={{
                            fontWeight: '600',
                            fontSize: 16,
                            opacity: 0.9,
                            color: own ? status_colors['REJECTED'] : status_colors['COMPLETED']
                        }}>
                            {appCurrency}{formatMoney(transaction.transaction_value)}</Text>

                        <Text style={{
                            fontWeight: '500',
                            fontSize: 12,
                            color: status_colors[transaction.transaction_status],
                            marginTop: 8,
                            textAlign: 'right',
                            width: '100%'
                        }}>{transaction.transaction_status}</Text>
                    </View>


                </View>
            </View>
        </NeuButton>
        );
    }
}

export default TransactionItem;
