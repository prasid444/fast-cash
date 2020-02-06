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
import { View, Text, Container, Content, Icon } from 'native-base';
import BasicHeader from '../components/basic_header';
import NeuButton from '../components/neu_button';
import { withDomains } from '../lib/domain';

class SettingPage extends React.Component{
    render(){
        const {authenticator}=this.props;

        return(
            <Container style={{
                backgroundColor:'inherit'
            }}>
            <BasicHeader/>
            <Content>
            

            <NeuButton  noPressedState={true}   
            width={'100%'} 
            style={{backgroundColor:'white',borderRadius: 50}} onPress={() => {
                // alert("Logout");
                // authenticator.logout()
                this.props.history.push({
                    pathname:'/set_mpin',
                    state:{
                        isChanging:true
                    }
                });
        }}>
            <View style={{ opacity: 0.6, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name='lock-reset' type='MaterialCommunityIcons' />
                            <Text style={{ marginLeft: 6 }}>Change MPIN</Text>
            </View>
        </NeuButton>

            <NeuButton  noPressedState={true}   
            width={'100%'} 
            style={{backgroundColor:'white',borderRadius: 50}} onPress={() => {
                // alert("Logout");
                authenticator.logout()
        }}>
            <View style={{ opacity: 0.6, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name='md-exit' type='Ionicons' />
                            <Text style={{ marginLeft: 6 }}>Logout</Text>
            </View>
        </NeuButton>
        
            </Content>
            </Container>
        )
    }
}
export default withDomains(SettingPage);