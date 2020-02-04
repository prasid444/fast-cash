/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Container, Item, Icon, Input, Button } from 'native-base';
import { StyleSheet } from 'react-native';
import BasicHeader from '../../components/basic_header';
import { withDomains, RESTExecutor } from '../../lib/domain';
import { showErrorInToast } from '../../lib/utils/util';
import { Text } from 'native-base';
import { Redirect } from 'react-router-native';
import { defaultHomepageRoute } from '../../routes';


const placeholderTextColor = "#bfc6ba"
const placeholderIconColor = 'blue'

class WorkspaceCreate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            form_data: {}
        }
        this.post_workspace=RESTExecutor.post().config({
            label:'list'
        }).callbacks((success)=>{
            console.log("SUCCESS",success.result);
            this.props.workspace_handler.selectWorkspace(success.result);
        },(error)=>{
            showErrorInToast(error);
        }).connect(props.domains.workspaces);

    }

    stateUpdater = ({ stateKey, valueKey, value, appendObj = {}, callback }) => {
        let newData = this.state[stateKey];
        this.has_changed = true;
        if (valueKey) {
            newData[valueKey] = value;
        }
        if (appendObj) {
            Object.assign(newData, appendObj)
        }
        this.setState({
            [stateKey]: newData
        }, () => {
            typeof callback === 'function' && callback()
        })
    }

    createWorkspace=()=>{
        let form_data=JSON.parse(JSON.stringify(this.state.form_data));
        let data={};
        data['name']=form_data.name;
        data['type']="Room";
        data['currency']='USD';
        this.post_workspace.execute(data);
    }
    render() {
        const { form_data } = this.state;
        let post_workspace_resp=this.post_workspace.response();
        const {workspace_handler}=this.props;
            if(workspace_handler.isSelected()){
            return <Redirect
            to={defaultHomepageRoute}
            />
            }
        return (
            <Container style={{ flex: 1 }}>
                <BasicHeader left={<Button transparent onPress={()=>{
                    this.props.history.goBack()
                }}>
                    <Icon type='FontAwesome5' name='arrow-left'/>
                </Button>}/>

                <View style={{
                    padding: 16,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    // backgroundColor: 'green',
                }}>

                    <Item rounded style={styles.input_field}>
                        <Icon active name='cash' style={{
                            color: placeholderIconColor
                        }} />
                        <Input value={form_data.name}
                            onChangeText={(value) => {
                                this.stateUpdater({
                                    stateKey: 'form_data',
                                    valueKey: 'name',
                                    value: value
                                });
                            }}
                            placeholder='Room name' placeholderTextColor={placeholderTextColor} />
                    </Item>

                    <Item rounded style={styles.input_field}>
                        <Icon active name='cash' style={{
                            color: placeholderIconColor
                        }} />
                        <Input value={form_data.amount && form_data.amount.toString()}
                            onChangeText={(amount) => {
                                this.stateUpdater({
                                    stateKey: 'form_data',
                                    valueKey: 'amount',
                                    value: parseInt(amount)
                                });
                            }}
                            placeholder='Room budget' placeholderTextColor={placeholderTextColor} />
                    </Item>
                    <Button bordered style={{
                        marginTop: 50,
                        borderColor:'#82589F',
                        borderRadius:20,
                        // width:100
                    }}
                    disabled={post_workspace_resp.fetching}
                    onPress={()=>{
                        // authenticator.persistTokens({
                        //   access_token:"ACCESS",
                        //   refresh_token:"REFRESH"
                        // });
                        this.createWorkspace();
                    }}
                    ><Text style={{ textAlign: 'center', width: '100%',color:'#82589F',fontWeight:'bold',fontSize:22 }}>Submit</Text></Button>

                </View></Container>
        );
    }
}

export default withDomains(WorkspaceCreate,"workspaces");


const styles = StyleSheet.create({
    input_field: {
        marginTop: 4, marginBottom: 4
    }
})