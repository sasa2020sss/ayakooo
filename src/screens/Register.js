import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import {View, Text, ToastAndroid} from 'react-native';
import IconEmail from 'react-native-vector-icons/Fontisto';
import IconPass from 'react-native-vector-icons/FontAwesome';
import IconPhone from 'react-native-vector-icons/Entypo';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
// import {connect} from 'react-redux';
// import {Register} from '../redux/actions/ActionsAuth';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Geolocation from '@react-native-community/geolocation';
Geolocation.setRNConfiguration({skipPermissionRequests: true});

class RegisterScreen extends Component {
  state = {
    name: '',
    phone: '',
    email: '',
    password: '',
    passwordError: null,
    confirmPassword: '',
    picture: '',
    confirmPasswordError: null,
    phone: '',
    phoneError: null,
    email: '',
    emailError: null,
    location: [],
    loadingButton: false,
  };

  onHandleToLogin = () => {
    this.props.navigation.navigate('Login');
  };
  checkphone = () => {
    const req = /^(^\+62\s?|^0)(\d{3,4}?){2}\d{3,4}$/;
    console.log(req.test(this.state.phone));
    if (!req.test(this.state.phone)) {
      this.setState({phoneError: 'phone number is already in use'});
    } else {
      this.setState({phoneError: null});
    }
  };
  checkemail = () => {
    console.log('check email');
    const req = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!req.test(this.state.email)) {
      this.setState({emailError: 'email is already in use'});
    } else {
      this.setState({emailError: null});
    }
  };
  checkPassword = () => {
    const {password} = this.state;
    if (password.length < 6) {
      this.setState({passwordError: 'Password must be at least 6 characters'});
    } else {
      this.setState({passwordError: null});
    }
  };

  checkConfirmPass = () => {
    const {confirmPassword, password} = this.state;
    if (confirmPassword !== password) {
      this.setState({confirmPasswordError: 'Passwords does not match'});
    } else {
      this.setState({confirmPasswordError: null});
    }
  };

  componentDidMount() {
    Geolocation.getCurrentPosition((location) => {
      return this.setState({
        location: location,
      });
    });
  }

  onSubmitData = (e) => {
    this.setState({loadingButton: true});
    e.preventDefault();
    auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        auth().onAuthStateChanged((UserData) =>
          database()
            .ref(`users/${UserData.uid}`)
            .set({
              name: this.state.name,
              phone: this.state.phone,
              email: this.state.email,
              password: this.state.password,
              status: 'Online',
              picture:
                'https://cdn2.iconfinder.com/data/icons/men-women-from-all-over-the-world-1/93/man-woman-people-person-avatar-face-user_49-512.png',
              uid: UserData.uid,
              longitude: this.state.location.coords.longitude,
              latitude: this.state.location.coords.latitude,
            })
            .then(() => {
              this.props.navigation.navigate('Login');
            })
            .catch((error) => {
              console.log(error.code, 'FICSSS');
              if (error.code === 'auth/email-already-in-use') {
                this.setState({loadingButton: false});
                ToastAndroid.show('Email Already in used', ToastAndroid.SHORT);
              }
            }),
        );
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          this.setState({loadingButton: false});
          ToastAndroid.show('Email Already in used', ToastAndroid.SHORT);
        }
      });
  };

  //     .catch(error => {
  //       if (error.code === 'auth/email-already-in-use') {
  //         console.log('That email address is already in use!');
  //       }

  //       if (error.code === 'auth/invalid-email') {
  //         console.log('That email address is invalid!');
  //       }

  //       console.error(error);
  //     };
  // };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          paddingHorizontal: 20,
          alignContent: 'center',
          color: '#fff',
        }}>
        <ScrollView>
          <View style={{marginTop: 40}}>
            <View>
              <Text
                style={{
                  paddingLeft: 10,
                  fontSize: 25,
                  color: '#F1AD25',
                  fontWeight: 'bold',
                }}>
                Let's Join!
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#F1AD25',
                }}>
                Create Account
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
                containerStyle={{marginVertical: 10}}
                inputStyle={{color: 'black', fontSize: 15}}
                label="Name Contact"
                labelStyle={{fontSize: 15}}
                placeholder="your name contact"
                leftIconContainerStyle={{
                  marginLeft: 10,
                  marginRight: 10,
                  paddingBottom: 0,
                }}
                onChangeText={(text) => this.setState({name: text})}
                leftIcon={<Icon name="user" size={24} color="black" />}
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
                inputStyle={{color: 'black', fontSize: 15}}
                label="Phone"
                labelStyle={{fontSize: 15}}
                placeholder="your number phone"
                leftIconContainerStyle={{
                  marginLeft: 10,
                  marginRight: 10,
                  paddingBottom: 0,
                }}
                keyboardType="phone-pad"
                onChangeText={(text) => this.setState({phone: text})}
                onBlur={() => this.checkphone()}
                errorStyle={{color: 'red'}}
                errorMessage={
                  !this.state.phoneError ? false : 'Required with your number'
                }
                leftIcon={<IconPhone name="phone" size={24} color="black" />}
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
                inputStyle={{color: 'black', fontSize: 15}}
                labelStyle={{fontSize: 15}}
                label="Email Addrees"
                placeholder="Ex.annisa@gmail.com"
                leftIconContainerStyle={{
                  marginLeft: 10,
                  marginRight: 10,
                  paddingBottom: 0,
                }}
                onChangeText={(text) => this.setState({email: text})}
                onBlur={() => this.checkemail()}
                errorStyle={{color: 'red'}}
                errorMessage={
                  !this.state.emailError ? false : 'Required with your email'
                }
                leftIcon={<IconEmail name="email" size={24} color="black" />}
              />
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
                  inputStyle={{color: 'black', fontSize: 15}}
                  label="Password"
                  labelStyle={{fontSize: 15}}
                  placeholder="your password"
                  leftIconContainerStyle={{
                    marginLeft: 10,
                    marginRight: 10,
                    paddingBottom: 0,
                  }}
                  onChangeText={(text) => this.setState({password: text})}
                  onBlur={() => this.checkPassword()}
                  errorStyle={{color: 'red'}}
                  errorMessage={
                    !this.state.passwordError
                      ? false
                      : 'Password must be at least 6 characters'
                  }
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
                  inputStyle={{color: 'black', fontSize: 15}}
                  label="Confirm Password"
                  labelStyle={{fontSize: 15}}
                  placeholder="confirm your password"
                  leftIconContainerStyle={{
                    marginLeft: 10,
                    marginRight: 10,
                    paddingBottom: 0,
                  }}
                  onChangeText={(text) =>
                    this.setState({confirmPassword: text})
                  }
                  onBlur={() => this.checkConfirmPass()}
                  errorStyle={{color: 'red'}}
                  errorMessage={
                    !this.state.confirmPasswordError
                      ? false
                      : 'Passwords do not match'
                  }
                  leftIcon={<IconPass name="lock" size={24} color="black" />}
                />
              </View>

              <View>
                <Button
                  containerStyle={{
                    marginTop: 20,
                    paddingHorizontal: 30,
                  }}
                  buttonStyle={{backgroundColor: '#F1AD25'}}
                  loading={this.state.loadingButton}
                  title="Sign Up"
                  onPress={this.onSubmitData}
                />
              </View>
              <TouchableOpacity onPress={this.onHandleToLogin}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 20,
                  }}>
                  Already have an account yet? Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default RegisterScreen;

// connect(null, {Register})
