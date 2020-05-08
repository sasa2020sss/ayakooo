import React, {Component} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconEmail from 'react-native-vector-icons/Fontisto';
import IconPass from 'react-native-vector-icons/Feather';
// import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {setLogin} from '../redux/actions/ActionsAuth';
import {connect} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';

// style={styles.inputIcon}

const {width: WIDTH} = Dimensions.get('window');
const styles = StyleSheet.create({
  parents: {
    flex: 1,
    backgroundColor: '#F1AD25',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    alignItems: 'center',
    marginBottom: 60,
  },
  icon: {
    alignItems: 'center',
    height: 100,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,

    borderRadius: 30,
  },
  inputText: {
    width: WIDTH - 55,
    height: 45,
    fontSize: 16,
    paddingLeft: 45,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.2)',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  inputIcon: {
    position: 'absolute',
    top: 7,
    left: 11,
  },
  logoinput: {
    position: 'absolute',
    top: 9,
    left: 37,
  },

  logotext: {
    color: 'white',
    fontSize: 20,
    marginTop: 15,
  },
  btnSignIn: {
    width: WIDTH - 55,
    height: 45,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 30,
  },
});

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    showPass: true,
    press: false,
  };

  onSumbitData = () => {
    this.props.setLogin(this.state.email, this.state.password);
  };
  handleChange = (key) => (val) => {
    this.setState({[key]: val});
  };
  onHandleToSignUp = () => {
    this.props.navigation.navigate('Register');
  };
  onHandleToForgotPass = () => {
    this.props.navigation.navigate('Forgot Password');
  };
  onHandleToHome = () => {
    this.props.navigation.navigate('MainHome');
  };
  showPass = () => {
    if (this.state.press === false) {
      this.setState({
        showPass: !this.state.showPass,
        press: !this.state.press,
      });
    } else {
      this.setState({showPass: this.state.showPass, press: this.state.press});
    }
  };

  componentDidMount() {
    Geolocation.getCurrentPosition((location) => {
      return this.setState({
        location: location,
      });
    });
  }
  // componentDidMount() {
  //   database().ref('users/').set({email: 'ainaya@gmail.com'});
  // }

  render() {
    return (
      <View style={styles.parents}>
        <View style={styles.logo}>
          <Icon name="wechat" size={100} style={styles.icon} color="#fff" />
          <Text style={{fontSize: 30, color: '#575c58', fontWeight: 'bold'}}>
            'WhatZup
          </Text>
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.inputText}
            placeholder="Email Address"
            placeholderTextColor="rgba(255,255,255, 0.7)"
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({email: text})}
          />
        </View>
        <View>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            secureTextEntry={this.state.showPass}
            placeholderTextColor="rgba(255,255,255, 0.7)"
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({password: text})}
          />
        </View>
        <View style={{borderRadius: 30}}>
          <TouchableOpacity
            style={styles.btnSignIn}
            onPress={this.onSumbitData}>
            <Text style={{textAlign: 'center'}}>Sign In</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{marginTop: 5}}>
          <TouchableOpacity onPress={this.onHandleToForgotPass}>
            <Text>Forgot Password?</Text>
          </TouchableOpacity>
        </View> */}
        <View style={{marginTop: 15}}>
          <TouchableOpacity onPress={this.onHandleToSignUp}>
            <Text> Don't have an account? Sign Up free</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = {
  setLogin,
};

export default connect(null, mapDispatchToProps)(LoginScreen);
