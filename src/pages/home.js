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
import BasicHeader from '../components/basic_header';
import { withDomains, RESTExecutor } from '../lib/domain';
import { Spinner } from 'native-base';

class HomePage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       user_data:{}
    }
    // console.log("props",this.props);
    // this.props.authenticator.persistTokens({
    //   access_token:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwY2U0ODBmMy1iODZlLTQ5MmItODMwOS1iODk5MGJkZDc3MmMiLCJyb2xlcyI6IiIsImlhdCI6MTU4MDkxNTAzMiwiZXhwIjoxNTgxNzc5MDMyfQ.JdfXA4l_FtQOwP4HA3MC87CK1gl8cn2hDvSGc8u37ypacFEyIsMeZmBF0dHENQLxcArufJ3jio9XDiA4SUKMAA"
    // });
    // console.log("TOKEN",this.props.authenticator.getTokens())
    
    this.get_user=RESTExecutor.list().config({
      label:'user_detail'
    }).callbacks((success)=>{
      console.log("success",success)
      this.setState({
        user_data:success.result
      })
    }).connect(props.domains.user);

    this.get_user.execute()
  }
  
  render() {
    let get_user_resp=this.get_user.response();
    let user_data=get_user_resp.result||{};
    // const {user_data}=this.state;
    // console.log("user data",get_user_resp)

    return (
      <Container style={{
        backgroundColor:'inherit'
      }}>
        <BasicHeader no_back right={
          <View style={{
            display:'flex',
            // flex:1,
            flexDirection:'row',
            justifyContent:'flex-end',
            width:'100%',
            // backgroundColor:'red'
          }}>
          <NeuButton width={80} style={{
            width:'100%',
            borderRadius:40,
            backgroundColor:'white'
          }}  noPressedState={true} onPress={()=>{
              this.props.history.push('/transactionlist')

          }}>
              <Icon style={{
                  opacity:0.4
              }} name='md-settings' type='Ionicons'/>
          </NeuButton></View>

        }/>
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
                    {user_data.phone_number?
                       <QRCode
                        value={JSON.stringify({
                            // name:"Anuj ijjjh",
                            number:user_data.phone_number
                        })}
                        size={160}
                        backgroundColor='white'
                        color='black'/>
                        :
                        <Spinner />
                      }
                  </View>
                  
                  <View style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems:'baseline'
                  }}>
                    <Text style={{
                      textAlign:'center',
                      opacity:0.7,
                      fontWeight:'600'
                  }}>Your Balance</Text>
                  <Text style={{
                      textAlign:'center',
                      opacity:0.5,
                      fontWeight:'500',
                      fontSize:8
                  }}> ( Click To Expand )</Text>
                  </View>
                  <View style={{
                      display:'flex',
                      flexDirection:'row',
                      justifyContent:'center',
                      alignItems:'center',
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
                  }}>{user_data.current_balance||"00.00"}</Text>
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
          // alert("I was pressed")
          // this.props.history.push('/contacts')
          this.props.history.push({
            pathname:"/send_money",
            state:{
              selected_contact:{
                number:"+9779849933272"
              }
            }
          })

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

export default withDomains(HomePage,"user");
