import React, {Component} from 'react';
import {View, FlatList, ScrollView, TouchableOpacity, List} from 'react-native';
import {SearchBar, ListItem, Avatar, Header} from 'react-native-elements';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {setLogin} from '../redux/actions/ActionsAuth';

class Chat extends Component {
  state = {
    search: '',
    users: [],
  };
  arrayholder = [];

  SearchFilterFunction(text) {
    if (text) {
      const dataFilter = this.state.users.filter((data, index) =>
        data.name.includes(text),
      );
      this.setState((prevState) => {
        return {
          users: dataFilter,
        };
      });
    } else {
      this.getDataUser();
    }
  }
  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  updateSearch = (search) => {
    this.setState({search});
  };

  componentDidMount() {
    this.getDataUser();
  }
  getDataUser() {
    database()
      .ref('users/')
      .on('value', (snapshot) => {
        const current_user = auth().currentUser.uid;
        console.log('hahaha', current_user);
        const data = snapshot.val();
        const user = Object.values(data);
        const result = user.filter((user) => user.uid !== current_user);
        this.setState({
          users: result,
        });
      });
  }
  // componentWillMount() {
  //   this.state.dbRef.off;
  // }
  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    const {search} = this.state;
    console.disableYellowBox = true;
    return (
      <>
        <View>
          <Header
            containerStyle={{marginTop: -30, backgroundColor: '#FF941F'}}
            centerComponent={{
              text: 'WhatZup',
              style: {color: '#fff', fontSize: 23, fontWeight: 'bold'},
            }}
          />
        </View>
        <View>
          <SearchBar
            containerStyle={{
              borderRadius: 20,
              backgroundColor: '#fff',
              borderTopColor: 0,
              borderBottomColor: 0,
            }}
            inputContainerStyle={{
              backgroundColor: '#fff',
              borderRadius: 20,
            }}
            inputStyle={{
              marginVertical: 0,
              paddingVertical: 0,
            }}
            placeholderTextColor={{backgroundColor: '#FF941F'}}
            placeholder="Search ..."
            value={this.state.search}
            onChangeText={(text) => {
              this.setState({
                search: text,
              });
              this.SearchFilterFunction(text);
            }}
            autoCorrect={false}
          />
          {/* <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}> */}
        </View>
        <ScrollView>
          <View>
            <FlatList
              data={this.state.users}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Room Chat', item)
                  }>
                  <ListItem
                    title={item.name}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    // title={item.title}
                    subtitle={item.status}
                    // rightSubtitle="17.30"
                    bottomDivider
                    leftElement={() => (
                      <View>
                        <Avatar
                          rounded
                          source={{
                            uri: item.picture,
                          }}
                        />
                      </View>
                    )}
                    enableEmptySections={true}
                    style={{marginTop: 0}}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>

        {/* </List> */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.login,
});

export default connect(mapStateToProps, {setLogin})(Chat);
