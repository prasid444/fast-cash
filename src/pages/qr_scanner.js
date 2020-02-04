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

class QrScannerPage extends Component {

    onSuccess = (e) => {
        console.log("read data",e)
      }
    
  render() {
    return (<Container>

   
      <View style={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-between',
          flex:1
      }}>
          <View style={{
            display:'flex',
            flexDirection:'row',
            // backgroundColor:'red'
        }}>
            <NeuButton width={80} style={{
            width:'100%',
            borderRadius:40,
            backgroundColor:'white'
          }}  noPressedState={true} onPress={()=>{
              this.props.history.goBack()

          }}>
              <Icon style={{
                  opacity:0.4
              }} name='ios-arrow-back' type='Ionicons'/>
          </NeuButton>
        </View>
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
              <Text style={{
                fontWeight:'200'
            }}>To : </Text>
            <Text style={{
                fontWeight:'bold'
            }}>Anuj Poudel</Text>

          </View>
          <View style={{
              display:'flex',
              flexDirection:'row',
              justifyContent:'center'
          }}>
              <Text style={{
                fontWeight:'200'
            }}>Number : </Text>
            <Text style={{
                fontWeight:'bold'
            }}>+977 9817777777</Text>

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
          this.props.history.push('/contacts')
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
