import React, {Component} from 'react';
import {Input, Button} from 'react-native-elements';
import {View, Text} from 'react-native';
import IconEmail from 'react-native-vector-icons/Fontisto';

export default class ForgotPassword extends Component {
  onHandleToMakePassword = () => {
    this.props.navigation.navigate('Make Password');
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 20,
          backgroundColor: '#F8AD26',
        }}>
        <View
          style={{
            alignSelf: 'center',
            marginTop: -60,
            marginBottom: 60,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
            Forgot Password
          </Text>
          <Text style={{fontSize: 15, textAlign: 'center'}}>
            We sent you an email that contains a link to create a new password.
            Please check it.
          </Text>
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
            containerStyle={{marginVertical: 10, paddingHorizontal: 0}}
            inputStyle={{color: 'red', fontSize: 15}}
            labelStyle={{fontSize: 15}}
            label="Email Addrees"
            placeholder="your email address"
            leftIconContainerStyle={{
              marginLeft: 10,
              marginRight: 10,
              paddingBottom: 0,
            }}
            leftIcon={<IconEmail name="email" size={24} color="black" />}
          />
          <View>
            <Button
              containerStyle={{marginTop: 20, paddingHorizontal: 30}}
              title="SEND"
              onPress={this.onHandleToMakePassword}
            />
          </View>
        </View>
      </View>
    );
  }
}
