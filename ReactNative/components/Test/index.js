import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {PRIMARY_DOMAIN} from 'react-native-dotenv';

export default class Test extends Component {
  state = {
    text: 'Hello',
  };

  testPress = () => {
    fetch(PRIMARY_DOMAIN, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          text: responseJson.body,
        }).catch(err => {
          console.error(err);
        });
      });
  };

  render() {
    return (
      <View>
        <Button onPress={this.testPress} title={this.state.text} />
      </View>
    );
  }
}
