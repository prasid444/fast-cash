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
import { View, Text, Content, Tabs, Tab, Left } from 'native-base';
import { Container,Segment,Button,List,ListItem,Body ,Right} from 'native-base';
import { RESTExecutor, withDomains } from '../lib/domain';
import BasicHeader from '../components/basic_header';
import moment from 'moment';
import { status_colors } from './transaction_detail';
import { RefreshControl } from 'react-native';
import { showErrorInToast } from '../lib/utils/util';
import { Toast } from 'native-base';

let tranlist_props={
  transaction_type:'received'
}
class TransactionListPage extends Component {
    constructor(props) {
        super(props)
    
        console.log("new prop",tranlist_props)
        this.state = {
             transaction_type:'sent',
            //  ...tranlist_props
        }
    //     this.props.authenticator.persistTokens({
    //   access_token:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwY2U0ODBmMy1iODZlLTQ5MmItODMwOS1iODk5MGJkZDc3MmMiLCJyb2xlcyI6IiIsImlhdCI6MTU4MDkxNTAzMiwiZXhwIjoxNTgxNzc5MDMyfQ.JdfXA4l_FtQOwP4HA3MC87CK1gl8cn2hDvSGc8u37ypacFEyIsMeZmBF0dHENQLxcArufJ3jio9XDiA4SUKMAA"
    // });
        this.list_transactions=RESTExecutor.list().config({
            label:'list'
        }).callbacks((success)=>{
          Toast.show({
            type:'success',
            text:"Transactions Updated"
          })
        },(error)=>{
          showErrorInToast(error);
        }).connect(props.domains.transaction);
        this.list_transactions.execute({force:true})
    }
    
  render() {
    let list_transactions_resp=this.list_transactions.response();
    let list_transactions_data=list_transactions_resp.result||{};
    let sent_transactions=list_transactions_data.sent_transaction||[];
    let received_transactions=list_transactions_data.received_transaction||[];

  
    // console.log("data",list_transactions_data)
    const {transaction_type}=this.state;
    // let transactions=transaction_type=='sent'?sent_transactions:received_transactions;

    return (<Container style={{
        backgroundColor:'inherit'
    }}>
        <BasicHeader/>
        <Tabs
        tabBarUnderlineStyle={{borderBottomWidth:2,backgroundColor:'#ddd',borderColor:'#ddd'}}
        page={transaction_type=='sent'?0:1}
         onChangeTab={(e)=>{
      console.log("tab change",e)
      this.setState({
        transaction_type:e.i==0?'sent':'received'
      })
        }}>
          <Tab key='sent' 
          tabStyle={{backgroundColor: 'white'}}
          activeTabStyle={{backgroundColor: 'white'}}
          activeTextStyle={{color:'black'}}
          heading="Sent">
          <Content 
          refreshControl={<RefreshControl refreshing={list_transactions_resp.fetching} onRefresh={()=>{
            console.log("refreshing")
            this.list_transactions.execute({force:true})
          }} />}
          style={{
            flex:1,
            // width:'100%',
            // backgroundColor:'red'
            
        }}>
          <List style={{flex:1,height:'100%'}}
          
            dataArray={sent_transactions}
            renderRow={(transaction)=>{
            return (
              <ListItem onPress={()=>{

                this.props.history.push({
                  pathname: '/transactiondetails',
                  state: {
                    transaction:{...transaction,own:true}
                  }
                });
              }}  key={transaction.id_transaction}>
              <Body>
              <Text>{transaction.receiver_phone_number} </Text>
            <Text note>{moment(transaction.transaction_accept_time).isValid()?moment(transaction.transaction_accept_time).format('llll'):""}</Text>
            <Text note>{transaction.transaction_type} </Text>

              </Body>
              <Right>
              <View style={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'flex-end'
              }}>
                <Text style={{
                  fontWeight:'bold',
                }} >Rs. {transaction.transaction_value}</Text>
                <Text note style={{
                color:status_colors[transaction.transaction_status],
                fontSize:12
              }} >{transaction.transaction_status}</Text>
              </View>
              </Right>
              
            </ListItem>)
            }}
        />
        </Content>
          </Tab>
          <Tab 
          tabStyle={{backgroundColor: 'white'}} 
          activeTabStyle={{backgroundColor: 'white'}}
          activeTextStyle={{color:'black'}}
          key='received' heading="Received">
          <Content 
          refreshControl={<RefreshControl refreshing={list_transactions_resp.fetching} onRefresh={()=>{
            console.log("refreshing")
            this.list_transactions.execute({force:true})
          }} />}
          style={{
            flex:1,
            // width:'100%',
            // backgroundColor:'red'
        }}>
          <List style={{flex:1,height:'100%'}}
            dataArray={received_transactions}
            renderRow={(transaction)=>{
            return (
              <ListItem onPress={()=>{
                this.props.history.push({
                  pathname: '/transactiondetails',
                  state: {
                    transaction:{...transaction,own:false}
                  }
                });
              }}  key={transaction.id_transaction}>
              <Body>
              <Text>{transaction.sender_phone_number} </Text>
            <Text note>{moment(transaction.transaction_accept_time).isValid()?moment(transaction.transaction_accept_time).format('llll'):""}</Text>
            <Text note>{transaction.transaction_type} </Text>

              </Body>
              <Right>
              <View style={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'flex-end'
              }}>
                <Text style={{
                  fontWeight:'bold',
                }} >Rs. {transaction.transaction_value}</Text>
                <Text note style={{
                color:status_colors[transaction.transaction_status],
                fontSize:12
              }} >{transaction.transaction_status}</Text>
              </View>
              </Right>
            </ListItem>)
            }}
        />
        </Content>
          </Tab>
        </Tabs>
        {/* <Content style={{
            flex:1,
            // width:'100%',
            // backgroundColor:'red'
        }}>
        <List style={{flex:1,height:'100%'}}
            
            dataArray={transactions}
            renderRow={(transaction)=>{
            return (
              <ListItem onPress={()=>{

                this.props.history.push({
                  pathname: '/transactiondetails',
                  state: {
                    transaction:{...transaction,own:transaction_type=='sent'}
                  }
                });
              }}  key={transaction.id_transaction}>
              <Body>
              <Text>{transaction.transaction_status} {transaction.transaction_value}</Text>
            <Text note>{transaction.receiver_phone_number}</Text>
              </Body>
            </ListItem>)
            }}
        />
        </Content> */}
        {/* <View><Text>Transaction List Page</Text></View> */}
    </Container>
      
    );
  }

  componentWillUnmount(){
    tranlist_props={
      ...this.state
    };
    console.log("next prop",tranlist_props)
  }
}

export default withDomains(TransactionListPage,"transaction");
