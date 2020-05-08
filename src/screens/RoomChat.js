import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import {Header} from 'react-native-elements';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconsend from 'react-native-vector-icons/Ionicons';
import IconSett from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      uid: '',
      currentUser: {},
      textMessage: '',
      messageList: [],
    };
  }
  componentDidMount() {
    auth().onAuthStateChanged((userId) => {
      console.log(userId.uid, 'HHHHH');
      this.setState({
        currentUser: userId._user,
        uid: this.props.route.params.uid,
      });
      database()
        .ref('messages/')
        .child(`/${userId.uid}/`)
        .child(`/${this.state.uid}/`)
        .on('child_added', (value) => {
          this.setState((prevState) => {
            return {
              messageList: [...prevState.messageList, value.val()],
            };
          });
        });
    });
  }

  onHandleToChat = () => {
    this.props.navigation.navigate('Home');
  };
  convertDate = (time) => {
    console.log(time, 'INIT ITM');
    let results = new Date(time).toLocaleTimeString().substr(0, 5);
    let date = new Date(time);
    // let d = new Date(time);
    // let c = new Date();
    // let results = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    // results += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    // if (c.getDay() !== d.getDay()) {
    //   results = d.getDay() + '' + d.getMonth() + '' + results;
    // }
    let today = new Date();
    const dateee = `${
      today.getDate() === date.getDate() ? 'Today' : 'Yesterday'
    }`;
    return dateee;
  };
  convertTime = (time) => {
    console.log(time, 'INIT ITM');
    let results = new Date(time).toLocaleTimeString().substr(0, 5);
    let date = new Date(time);
    // let d = new Date(time);
    // let c = new Date();
    // let results = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    // results += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    // if (c.getDay() !== d.getDay()) {
    //   results = d.getDay() + '' + d.getMonth() + '' + results;
    // }
    let today = new Date();
    const dateee = `${results} WIB`;
    return dateee;
  };
  sendMessage = async () => {
    if (this.state.textMessage.length > 0) {
      try {
        ('messages/');
        console.log('aaaaa');
        let msgId = (
          await database()
            .ref('messages/')
            .child(`/${this.state.currentUser.uid}/`)
            .child(`/${this.state.uid}/`)
            .push()
        ).key;
        let updates = {};
        let message = {
          message: this.state.textMessage,
          time: database.ServerValue.TIMESTAMP,
          from: this.state.currentUser.uid,
        };
        updates[
          'messages/' +
            this.state.currentUser.uid +
            '/' +
            this.state.uid +
            '/' +
            msgId
        ] = message;
        updates[
          'messages/' +
            this.state.uid +
            '/' +
            this.state.currentUser.uid +
            '/' +
            msgId
        ] = message;
        database().ref().update(updates);
        this.setState({textMessage: ''});
      } catch (error) {
        console.log({error});
      }
    }
  };
  renderDate = (date) => {
    return <Text style={styles.time}>{date}</Text>;
  };

  onHandleToFriendProfile = () => {
    this.props.navigation.navigate('Friend Profile', this.props.route.params);
  };

  keyboardEvent = (event, isShow) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: isShow ? 60 : 0,
      }),
      Animated.timing(this.bottomPadding, {
        duration: event.duration,
        toValue: isShow ? 120 : 60,
      }),
    ]).start();
  };
  render() {
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{marginTop: -30, backgroundColor: '#FF941F'}}
          leftComponent={
            <TouchableOpacity onPress={this.onHandleToChat}>
              <Icon name="keyboard-backspace" color="#fff" size={30} />
            </TouchableOpacity>
          }
          centerComponent={
            <TouchableOpacity onPress={this.onHandleToFriendProfile}>
              <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
                {this.props.route.params.name}
              </Text>
            </TouchableOpacity>
          }
        />
        <FlatList
          ref={(ref) => (this.flatList = ref)}
          onContentSizeChange={() =>
            this.flatList.scrollToEnd({animated: true})
          }
          onLayout={() => this.flatList.scrollToEnd({animated: true})}
          style={styles.list}
          data={this.state.messageList}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={(message) => {
            console.log(item);
            const item = message.item;
            let inMessage = item.from !== this.state.currentUser.uid;
            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
            let dateStyle = inMessage ? styles.dateIn : styles.dateOut;
            let timeStyle = inMessage ? styles.timeIn : styles.timeOut;
            return (
              <View style={[styles.item, itemStyle]}>
                {this.renderDate(item.date)}
                <View style={[styles.balloon]}>
                  <Text style={{alignSelf: 'flex-end'}}>{item.message}</Text>
                  <Text style={timeStyle}>{this.convertTime(item.time)}</Text>
                  <Text style={dateStyle}>{this.convertDate(item.time)}</Text>
                </View>
                {inMessage && this.renderDate(item.date)}
              </View>
            );
          }}
        />
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              value={this.state.textMessage}
              style={styles.inputs}
              placeholder="Write a message..."
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.setState({textMessage: text})}
              multiline={true}
            />
          </View>

          <TouchableOpacity style={styles.btnSend} onPress={this.sendMessage}>
            <Iconsend name="md-send" color="#fff" size={23} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeOut: {
    alignSelf: 'flex-end',
    fontSize: 11,
    marginTop: 4,
    color: '#c9c9c9',
  },
  timeIn: {
    alignSelf: 'flex-start',
    fontSize: 11,
    marginTop: 4,
    color: '#c9c9c9',
  },
  dateIn: {
    fontSize: 9,
    alignSelf: 'flex-start',
    marginTop: 0,
    color: '#c9c9c9',
  },
  dateOut: {
    fontSize: 9,
    alignSelf: 'flex-end',
    marginTop: 0,
    color: '#c9c9c9',
  },
  list: {
    paddingHorizontal: 17,
  },
  footer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#eeeeee',
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    backgroundColor: '#00BFFF',
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 50,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    paddingRight: 15,
  },
  balloon: {
    maxWidth: 280,
    padding: 7,
    borderRadius: 15,
  },
  itemIn: {
    alignSelf: 'flex-start',
  },
  itemOut: {
    alignSelf: 'flex-end',
  },
  time: {
    alignSelf: 'flex-end',
    margin: 0,
    fontSize: 2,
    color: '#000',
  },
  item: {
    marginVertical: 8,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 3,
  },
});

const mapStateToProps = (state) => ({
  currentUser: state.login,
});

export default connect(mapStateToProps, null)(Chat);
