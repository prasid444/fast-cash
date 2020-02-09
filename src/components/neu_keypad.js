/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-alert */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable space-infix-ops */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import { View, Text, Icon } from 'native-base';
import NeuButton from './neu_button';
import NeuPressedView from './neu_pressedview';
import NeuView from './neu_view';

class NeuKeypad extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      pressedKeys:this.props.pressedKeys||""
    }
  }

  onChange=(newValue)=>{
    typeof this.props.onChange==='function'&&this.props.onChange(newValue)
  }
  reset=(value="")=>{
    this.setState({
      pressedKeys:value
    },()=>{
      typeof this.props.onChange==='function'&&this.props.onChange(value)
    })
  }
  
  render() {
    const {pressedKeys}=this.state;
    return (
      <View
        style={{
          width: '100%',
          // height:40,
        //   backgroundColor: 'red',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap:'wrap',
          opacity:this.props.hidden?0:1,
          
        }}>
        {Array(10)
          .fill('0')
          .map((item, index) => {
            return (<React.Fragment>
              {index!=9&&
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '33%',
                  paddingBottom:8,
                  paddingTop:8
                }}
              >
                  <NeuButton disabled={this.props.hidden} noPressedState={true} width={'80%'} onPress={()=>{
                      // alert(index);
                      if(typeof this.props.maxLength=='number'&&pressedKeys.length<this.props.maxLength){
                        let decimals=pressedKeys.split(".")[1]||"";
                      if(this.props.hasDot&&decimals.length<2){
                        typeof this.props.onChange==='function'&&this.props.onChange(`${pressedKeys}${index+1}`)
                        this.setState({
                          pressedKeys:`${pressedKeys}${index+1}`
                        },()=>{
                        })
                      }else if(!this.props.hasDot){
                        typeof this.props.onChange==='function'&&this.props.onChange(`${pressedKeys}${index+1}`)
                        this.setState({
                          pressedKeys:`${pressedKeys}${index+1}`
                        })
                      }
                    }else{
                      // typeof this.props.onChange==='function'&&this.props.onChange(`${pressedKeys}${index+1}`)
                      //   this.setState({
                      //     pressedKeys:`${pressedKeys}${index+1}`
                      //   },()=>{
                      //   })
                      }
                      // typeof this.props.onChange==='function'&&this.props.onChange()
                  }} style={{
                      borderRadius: 20,
                      backgroundColor:'white',
                      height:60
                  }}>
                  <Text style={{
                    fontSize:30,
                    opacity: 0.6,
                }}>{index==9?"0":index + 1}</Text>
                  </NeuButton>
                
              </View>}
              {index==9&&<React.Fragment>
                <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '33%',
                  paddingBottom:8,
                  paddingTop:8
                }}
              >
                {this.props.hasDot&&
                <NeuButton disabled={this.props.hidden} noPressedState={true} width={'80%'} onPress={()=>{
                    if(typeof this.props.maxLength=='number'&&pressedKeys.length<this.props.maxLength&&!pressedKeys.includes(".")){
                    
                    typeof this.props.onChange==='function'&&this.props.onChange(`${pressedKeys}.`)
                    this.setState({
                      pressedKeys:`${pressedKeys}.`
                    },()=>{
                    });
                  }
                  }} style={{
                      borderRadius: 20,
                      backgroundColor:'white',
                      height:60
                  }}>
                  <Text style={{
                    fontSize:30,
                    opacity: 0.6,
                }}>&#183;</Text>
                  </NeuButton>}

              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '33%',
                  paddingBottom:8,
                  paddingTop:8
                }}
              >
                  <NeuButton disabled={this.props.hidden} noPressedState={true} width={'80%'} onPress={()=>{
                    if(typeof this.props.maxLength=='number'&&pressedKeys.length<this.props.maxLength){
                      let decimals=pressedKeys.split(".")[1]||"";
                      if(this.props.hasDot&&decimals.length<2){
                        typeof this.props.onChange==='function'&&this.props.onChange(`${pressedKeys}0`)
                        this.setState({
                          pressedKeys:`${pressedKeys}0`
                        },()=>{
                        });
                      }else{
                        typeof this.props.onChange==='function'&&this.props.onChange(`${pressedKeys}0`)
                        this.setState({
                          pressedKeys:`${pressedKeys}0`
                        },()=>{
                        });
                      }
                   
                    }
                  }} style={{
                      borderRadius: 20,
                      backgroundColor:'white',
                      height:60
                  }}>
                  <Text style={{
                    fontSize:30,
                    opacity: 0.6,
                }}>0</Text>
                  </NeuButton>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '33%',
                  paddingBottom:8,
                  paddingTop:8
                }}
              >
                  <NeuButton disabled={this.props.hidden} noPressedState={true} width={'80%'} onPress={()=>{
                    typeof this.props.onChange==='function'&&this.props.onChange(`${pressedKeys}`.slice(0,-1))
                    this.setState({
                      pressedKeys:`${pressedKeys}`.slice(0,-1)
                    },()=>{
                      
                    })
                  }} style={{
                      borderRadius: 20,
                      backgroundColor:'white',
                      height:60
                  }}>
                  <Icon name='ios-backspace'  type='Ionicons'/>
                  </NeuButton>
              </View>
                </React.Fragment>}

              {(index==2||index==5||index==8 )&&
              <View style={{width:'70%',display:'flex',flexDirection:'row',justifyContent:'center',height:4,borderRadius:8,overflow:'hidden'}}>
              <NeuView pressed style={{
                  padding:0,margin:0,
                  backgroundColor:'green',
                  width:'100%'
                    }}
                  /></View>}
              </React.Fragment>
            );
          })}
      </View>
    );
  }

  componentDidMount(){
    typeof this.props.onRef==='function'&&this.props.onRef(this)

  }
  componentWillUnmount(){
    typeof this.props.onRef==='function'&&this.props.onRef(null)

  }
}

export default NeuKeypad;
