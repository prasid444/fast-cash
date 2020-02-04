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
import { View, Text, Container } from 'native-base';
import Contacts from "react-native-contacts";
import { Platform,PermissionsAndroid } from 'react-native';

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
    
        this.state = {
            contacts: [],
            searchPlaceholder: "Search"
        };

        this.search = this.search.bind(this);
    }

    loadContacts() {
        Contacts.getAll((err, contacts) => {
          if (err === "denied") {
            console.warn("Permission to access contacts was denied");
          } else {
              console.log("contacts are",contacts)
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
    return (
      <Container>
          <View style={{
               display:'flex',
               flexDirection:'column',
               justifyContent:'space-between',
               flex:1,
          }}>
              <View></View>
              <View></View>
              <View>
                

              </View>
          </View>
      </Container>
    );
  }
}

export default ContactListPage;
