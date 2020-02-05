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
import NeuButton from '../components/neu_button';
import { Icon } from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import BasicHeader from '../components/basic_header';
import { Toast } from 'native-base';

class QrScannerPage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      selectedUser:null
    }
  }
  

    onSuccess = (e) => {
        console.log("read data",typeof e.data);
        let selecteduser=null;
        let user_data_string=e.data;
        try{
            let user_data=JSON.parse(user_data_string);
            if(user_data.name&&user_data.number){
              this.setState({
                selectedUser:user_data
              })
            }else throw new Error("Not valid QR")
        }catch(e){
          Toast.show({
            type:'danger',
            text:"Invalid QR Code"
          });
          this.setState({selectedUser:null})
        }
        
      }
    
  render() {
    const {selectedUser}=this.state;
    return (<Container style={{
      backgroundColor:'inherit'
    }}>
      <BasicHeader/>
   
      <View style={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-between',
          flex:1,
          
      }}>
      <View style={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center'
      }}>
          <View style={{
              width:200,
              height:200,
              borderRadius:100,
              backgroundColor:'red',
              overflow:'hidden'
          }}>
              <QRCodeScanner
            //   showMarker
              cameraStyle={{
                  width:200,
                  height:200,
                  borderRadius:100
              }}
        onRead={this.onSuccess}
        // flashMode={QRCodeScanner.con}
      />
          </View>
          <View style={{
              display:'flex',
              flexDirection:'row',
              justifyContent:'center'
          }}>
            {selectedUser&&selectedUser.name&&<React.Fragment>
              <Text style={{
                fontWeight:'200'
            }}>To : </Text>
            <Text style={{
                fontWeight:'bold'
            }}>{selectedUser.name}</Text>
          </React.Fragment>}
          </View>
          <View style={{
              display:'flex',
              flexDirection:'row',
              justifyContent:'center'
          }}>
            {selectedUser&&selectedUser.number&&<React.Fragment>
              <Text style={{
                fontWeight:'200'
            }}>Number : </Text>
            <Text style={{
                fontWeight:'bold'
          }}>{selectedUser.number}</Text>
        </React.Fragment>}
          </View>
          <View style={{
                  display:'flex',
                  flexDirection:'row',
                  width:'100%',
                  position: 'relative',
                  flexWrap:'nowrap',
                  paddingTop:60
              }}>
                <View style={{
                    width:'50%'
                }}>
            <NeuButton noPressedState={true}   width={'100%'} style={{ height: 60,backgroundColor:'white',borderRadius: 50}} onPress={() => {
          // alert("I was pressed")
          this.props.history.push('/send_money')
        }}>
          <Text style={{ opacity: 0.9 }}>Request</Text>
        </NeuButton>
                </View>
                <View style={{
                    width:'50%'
                }}>
            <NeuButton noPressedState={true}   width={'100%'} style={{ height: 60,backgroundColor:'white',borderRadius: 50}} onPress={() => {
          // alert("I was pressed")
          this.props.history.push({
            pathname:'/send_money',
            state:{
              selected_contact:selectedUser
            }
          })
        }}>
          <Text style={{ opacity: 0.9 }}>Send</Text>
        </NeuButton>
                </View>
                
             
              </View>
         

      </View>
      <View></View>
      </View>
      </Container>
    );
  }
}

export default QrScannerPage;
