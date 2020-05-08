import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {ToastAndroid, Alert} from 'react-native';
import {error} from 'react-native-gifted-chat/lib/utils';

export const setLogin = (email, password) => async (dispatch) => {
  try {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        auth().onAuthStateChanged((Users) => {
          database()
            .ref(`users/${Users.uid}`)
            .once('value')
            .then((data) => {
              console.log(data.val());
              dispatch({
                type: 'IS_LOGIN',
                payload: data.val(),
              });
            });
        });
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Wrong Email Or Password');
      });
  } catch (error) {
    console.log(error);
  }
};

export const loadDataUser = (uid) => async (dispatch) => {
  database()
    .ref(`users/${uid}`)
    .once('value')
    .then((data) => {
      console.log(data.val());
      dispatch({
        type: 'LOAD_DATA_USER',
        payload: data.val(),
      });
    });
};

export const setLogOut = () => async (dispatch) => {
  try {
    dispatch({
      type: 'IS_LOGOUT',
    });
  } catch (error) {
    console.log(error);
  }
};
// export const Register = (data) => {
//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(data.email, data.password)
//     .then((userCredentials) => {
//       database()
//         .ref('users/')
//         .set(data)
//         .then(() => {
//           return {
//             type: 'IS_REGISTER',
//             payload: '',
//           };
//         });
//     });
// };
