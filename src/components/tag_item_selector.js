import React, { Component } from 'react';
import { View, Text, Button } from 'native-base';

class TagItemSelector extends Component {
    render() {
        let data = this.props.data || [];
        let selected_ids = this.props.value || [];

        return (
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                flexWrap: 'wrap'
            }}>
                {data.map((item) => {
                    return <Button
                        transparent={!selected_ids.includes(item.id)}
                        primary={selected_ids.includes(item.id)}
                        small
                        style={{
                            margin: 4
                        }}
                        onPress={() => {
                            typeof this.props.onPressItem === 'function' && this.props.onPressItem(item.id);

                            if (selected_ids.includes(item.id)) {
                                // remove id and send final selected
                                selected_ids.splice(selected_ids.indexOf(item.id), 1);
                            } else {
                                // add id and send final selected
                                selected_ids.push(item.id)
                            }
                            typeof this.props.onChange === 'function' && this.props.onChange(selected_ids)

                        }}
                    ><Text>{item.user&&item.user.full_name}</Text></Button>
                })}

            </View>
        );
    }
}

export default TagItemSelector;
