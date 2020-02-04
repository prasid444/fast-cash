/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable keyword-spacing */
/* eslint-disable space-infix-ops */

import React, { Component } from 'react';
import { View } from 'native-base';
import { Text } from 'native-base';
import { TouchableNativeFeedback, TouchableHighlight, ScrollView } from 'react-native';

const tab_list=[{
    label:"ALL",
    key:'all',
},{
    label:"Prasidha Karki",
    key:'pk',
},{
    label:"Enish Paneru",
    key:'ep',
},{
    label:"Bikram Adhikari",
    key:'bk',
},{
    label:"Anuj Poudel",
    key:'ap',
}]
 export  const    TabItem=({item,id,activeID,isActive,onPress=()=>{},style,...props})=>{
    var active=(id==activeID) || isActive;
return <TouchableHighlight activeOpacity={0.1} underlayColor='#82589F80' style={{
    marginRight:8,
    borderRadius:20,
    height:40,
    backgroundColor:isActive?'#82589F11':null,
    ...style
}} onPress={()=>{
    onPress(item,id)
}}>
<View
 style={{
    // marginRight:8,
    borderRadius:20,
    height:40,
    borderColor:active?'#82589F80':'rgba(0,0,0,0.5)',
    borderWidth:1,
    paddingLeft:16,
    paddingRight:16,
    paddingTop:8,
    paddingBottom:8,
}}><Text style={{
    fontWeight:'700',
    width:'100%',
    textAlign:'center',
    fontSize:18,
    color:active?'#82589F':null
}}>{item.label}</Text></View></TouchableHighlight>
}
class TabBar extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             activeIndex:0
        }
    }
 
  render() {
      const {activeIndex}=this.state;
      let tab_list=this.props.data||[]
    return (
      <ScrollView showsHorizontalScrollIndicator={false} horizontal directionalLockEnabled  style={{
        //   width:200,
          flex:1,
          height:40,
          padding:4,
        //   backgroundColor:'red',
          display:'flex',
          flexDirection:'row',
          overflow:'scroll',
          flexWrap:'nowrap'

  }}>{
      tab_list.map((item,index)=>{
          return <TabItem style={{
              minWidth:this.props.minimumItemWidth
          }} item={item} key={item.id||index} id={index} isActive={index==activeIndex} onPress={(item,id)=>{
              this.setState({
                  activeIndex:id
              })
          }} />
      })
  }</ScrollView>
    );
  }
}

export default TabBar;
