import React, {Component} from 'react';
import {Avatar, Button} from 'react-native-elements';
import {View, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import {connect} from 'react-redux';
import {loadDataUser} from './../redux/actions/ActionsAuth';

class UploadProfile extends Component {
  state = {
    picture: {
      uri: this.props.route.params.users.picture,
    },
    name: '',
  };

  uriToBlob = (uri) => {
    console.log('URI', uri);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        reject(new Error('Error on upload image'));
      };

      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  };

  uploadPicture = async () => {
    try {
      const file = await this.uriToBlob(this.state.picture.uri);
      console.log('mulai upload', file);
      storage()
        .ref(`photo/${this.props.route.params.users.uid}.png`)
        .put(file)
        .then(async () => {
          const url = await storage()
            .ref(`photo/${this.props.route.params.users.uid}.png`)
            .getDownloadURL();
          this.updateUserImage(url);
        })
        .catch((err) => {
          console.log({err}, 'ERROR IN UPLOAD IMAGEPICKER');
        });
    } catch (error) {
      console.log({error});
    }
  };

  updateUserImage = async (imageUrl) => {
    try {
      const id = this.props.route.params.users.uid;

      database()
        .ref(`users/${id}`)
        .child('picture')
        .set(imageUrl)
        .then(() => {
          this.props.loadDataUser(id);
          this.props.navigation.navigate('Profile', {image: imageUrl});
        })
        .catch((err) => {
          console.log({err}, 'ERROR PAS');
        });
    } catch (error) {
      console.log(error);
    }
  };
  handleChoosePhoto = () => {
    const options = {
      quality: 0.7,
      mediaType: 'photo',
      noData: true,
      storageOptions: {
        path: 'images',
        cameraRoll: true,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('responeseeeeeeeeeeee', response);
      if (response.error) {
        console.log(error);
      } else if (response.fileSize > 200000) {
        ToastAndroid.show('Your file so big, please', ToastAndroid.SHORT);
      } else {
        console.log(response.fileSize > 200000, 'ASSS');
        this.setState({
          upload: true,
          picture: response,
          image: {
            name: response.fileName,
            type: response.type,
            size: response.fileSize,
            uri:
              Platform.OS === 'android'
                ? response.uri
                : response.uri.replace('file://'),
          },
        });
      }
    });
  };

  render() {
    return (
      <View style={{paddingHorizontal: 20}}>
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <TouchableOpacity onPress={this.handleChoosePhoto}>
            {this.state.picture ? (
              <Avatar
                size="xlarge"
                rounded
                source={{
                  uri: this.state.picture.uri,
                }}
                showEditButton
              />
            ) : (
              <Avatar
                size="xlarge"
                rounded
                source={{
                  uri: this.state.picture,
                }}
                showEditButton
              />
            )}
          </TouchableOpacity>
        </View>

        <Button title="Update" onPress={this.uploadPicture} />
      </View>
    );
  }
}
export default connect(null, {loadDataUser})(UploadProfile);

// else if (!response.didCancel) {
//   this.setState({
//     upload: true,
//     picture: response,
//   });
// }
