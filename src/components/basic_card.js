/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Icon} from 'native-base';

class BasicCard extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          padding: 12,
          margin: 8,
          backgroundColor: '#82589F',
          borderRadius: 20,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          {this.props.customIcon ? (
            this.props.customIcon
          ) : this.props.iconName?(
            <Icon
              type="FontAwesome"
              style={{
                color: 'white',
                fontSize: 24,
                marginRight: 8,
              }}
              name={this.props.iconName}
            />
          ):null}
          <Text
            style={{
              fontSize: 16,
              fontWeight: '800',
              color: 'white',
            }}>
            {this.props.title}
          </Text>
        </View>
        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            fontSize: 30,
            fontWeight: '900',
            color: 'white',
          }}>
          {this.props.body}
        </Text>
      </View>
    );
  }
}

export default BasicCard;
