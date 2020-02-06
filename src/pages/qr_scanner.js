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
            if(user_data.number&&typeof user_data.number==='string'){
              let number=user_data.number.slice(user_data.number.length - 10);
              let code=user_data.number.substring(0,user_data.number.length - 10)
              this.setState({
                selectedUser:{
                  number:number,
                  code:code
                }
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
          paddingBottom:12        
      }}>
      <View style={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          flex:1,
          justifyContent:'space-between'
      }}>
        <View></View>
        <View style={{
          display:'flex',
          // backgroundColor:'red',
          flex:1,
          flexDirection:'column',
          justifyContent:'center'
        }}>
        <View style={{
              width:300,
              height:300,
              borderRadius:150,
              // backgroundColor:'red',
              overflow:'hidden',
              // flex:1
          }}>
            <View style={{
               display:'flex',
               flexDirection:'row',
               justifyContent:'center',
               backgroundColor:'#ddd',
               flex:1,
               alignItems:'center',
               overflow:'hidden',
               textAlign:'center'
            }}>
              {/* <Text>Hys</Text> */}
          <QRCodeScanner
              // showMarker
              cameraStyle={{
                  width:300,
                  height:300,
                  borderRadius:150
              }}
        onRead={this.onSuccess}
        // flashMode={QRCodeScanner.con}
      />
            </View>
              
          </View>
          
        </View>
        <Text style={{
              opacity: 0.3,
              width:'100%',
              textAlign:'center',
              // backgroundColor:'red'
            }}>Scan QR code of your friend profile.</Text>
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
            <NeuButton noPressedState={true}   
            disabled={!(selectedUser&&selectedUser.number)}
            width={'100%'} style={{ height: 60,backgroundColor:'white',borderRadius: 50}} onPress={() => {
          // alert("I was pressed")
          // this.props.history.push('/send_money')
          this.props.history.push({
            pathname:'/request_money',
            state:{
              selected_contact:selectedUser
            }
          });
        }}>
          <Text style={{ opacity: 0.9 }}>Request</Text>
        </NeuButton>
                </View>
                <View style={{
                    width:'50%'
                }}>
            <NeuButton noPressedState={true}   
            disabled={!(selectedUser&&selectedUser.number)}
            width={'100%'} style={{ height: 60,backgroundColor:'white',borderRadius: 50}} onPress={() => {
          // alert("I was pressed")
          this.props.history.push({
            pathname:'/send_money',
            state:{
              selected_contact:selectedUser
            }
          });
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
