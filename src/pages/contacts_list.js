/* eslint-disable handle-callback-err */
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
import { View, Text, Container, ListItem, List,Left,Thumbnail,Body,Right, Content, Toast } from 'native-base';
import Contacts from "react-native-contacts";
import { Platform,PermissionsAndroid, TouchableHighlight } from 'react-native';
import BasicHeader from '../components/basic_header';
import NeuInput from '../components/neu_input';
import { FlatList } from 'react-native';
import { Button } from 'native-base';
import { Icon } from 'native-base';
// import ListView from "deprecated-react-native-listview";

import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';

const getAvatarInitials = textString => {
    if (!textString) return "";
  
    const text = textString.trim();
  
    const textSplit = text.split(" ");
  
    if (textSplit.length <= 1) return text.charAt(0);
  
    const initials =
      textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
  
    return initials;
  };

class ContactListPage extends Component {
    constructor(props) {
        super(props)
    

        // this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        let location = this.props.location || {};
        let location_state = location.state || {};
        // let transaction_detail = location_state.transaction || {};

        this.state = {
            contacts: [],
            searchPlaceholder: "Search",
            type:location_state.type||"SENT"
        };

        this.search = this.search.bind(this);
    }

    loadContacts() {
        Contacts.getAll((err, contacts) => {
          if (err === "denied") {
            console.warn("Permission to access contacts was denied");
          } else {
              // console.log("contacts are",contacts)
            this.setState({ contacts });
          }
        });
    
        Contacts.getCount(count => {
          this.setState({ searchPlaceholder: `Search ${count} contacts` });
        });
      }

    async componentWillMount() {
        if (Platform.OS === "android") {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
            title: "Contacts",
            message: "This app would like to view your contacts."
          }).then(() => {
            this.loadContacts();
          });
        } else {
          this.loadContacts();
        }
      }

    search(text) {
        const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
        const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (text === "" || text === null) {
          this.loadContacts();
        } else if (phoneNumberRegex.test(text)) {
          Contacts.getContactsByPhoneNumber(text, (err, contacts) => {
            this.setState({ contacts });
          });
        } else if (emailAddressRegex.test(text)) {
          Contacts.getContactsByEmailAddress(text, (err, contacts) => {
            this.setState({ contacts });
          });
        } else {
          Contacts.getContactsMatchingString(text, (err, contacts) => {
            this.setState({ contacts });
          });
        }
      }

    
  render() {
    const {contacts,searchPlaceholder,type}=this.state;
    // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    return (
      <Container style={{
        backgroundColor:'inherit'
      }}>
        <BasicHeader bosdy={<Text style={{
          opacity:0.8,
          fontSize:24,
          fontWeight:'100',
          width:'100%',
          textAlign:'center'
        }}>Contact List</Text>}/>
          <View style={{
               display:'flex',
               flexDirection:'column',
              //  justifyContent:'space-between',
               flex:1,
          }}>
            <NeuInput
            placeholder={searchPlaceholder}
            onChange={(text)=>{
              this.search(text)
            }}
            />
             <Content>

             {/* <SwipeListView
             style={{
              flex:1,height:'100%',
              // backgroundColor:'red'
             }}
            data={this.state.contacts}
            renderItem={ (data, rowMap) => {
              let contact=data.item||{};
              let phoneNumbers=contact.phoneNumbers||[];
              let firstPhone=phoneNumbers[0]||{};
            return (
            // <Text>{JSON.stringify(contact)}}</Text>)

                <ListItem style={styles.rowFront}
                // onPress={()=>{
                //   this.props.history.push({
                //     pathname: '/send_money',
                //     state: {
                //       selected_contact:{
                //       name:""+contact.givenName?contact.givenName:""+" "+contact.familyName?contact.familyName:"",
                //       number:firstPhone.number
                //     }
                //     },
                //   })
                // }}  
                key={contact.recordID}>
                <Body>
                <Text>{contact.givenName} {contact.familyName}</Text>
              <Text note>{firstPhone.number}</Text>
                </Body>
              </ListItem>)
            }}
            renderHiddenItem={ (data, rowMap) => {
              let contact=data.item||{};
              let phoneNumbers=contact.phoneNumbers||[];
              let firstPhone=phoneNumbers[0]||{};
                return (<View  style={styles.rowBack}>
                    <TouchableOpacity onPress={()=>{
                    this.props.history.push({
                    pathname: '/send_money',
                    state: {
                      selected_contact:{
                      name:""+contact.givenName?contact.givenName:""+" "+contact.familyName?contact.familyName:"",
                      number:firstPhone.number
                    }
                    },
                  })
                    }}>
                    <Text>Send</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                    this.props.history.push({
                    pathname: '/request_money',
                    state: {
                      selected_contact:{
                      name:""+contact.givenName?contact.givenName:""+" "+contact.familyName?contact.familyName:"",
                      number:firstPhone.number
                    }
                    },
                  })
                    }}>
                    <Text>Request</Text>
                    </TouchableOpacity>
                </View>
            )}}
            leftOpenValue={75}
            rightOpenValue={-75}
        /> */}
            <List style={{flex:1,height:'100%'}}
            // leftOpenValue={75}
            // rightOpenValue={-75}
            // renderLeftHiddenRow={data =>
            //   <Button full onPress={() => alert(data)}>
            //     <Icon active name="information-circle" />
            //   </Button>}
            // renderRightHiddenRow={(data, secId, rowId, rowMap) =>
            //   <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
            //     <Icon active name="trash" />
            //   </Button>}
            dataArray={this.state.contacts}
            renderRow={(contact)=>{
              let phoneNumbers=contact.phoneNumbers||[];
            let firstPhone=phoneNumbers[0]||{};
            return (
              <ListItem onPress={()=>{
                if(!firstPhone.number){
                  Toast.show({type:'danger',text:"Phone number invalid"});
                }else{
                
                  let  number=(firstPhone.number||"").replace(/ /g,"").replace(/\(/g,"").replace(/\)/g,"").replace(/-/g,"");
                this.props.history.push({
                  pathname:type=="SENT"?'/send_money':'/request_money',
                  state: {
                    selected_contact:{
                    code:null,
                    number:number.slice(number.length-10)
                  }
                  },
                });
              }
              }}  key={contact.recordID}>
              <Body>
              <Text>{contact.givenName} {contact.familyName}</Text>
            <Text note>{firstPhone.number}</Text>
              </Body>
            </ListItem>)
            }}

            />
        </Content>
          </View>
      </Container>
    );
  }
}

export default ContactListPage;


const styles=StyleSheet.create({
  rowFront: {
    alignItems: 'center',
    backgroundColor: 'white',
    // borderBottomColor: 'black',
    // borderBottomWidth: 1,
    justifyContent: 'center',
    // height: 50,
},
rowBack: {
    alignItems: 'center',
    // backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
},
})