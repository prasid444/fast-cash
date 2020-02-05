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
import { View, Text, Content } from 'native-base';
import { Container,Segment,Button,List,ListItem,Body } from 'native-base';
import { RESTExecutor, withDomains } from '../lib/domain';
import BasicHeader from '../components/basic_header';

class TransactionListPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             transaction_type:'sent'
        }
        this.props.authenticator.persistTokens({
      access_token:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwY2U0ODBmMy1iODZlLTQ5MmItODMwOS1iODk5MGJkZDc3MmMiLCJyb2xlcyI6IiIsImlhdCI6MTU4MDkxNTAzMiwiZXhwIjoxNTgxNzc5MDMyfQ.JdfXA4l_FtQOwP4HA3MC87CK1gl8cn2hDvSGc8u37ypacFEyIsMeZmBF0dHENQLxcArufJ3jio9XDiA4SUKMAA"
    });
        this.list_transactions=RESTExecutor.list().config({
            label:'list'
        }).connect(props.domains.transaction);
        this.list_transactions.execute()
    }
    
  render() {
    let list_transactions_resp=this.list_transactions.response();
    let list_transactions_data=list_transactions_resp.result||{};
    let sent_transactions=list_transactions_data.sent_transaction||[];
    let received_transactions=list_transactions_data.received_transaction||[];

  
    console.log("data",list_transactions_data)
    const {transaction_type}=this.state;
    let transactions=transaction_type=='sent'?sent_transactions:received_transactions;

    return (<Container style={{
        backgroundColor:'inherit'
    }}>
        <BasicHeader body={<View>
            <Segment>
          <Button first active={transaction_type=='sent'} onPress={()=>{
              this.setState({
                  transaction_type:'sent'
              })
          }}>
            <Text>Sent</Text>
          </Button>
          <Button last active={transaction_type=='received'} onPress={()=>{
              this.setState({
                  transaction_type:'received'
              })
          }}>
            <Text>Received</Text>
          </Button>
        </Segment>
        </View>}/>
        <Content style={{
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
        </Content>
        {/* <View><Text>Transaction List Page</Text></View> */}
    </Container>
      
    );
  }
}

export default withDomains(TransactionListPage,"transaction");
