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
import { View } from 'native-base';
import Slider from './neu_slider';
import { Image } from 'react-native';
import { Text } from 'native-base';

class NeuSliderButton extends Component {
  render() {
    return (
      <View style={{
        width:'100%',
        ...this.props.style
      }}>
        <Slider
        childrenContainer={{display: 'flex',flex:1 }}
        onEndReached={() => {
          // alert('Attention', 'onEndReached!');
          typeof this.props.onEndReached=='function'&&this.props.onEndReached()
        }}
        containerStyle={{
          margin: 8,
          width:'100%',
          borderRadius: 20,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:'white'
        }}
        sliderElement={
          <View
            style={{
              width: 40,
              margin: 4,
              borderRadius: 20,
              height: 40,
              backgroundColor: '#ddd',
            }}
          />
        }
      >
        <Text style={{fontSize:12,opacity: 0.6,}}>{this.props.placeholder}</Text>
      </Slider>
      </View>
    );
  }
}

export default NeuSliderButton;
