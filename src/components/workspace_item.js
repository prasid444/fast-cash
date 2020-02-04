import React, {Component} from 'react';
import {View, Text, Icon,ActionSheet} from 'native-base';
import {TouchableOpacity} from 'react-native';

class WorkspaceItem extends Component {
  render() {
    let workspace = this.props.item || {};
    return (
      <TouchableOpacity
        onPress={() => {
          typeof this.props.onSelect === 'function' &&
            this.props.onSelect(workspace);
        }}>
        <View
          style={{
            height: 300,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 12,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              height: '100%',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <Icon type="MaterialCommunityIcons" onPress={(e)=>{
                e.stopPropagation();
                console.log("PRESSED MENU");
                ActionSheet.show({
                  options:["Delete","Cancel"],
                  destructiveButtonIndex:0,
                  cancelButtonIndex:1,
                  title:workspace.name
                },(index)=>{
                  if(index==0){
                    console.log("DELETE WORKSPACE");
                    typeof this.props.onDelete==='function'&&this.props.onDelete(workspace)
                  }
                })
              }} name="dots-vertical" style={{
                // backgroundColor:'red'
                }} />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                flex: 1,
                alignItems: 'center',
              }}>
              <Icon
                type="FontAwesome5"
                name="briefcase"
                style={{fontSize: 100, color: 'black'}}
              />
            </View>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 32,
                }}>
                {workspace.name}
              </Text>
              <Text
                style={{
                  fontWeight: '100',
                }}>
                {workspace.description}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default WorkspaceItem;

export const WorkspaceAddItem = (props) => {
  return (
    <TouchableOpacity
        onPress={() => {
          typeof props.onSelect === 'function' &&
            props.onSelect();
        }}>
    <View
      style={{
        height: 300,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 12,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          height: '100%',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
          }}>
          <Icon
            type="FontAwesome5"
            name="briefcase"
            style={{fontSize: 100, color: 'black'}}
          />
        </View>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 32,
            }}>
            Create a Room
          </Text>
          <Text
            style={{
              fontWeight: '100',
            }}>
            Make a room and invite your friends
          </Text>
        </View>
      </View>
    </View>
          </TouchableOpacity>

  );
};

export const WorkspaceJoinItem = (props) => {
  return (
    <TouchableOpacity
        onPress={() => {
          typeof props.onSelect === 'function' &&
            props.onSelect();
        }}>
    <View
      style={{
        height: 300,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 12,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          height: '100%',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
          }}>
          <Icon
            
            type="MaterialCommunityIcons"
            name="folder-key-network-outline"
            style={{fontSize: 100, color: 'black'}}
          />
        </View>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 32,
            }}>
            Join a Room
          </Text>
          <Text
            style={{
              fontWeight: '100',
            }}>
            Join a room with roomkey.
          </Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};
