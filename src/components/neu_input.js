/* eslint-disable react/self-closing-comp */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-alert */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable space-infix-ops */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react'
import { Text, View } from 'native-base'
import NeuUnpressedView from './neu_unpressedview';
import { Input } from 'native-base';
import NeuView from './neu_view';


class NeuInput extends React.Component{
    render(){
        return <NeuView
        pressed={false}
         style={{
            borderRadius: 20,
        }}><Input style={{
            width:'100%',
            paddingLeft:20,
            textAlign:'left'
            // backgroundColor:'red'
        }} 
        placeholderTextColor="#ffffff"
        onChangeText={this.props.onChange}
        value={this.props.value}
        placeholder={this.props.placeholder||""}/>
        </NeuView>
    }
}
export default NeuInput