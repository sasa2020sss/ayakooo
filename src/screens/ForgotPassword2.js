import React, {Component} from 'react';
import {Input, Button} from 'react-native-elements';
import {View, Text} from 'react-native';
import IconPass from 'react-native-vector-icons/Feather';

export default class ForgotPassword extends Component {
  onHandleToLogin = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 20,
          backgroundColor: '555964',
        }}>
        <View style={{alignSelf: 'center'}}>
          <Text style={{fontSize: 20}}>Reset Your Password</Text>
        </View>
        <View>
          <Input
            inputContainerStyle={{
              color: '#fff',
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
              borderBottomWidth: 1,
            }}
            containerStyle={{marginVertical: 10}}
            inputStyle={{color: 'red', fontSize: 15}}
            label="Password"
            labelStyle={{fontSize: 15}}
            placeholder="your password"
            leftIconContainerStyle={{
              marginLeft: 10,
              marginRight: 10,
              paddingBottom: 0,
            }}
            leftIcon={<IconPass name="lock" size={24} color="black" />}
          />
        </View>
        <View>
          <Input
            inputContainerStyle={{
              color: '#fff',
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
              borderBottomWidth: 1,
            }}
            containerStyle={{marginVertical: 10}}
            inputStyle={{color: 'red', fontSize: 15}}
            label="Confirm Password"
            labelStyle={{fontSize: 15}}
            placeholder="confirm your password"
            leftIconContainerStyle={{
              marginLeft: 10,
              marginRight: 10,
              paddingBottom: 0,
            }}
            leftIcon={<IconPass name="lock" size={24} color="black" />}
          />
        </View>
        <View>
          <Button
            containerStyle={{marginTop: 20, paddingHorizontal: 30}}
            title="Sign In"
            onPress={this.onHandleToLogin}
          />
        </View>
      </View>
    );
  }
}
