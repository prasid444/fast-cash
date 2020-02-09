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
import { formatMoney } from '../lib/utils/util';
import TransactionItem from '../components/transaction_item';

let tranlist_props={
  transaction_type:0 
}
const tabs={
  'received':2,
  'sent':1,
  'all':0
}
const _tabs=['all','received','all'];

class TransactionListPage extends Component {
    constructor(props) {
        super(props)

    
        console.log("new prop",tranlist_props)
        this.state = {
             transaction_type:0,
             ...tranlist_props
        }
        this.initial_tab=tranlist_props.transaction_type||0;
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
    let sent_transactions=list_transactions_data.transactions||[];
    let received_transactions=list_transactions_data.transactions||[];

  
    console.log("render proops",tranlist_props)
    // console.log("data",list_transactions_data)
    const {transaction_type}=this.state;
    // let transactions=transaction_type=='sent'?sent_transactions:received_transactions;

    return (<Container style={{
        backgroundColor:'inherit'
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
        }}>Transactions</Text>
        }
        />
        <Tabs
        tabBarUnderlineStyle={{borderBottomWidth:2,backgroundColor:'#ddd',borderColor:'#ddd'}}
        initialPage={this.initial_tab}
        page={transaction_type}
        ref={(ref)=>{
          this.my_tab_page=ref
        }}
         onChangeTab={(e)=>{
      console.log("tab change",e)
      this.setState({
        transaction_type:e.i
      });
      tranlist_props={
        transaction_type:e.i
      }
        }}>
        <Tab key='all' 
          tabStyle={{backgroundColor: 'white'}}
          activeTabStyle={{backgroundColor: 'white'}}
          activeTextStyle={{color:'black'}}
          heading="All">
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
            return <TransactionItem 
              transaction={transaction}
              key={transaction.id_transaction}
              own={transaction.own}
              onPress={(id,data)=>{
                this.props.history.push({
                  pathname: '/transactiondetails',
                  state: {
                    transaction:{...data}
                  }
                });
              }}
            />
            }}
        />
        </Content>
          </Tab>
         
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
            if(transaction.own){
            return <TransactionItem 
              transaction={transaction}
              key={transaction.id_transaction}
              own={transaction.own}
              onPress={(id,data)=>{
                this.props.history.push({
                  pathname: '/transactiondetails',
                  state: {
                    transaction:{...data}
                  }
                });
              }}
            />
          }
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
              if(!transaction.own){
            return  <TransactionItem 
            key={transaction.id_transaction}
              transaction={transaction}
              own={false}
              onPress={(id,data)=>{
                this.props.history.push({
                  pathname: '/transactiondetails',
                  state: {
                    transaction:{...data,own:false}
                  }
                });
              }}
            />
              }
            }}
        />
        </Content>
          </Tab>
        </Tabs>
    </Container>
      
    );
  }

  componentDidMount(){
    // this.my_tab_page.
  }
  componentWillUnmount(){
    tranlist_props={
      ...this.state
    };
    console.log("next prop",tranlist_props)
  }
}

export default withDomains(TransactionListPage,"transaction");
