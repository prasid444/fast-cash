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
import { Text, View, Picker, Icon,Header,Left,Button,Body,Title,Right } from 'native-base'
import NeuUnpressedView from './neu_unpressedview';
import { Input } from 'native-base';
import NeuView from './neu_view';
import { TouchableOpacity } from 'react-native';

class NeuDropdown extends Component {
  render() {
    let options=this.props.options||[];
    let filteredOptions=JSON.parse(JSON.stringify(options));

    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        activeOpacity={this.props.noPressedState ? 0.7 : 0.9}
        style={{ width: this.props.width || '100%', opacity: this.props.disabled ? 0.5 : 1}}>
        <NeuView style={{borderRadius:20,height:60 }} pressed={false} >
        <Picker
        renderToHardwareTextureAndroid
              mode='dialog'
              renderHeader={(backAction)=>{
                return <Header searchBar style={{ backgroundColor: '#f44242' }}>
                <Left>
                  <Button transparent onPress={backAction}>
                    <Icon name="arrow-back" style={{ color: "#fff" }} />
                  </Button>
                </Left>
                <Body style={{ flex: 3 }}>
                {/* <Input placeholder="Search" onChangeText={(query)=>{

                }} /> */}
                  <Title style={{ color: "#fff" }}>Select One</Title>
                </Body>
                <Right />
              </Header>
              }}
              inlineLabel={false}
              iosIcon={<Icon name="arrow-down" style={{opacity:0.5}} />}
              placeholder={this.props.placeholder}
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              style={{ width: '100%' }}
              textStyle={{ }}
              selectedValue={this.props.value}
              onValueChange={(value)=>{
                this.props.onChange(value)
              }}
            >
              <Picker.Itsem 
                label={"..."} 
                value={null}
                
                />
              {filteredOptions.map((item)=>{
                return <Picker.Item 
                label={`${item[this.props.labelText || "name"]}`} 
                value={item[this.props.keyText||"id"]}
                />
              })}
              
            </Picker>

          {/* <Input style={{
            width: '100%',
            paddingLeft: 20,
            // backgroundColor:'red'
          }}
            placeholderTextColor="#ddd"
            onChangeText={this.props.onChange}
            value={this.props.value}
            placeholder={this.props.placeholder || ""} /> */}
        </NeuView>
      </TouchableOpacity>
    );
  }
}

export default NeuDropdown;
