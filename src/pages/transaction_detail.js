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
import { View, Text, Container, Content, Icon, Spinner } from 'native-base';
import NeuButton from '../components/neu_button';
import NeuUnpressedView from '../components/neu_unpressedview';
import BasicHeader from '../components/basic_header';
import { RESTExecutor, withDomains } from '../lib/domain';
import { Toast } from 'native-base';
import { showErrorInToast } from '../lib/utils/util';
import moment from 'moment';
import { defaultHomepageRoute } from '../routes';

export const status_colors={
    "PENDING":"blue",
    "COMPLETED":"#52c41a",
    "REJECTED":"red"
}
class TransactionDetail extends Component {
    constructor(props) {
        super(props)

        let location = this.props.location || {};
        let location_state = location.state || {};
        let transaction_detail = location_state.transaction || {};

        this.state = {
            transaction_detail: transaction_detail
        }

        this.accept_money=RESTExecutor.post().config({
            label:'receiver_decision'
        }).callbacks((success)=>{

            this.setState({
                transaction_detail:{...success.result.transaction,own:false}
            })
            Toast.show({
                type:'success',
                text:"Transaction Accepted"
            })
        },(error)=>{
            showErrorInToast(error)
        }).connect(props.domains.transaction);

        this.accept_request=RESTExecutor.post().config({
            label:'sender_decision'
        }).callbacks((success)=>{
            this.setState({
                transaction_detail:{...success.result.transaction,own:false}
            });
            Toast.show({
                type:'success',
                text:"Request Accepted"
            })
        },(error)=>{
            showErrorInToast(error);
        }).connect(props.domains.transaction);

    }

