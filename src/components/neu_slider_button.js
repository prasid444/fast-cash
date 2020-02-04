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
        <Slider
        childrenContainer={{display: 'flex',flex:1 }}
        onEndReached={() => {
          alert('Attention', 'onEndReached!');
        }}
        containerStyle={{
          margin: 8,
          width:'100%',
          borderRadius: 10,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        sliderElement={
          <View
            style={{
              width: 50,
              margin: 4,
              borderRadius: 5,
              height: 50,
              backgroundColor: '#ddd',
            }}
          />
        }
      >
        <Text>{'SLIDE TO SEND'}</Text>
      </Slider>
    );
  }
}

export default NeuSliderButton;
