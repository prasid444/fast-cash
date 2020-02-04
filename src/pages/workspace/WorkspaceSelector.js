/* eslint-disable keyword-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable space-infix-ops */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {Container, Text,Icon,View, Spinner, Button, Content, Toast} from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import {Dimensions} from 'react-native';
import WorkspaceItem, { WorkspaceAddItem } from '../../components/workspace_item';
import { WorkspaceJoinItem } from '../../components/workspace_item';
import { withDomains, RESTExecutor } from '../../lib/domain';
import { Redirect } from 'react-router-native';
import {defaultHomepageRoute} from '../../routes';
import AntIcon from 'react-native-vector-icons/AntDesign';
import BasicHeader from '../../components/basic_header';
import { formatError } from '../../lib/utils/util';
import { showErrorInToast } from '../../lib/utils/util';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


const wp= (percentage)=> {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;


class WorkspaceSelector extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       workspace_list:[
       {
         type:'add',

       },
       {type:'join'},
       ],
       active_slider:0
    }

    this.list_workspace=RESTExecutor.list().config({
      label:'list'
    }).callbacks((success)=>{
      if(success.result.length<3){
      this.setState({
        workspace_list:[...success.result,
          {type:'add'},
          {type:'join'}
        ]
      });
    }else {
      this.setState({
        workspace_list:[...success.result,{type:'add'},
        {type:'join'}],
      });
    }
    },(error)=>{
      console.log("ERROR IS",error);
      showErrorInToast(error)
      // let formated_error=formatError(error);
    }).connect(props.domains.workspaces);


    this._renderItem=this._renderItem.bind(this);
  }

  deleteWorkspace=(id)=>{
    console.log("DELETE FOR ID",id);
    RESTExecutor.delete().config({
      label:"detail"
    }).forId(id).callbacks((success)=>{
      Toast.show({
        type:'success',
        text:"Workspace Deleted"
      });
      this.list_workspace.execute();
    },(error)=>{
      showErrorInToast(error);
    }).connect(this.props.domains.workspaces).execute();
  }

  _renderItem ({item, index}) {
  switch(item.type){
    case 'add':
      return <WorkspaceAddItem 
      onSelect={()=>{
        // this.props.workspace_handler.selectWorkspace({
        //   id:"wk_id",
        //   name:"NAME"
        // })
        this.props.history.push('/workspaces/create')
      }}/>
    case 'join':
      return <WorkspaceJoinItem onSelect={()=>{
        this.props.history.push('/expenses/add');
      }}/>
    default:
      return <WorkspaceItem item={item} 
      onDelete={(workspace)=>{
        this.deleteWorkspace(workspace.id);
      }}
      onSelect={(data)=>{
        try{
        this.props.workspace_handler.selectWorkspace(data)
        }catch(e){
          console.log("error",e)
        }
      }}/>
  }
  return <View><Text>HEllo I am itemm {index} {item.type}</Text></View>;
}
  
  render() {
    const {}=this.state;
    let  list_workspace_resp=this.list_workspace.response();
    const {workspace_handler}=this.props;
    if(workspace_handler.isSelected()){
      return <Redirect 
      to={defaultHomepageRoute}
      />
    }
    return <Container style={{flex: 1,backgroundColor:'#1e88e5'}} >
      <BasicHeader/>
      <Content contentContainerStyle={{
        display:'flex',flexDirection:'column',justifyContent:'space-evenly',
        height:'100%'
      }}>
<View style={{
      paddingLeft:32
    }}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingRight:16,
        alignItems:'center'
      }}>
          <View style={{
      backgroundColor:'white',
      width:64,
      height:64,
      borderRadius:32,
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      
    }}>
    <Icon name='person'  style={{
      fontSize:58,
      color:'black' ,
    }}/>
    </View>
     <Button onPress={()=>{
      this.props.authenticator.logout();
    }}><Text>Logout</Text></Button> 
    {!list_workspace_resp.fetching&&
        <Button transparent onPress={()=>{
          this.list_workspace.execute();
        }}>
          <AntIcon name='sync' color='white' size={30}/>
        </Button>
  }
      </View>
  
    <Text style={{
      fontSize:32,
      fontWeight:'400',
      marginTop:40,
      color:'white'
    }}>Hello,</Text>
    <Text style={{
      fontSize:32,
      fontWeight:'400',
      color:'white'
    }}>prasid444</Text>
    <Text style={{
      color:'white'
    }}>
      Just few more steps and you are ready to go.
    </Text>
    {list_workspace_resp.fetching&&<Spinner/>}
    </View>
    <View style={{
      // backgroundColor:'red'
    }}>
       


            <Carousel
                  ref={c => this._slider1Ref = c}
                  data={this.state.workspace_list}
                  renderItem={this._renderItem}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  layout={'default'}
                  firstItem={this.state.active_slider}
                  // hasParallaxImages={true}
                  // firstItem={this.state.active_slider}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={0.7}
                  // inactiveSlideShift={20}
                  // containerCustomStyle={{
                  //   marginTop: 15,
                  //   overflow: 'visible'
                  // }}
                  // contentContainerCustomStyle={{
                  //   paddingVertical: 10
                  // }}
                  // loop={true}
                  // loopClonesPerSide={2}
                  // autoplay={true}
                  // autoplayDelay={500}
                  // autoplayInterval={3000}
                  onSnapToItem={(index) => this.setState({ active_slider: index }) }
                />
                </View>
    
      </Content>
    
    </Container>
  }

  componentDidMount(){
    this.list_workspace.execute()
  }
}

export default withDomains(WorkspaceSelector,"workspaces","workspace");
