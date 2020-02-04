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
import { View, Text, Container, Content,Icon } from 'native-base';
import NeuButton from '../components/neu_button';
import QRCode from 'react-native-qrcode-svg';

class HomePage extends Component {
  render() {
    return (
      <Container>
          <View style={{
              display:'flex',
              flexDirection:'column',
              justifyContent:'space-between',
              flex:1,
              overflow:'hidden'
          }}>
              <View></View>
              <View style={{
                  textAlign:'center',
                  alignItems:'center'
              }}>
                  <View style={{
                      width:250,
                      height:250,
                      borderRadius:125,
                    //   backgroundColor:'black',
                      display:'flex',
                      flexDirection:'row',
                      justifyContent:'center',
                      alignItems:'center',
                  }}>
                       <QRCode
                        value={JSON.stringify({
                            name:"Anuj Poudel",
                            number:"+9779860167527"
                        })}
                        size={160}
                        backgroundColor='white'
                        color='black'/>
                  </View>

                  <Text style={{
                      textAlign:'center',
                      opacity:0.7,
                      fontWeight:'600'
                  }}>Your Balance</Text>
                  <View style={{
                      display:'flex',
                      flexDirection:'row',
                      justifyContent:'center',
                      alignItems:'baseline',
                      marginTop:12
                  }}>
                      <Text style={{
                      opacity:0.7,
                      fontWeight:'100',
                      fontSize:30
                  }}>Rs.</Text><Text style={{
                    opacity:0.7,
                    fontWeight:'300',
                    fontSize:60
                }}>00.00</Text>
                  </View>
              </View>
              <View style={{
                  display:'flex',
                  flexDirection:'row',
                  width:'100%',
                  position: 'relative',
                  flexWrap:'nowrap',
                  paddingBottom:30
              }}>
                  <View style={{
                    width:100,
                    position:'absolute',
                    left:'50%',
                    height:90,
                    transform:[{ translateX: -50 },{translateY:-15}],
                    zIndex: 10,
                }}>
                    <NeuButton noPressedState={true}   width={'100%'} style={{ height: 90,backgroundColor:'white',borderRadius: 50}} onPress={() => {
          // alert("I was pressed")
          this.props.history.push('/scan')
        }}>
            <Icon name='md-qr-scanner' type='Ionicons'/>
          {/* <Text style={{ opacity: 0.9 }}>Scan</Text> */}
        </NeuButton>
                </View>
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
          alert("I was pressed")
        //   this.props.history.push('/contacts')
        }}>
          <Text style={{ opacity: 0.9 }}>Send</Text>
        </NeuButton>
                </View>
                
             
              </View>
         
          </View>
      </Container>
    );
  }
}

export default HomePage;
