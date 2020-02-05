/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Icon} from 'native-base';
import { withRouter } from 'react-router-native';
import NeuButton from './neu_button';

class BasicHeader extends Component {
  render() {
    return (
      <View
        style={{
          // height: 48,
          width: '100%',
          padding: 8,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems:'center'
        }}>
          <View style={{flex:1}}>
            {!this.props.no_back&&
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
           }
           </View>
        <View style={{flex:1}}>{this.props.body}</View>
        <View style={{flex:1}}>{this.props.right}</View>
      </View>
    );
  }
}

export default BasicHeader=withRouter(BasicHeader);