    render() {
        const { transaction_detail } = this.state;
        let type = transaction_detail.transaction_type;
        let accept_money_resp=this.accept_money.response();
        let accept_request_resp=this.accept_request.response();


        return (<Container style={{
            backgroundColor: 'inherit',
        }}>
            <BasicHeader
                bodyStyle={{flex:null}}
                body={
                  <Text style={{
                    opacity: 1,
                    width:'100%',
                    textAlign:'center',
                    fontSize:30,
                    fontWeight:'600'
                }}>Transaction Detail</Text>
                }
            />
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
            }}>
                <View>
                {/* <Text style={{
                    opacity: 1,
                    width:'100%',
                    textAlign:'center',
                    fontSize:40,
                    fontWeight:'bold'
                }}>Transaction Detail</Text> */}
                </View>
                <View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 40,
                        flexWrap: 'nowrap',
                        overflow: 'hidden'
                    }}>
                        <NeuUnpressedView style={{
                            borderRadius: 30,
                            backgroundColor: 'white',
                            height: 300
                        }}>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: 20,
                                width: '100%',
                                height: '100%',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{
                                    fontWeight: '500',
                                    fontSize: 30,
                                    color:status_colors[transaction_detail.transaction_status]
                                }}>{transaction_detail.transaction_status}</Text>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'

                                }}>
                                    <Text style={{
                                        opacity: 0.5,
                                    }}>Total</Text>
                                    <Text style={{
                                        fontSize: 30
                                    }}>Rs. {transaction_detail.transaction_value}</Text>
                                </View>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    opacity: 0.5,

                                }}>
                                    <Text>{type == 'SENT' ? "Sent To" : "Received From"}</Text>
                                    <Text>{type == 'SENT' ? transaction_detail.receiver_phone_number : transaction_detail.sender_phone_number}</Text>
                                </View>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    opacity: 0.5,

                                }}>
                                    <Text>Completed at</Text>
                            <Text>{moment(transaction_detail.transaction_accept_time).isValid()?moment(transaction_detail.transaction_accept_time).format('lll'):""}</Text>
                                </View>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    opacity: 0.5,

                                }}>
                                    <Text>Transaction ID</Text>
                                    <Text>{transaction_detail.id_transaction}</Text>
                                </View>
                            {/* <Text>{JSON.stringify(transaction_detail)}</Text> */}
                            </View>
                        </NeuUnpressedView>
                    </View>


                    {transaction_detail.transaction_status=='PENDING'&&
                    type=="SENT"&&transaction_detail.own==false&&
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        // height:4,
                        justifyContent:'center'
                    }}>
                        {accept_money_resp.fetching?<Spinner/>:
                        <React.Fragment>
                        <View style={{
                            width: '50%'
                        }}>
                            <NeuButton noPressedState={true} 
                            disabled={accept_money_resp.fetching}
                            width={'100%'} style={{ height: 60, backgroundColor: 'red', borderRadius: 50 }} 
                            onPress={() => {
                                this.accept_money.execute({
                                    "accept": false,
                                    "id_transaction": transaction_detail.id_transaction
                                })
                            }}>
                                <Text style={{ opacity: 0.9,color:'white' }}>REJECT</Text>
                            </NeuButton>
                        </View>
                        <View style={{
                            width: '50%'
                        }}>
                            <NeuButton 
                            disabled={accept_money_resp.fetching}
                            noPressedState={true} width={'100%'} style={{ height: 60, backgroundColor: '#52c41a', borderRadius: 50 }} onPress={() => {
                                // alert("I was pressed")
                                // this.props.history.push('/contacts');
                                this.accept_money.execute({
                                    "accept": true,
                                    "id_transaction": transaction_detail.id_transaction
                                })

                            }}>
                                <Text style={{ opacity: 0.9,color:'white' }}>Accept</Text>
                                
                            </NeuButton>
                        </View>
                        </React.Fragment>}
                    </View>
                    }


                    {transaction_detail.transaction_status=='PENDING'&&
                    type=="REQUESTED"&&transaction_detail.own==true&&
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent:'center',
                        // height:4,
                        // backgroundColor:'red'
                    }}>
                        {accept_request_resp.fetching?<Spinner/>:
                        <React.Fragment>
                        <View style={{
                            width: '50%'
                        }}>
                            <NeuButton 
                            disabled={accept_request_resp.fetching}
                            noPressedState={true} width={'100%'} style={{ height: 60, backgroundColor: 'red', borderRadius: 50 }} onPress={() => {
                                 this.accept_request.execute({
                                    "accept": false,
                                    "id_transaction": transaction_detail.id_transaction
                                });
                            }}>
                                <Text style={{ opacity: 0.9,color:'white' }}>REJECT</Text>
                            </NeuButton>
                        </View>
                        <View style={{
                            width: '50%'
                        }}>
                            <NeuButton 
                            disabled={accept_request_resp.fetching}
                            noPressedState={true} width={'100%'} style={{ height: 60, backgroundColor: '#52c41a', borderRadius: 50 }} onPress={() => {
                                 this.accept_request.execute({
                                    "accept": true,
                                    "id_transaction": transaction_detail.id_transaction
                                });

                            }}>
                                <Text style={{ opacity: 0.9,color:'white' }}>Accept</Text>
                            </NeuButton>
                        </View>
                        </React.Fragment>}
                    </View>
                    }
               </View>
                <View style={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems:'center',
                    paddingBottom: 16
                }}>

                    <NeuButton noPressedState={true} width={'80%'} style={{ backgroundColor: 'white', borderRadius: 50 }} onPress={() => {
                        alert("I was pressed")
                    }}>
                        <View style={{ opacity: 0.6, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name='error-outline' type='MaterialIcons' />
                            <Text style={{ marginLeft: 6 }}>Report an issue</Text>
                        </View>
                    </NeuButton>

                    <NeuButton noPressedState={true} width={'80%'} style={{ backgroundColor: '#52c41a', borderRadius: 50 }} onPress={() => {
                        this.props.history.replace(defaultHomepageRoute)
                    }}>
                        <View style={{ opacity: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',color:'white' }}>
                            <Icon name='home' type='AntDesign' style={{color:'white'}} />
                            <Text style={{ marginLeft: 6 ,color:'white'}}>Go To Home</Text>
                        </View>
                    </NeuButton>
                </View>

            </View>
        </Container>
        )
    }
}

export default withDomains(TransactionDetail,"transaction");
