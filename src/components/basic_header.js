/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Icon} from 'native-base';

class BasicHeader extends Component {
  render() {
    return (
      <View
        style={{
          height: 48,
          width: '100%',
          padding: 8,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems:'center'
        }}>
        {this.props.left || (
          <View style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center'
          }}>
            {typeof this.props.onLeftClick==='function'&&
            <Icon onPress={()=>{
              this.props.onLeftClick()
            }} type='Feather' name='arrow-left' style={{
              color:'#82589F',
              marginRight: 8,
            }} />}
          <Text
            style={{
              color: '#82589F',
              fontSize: 28,
              fontWeight: 'bold',
            }}>
            {this.props.title||
            "ShareEx"}
          </Text>
          </View>
        )}
        <View>{this.props.body}</View>
        <View>{this.props.right}</View>
      </View>
    );
  }
}

export default BasicHeader;
