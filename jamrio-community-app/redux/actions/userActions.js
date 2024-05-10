import axios from 'axios';
import {BASE_URL, TEST_URL, TOKEN} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import moment from 'moment';

export const showToastMessage = (visible, message, error) => async dispatch => {
  dispatch({
    type: 'TOAST_MESSAGE',
    payload: {
      visible: visible,
      message: message,
      error: error,
    },
  });
};

export const CreateUser = (userInfo, navigation) => async dispatch => {
  try {
    dispatch({
      type: 'CREATE_USER_LOADING',
      payload: true,
    });

    const response = await axios.post(
      `${BASE_URL}/appaccount`,
      {
        full_name: userInfo?.fullName,
        username: userInfo?.username,
        email: userInfo?.email,
        mobile: userInfo?.phone,
        dob: `${moment(userInfo?.dob).format('YYYY-MM-DD')}`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: TOKEN._j,
        },
      },
    );

    console.log('RESPONSE Data ------>', response?.data);
    if (response?.status === 200 || response?.status === 201) {
      console.log('RESPONSE USER CREATED------>', response?.data?.id);
      dispatch(GetUserDetails(response?.data?.id, navigation));
      dispatch({
        type: 'CREATE_USER_LOADING',
        payload: false,
      });
      dispatch({
        type: 'CREATE_USER_SUCCESS',
        payload: response?.data,
      });
      dispatch(storeAccountId(response?.data?.id));
      dispatch(saveAccIdToAsyncStorage(response?.data?.id));
      dispatch(showToastMessage(true, 'login successfully', false));
    } else {
      dispatch({
        type: 'CREATE_USER_LOADING',
        payload: false,
      });
      dispatch(
        showToastMessage(
          true,
          `Unexpected token status ${response.status}`,
          true,
        ),
      );
    }
  } catch (error) {
    if (error.response) {
      // Check if the error code is for duplicate data
      if (error.response.data?.code === 'data/already-exists') {
        // Extract duplicate fields from the error response
        const duplicateFields = error.response.data?.data?.dupFields || {};
        // Show an error message to the user with the duplicate fields
        dispatch(
          showToastMessage(
            true,
            `The following field(s) already exist: ${Object.keys(
              duplicateFields,
            ).join(', ')}`,
            true,
          ),
        );
      } else {
        // Handle other types of errors
        dispatch(showToastMessage(true, ` ${errorMessage}`, true));
      }
    } else {
      dispatch(showToastMessage(true, `Error:-' ${error.message}`, true));
    }
    dispatch({
      type: 'CREATE_USER_LOADING',
      payload: false,
    });

    dispatch({
      type: 'CREATE_USER_ERR',
      payload: error,
    });
    console.log('ERROR ------>', error.response?.data);
  }
};

export const GetUserDetails = (id, navigation) => async dispatch => {
  console.log('ACC ID IN GET USER DETAILS', id);
  console.log('BASE_URL IN GET USER DETAILS', BASE_URL);
  if (id) {
    try {
      const response = await axios.get(`${BASE_URL}/appaccount/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: TOKEN._j,
        },
      });
      console.log('RESPONSE IN REDUX ------>', response);
      console.log('RESPONSE Data ------>', response?.data);
      if (response?.status === 200 || response?.status === 201) {
        console.log('USER DETAILS with ID RESPONSE IN REDUX', response?.data);
        storeAccountId(response?.data?.id);

        dispatch({
          type: 'USER_DETAILS',
          // check if data is array or object
          payload: Array.isArray(response?.data)
            ? response?.data[0]
            : response?.data,
        });
        // Toast.show({
        //   type: 'success',
        //   text1: `success`,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        // dispatch(showToastMessage(true, `success`, false));
      } else {
        //Alert.alert(`${response?.data}`);
        console.log('USER DETAILS ERROR', response);
        // Toast.show({
        //   type: 'error',
        //   text1: `Unexpected token status :` + response.status,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        // dispatch(
        //   showToastMessage(
        //     true,
        //     `Unexpected token status : ${response.status}`,
        //     true,
        //   ),
        // );
      }
    } catch (error) {
      //Alert.alert(`${error}`);
      if (error.response) {
        // Toast.show({
        //   type: 'error',
        //   text1: error.response.status + error.response.data.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        // dispatch(
        //   showToastMessage(
        //     true,
        //     `${error.response.status + error.response.data.message}`,
        //     true,
        //   ),
        // );
      } else if (error.request) {
        // Toast.show({
        //   type: 'error',
        //   text1: 'no response received',
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        // dispatch(showToastMessage(true, `no response received`, true));
      } else {
        // Toast.show({
        //   type: 'error',
        //   text1: 'Error:- ' + error.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        //dispatch(showToastMessage(true, `Error:- ${error.message}`, true));
      }
      console.log('ERROR IN REDUX ------>', error);
    }
  } else {
    console.log('USER ID NOT FOUND');
  }
};

export const GetUserDetailsWithEmail = (email, token) => async dispatch => {
  console.log('Email IN GET USER DETAILS', email);
  if (email) {
    try {
      const response = await axios.get(
        `${BASE_URL}/appaccount/byemail/${email}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
        },
      );
      console.log('RESPONSE IN REDUX ------>', response);
      console.log('RESPONSE Data ------>', response?.data);
      if (response?.status === 200 || response?.status === 201) {
        console.log('USER DETAILS RESPONSE IN REDUX', response?.data);
        console.log(
          'USER DETAILS Account ID RESPONSE IN REDUX',
          response?.data[0]?.id,
        );
        storeAccountId(response?.data[0]?.id);
        const serializedState = JSON.stringify(response?.data[0]?.id);
        await AsyncStorage.setItem('accountId', serializedState);
        dispatch({
          type: 'USER_DETAILS',
          payload: response?.data[0],
        });
        // Toast.show({
        //   type: 'success',
        //   text1: `success`,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        //dispatch(showToastMessage(true, `success`, false));
      } else {
        //Alert.alert(`${response?.data}`);
        // Toast.show({
        //   type: 'error',
        //   text1: `Unexpected token status` + response.status,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        // dispatch(
        //   showToastMessage(
        //     true,
        //     `Unexpected token status ${response.status}`,
        //     true,
        //   ),
        // );
        console.log('USER DETAILS ERROR', response);
      }
    } catch (error) {
      //Alert.alert(`${error}`);
      if (error.response) {
        // Toast.show({
        //   type: 'error',
        //   text1: error.response.status + error.response.data.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        // dispatch(
        //   showToastMessage(
        //     true,
        //     `${error.response.status + error.response.data.message}`,
        //     true,
        //   ),
        // );
      } else if (error.request) {
        // Toast.show({
        //   type: 'error',
        //   text1: 'no response received',
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        //dispatch(showToastMessage(true, `no response received`, true));
      } else {
        // Toast.show({
        //   type: 'error',
        //   text1: 'Error:- ' + error.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        //dispatch(showToastMessage(true, `Error:-  ${error.message}`, true));
      }
      console.log('ERROR IN REDUX ------>', error);
    }
  } else {
    console.log('USER ID NOT FOUND');
  }
};

export const GetUserDetailsWithPhone = phone => async dispatch => {
  console.log('Phone IN GET USER DETAILS', phone);
  if (phone) {
    try {
      const response = await axios.get(
        `${BASE_URL}/appaccount/byphone/${phone}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: TOKEN._j,
          },
        },
      );
      console.log('RESPONSE IN REDUX ------>', response);
      console.log('RESPONSE Data ------>', response?.data);
      if (response?.status === 200 || response?.status === 201) {
        console.log('USER DETAILS RESPONSE IN REDUX', response?.data);
        console.log(
          'USER DETAILS Account ID RESPONSE IN REDUX',
          response?.data[0]?.id,
        );
        storeAccountId(response?.data[0]?.id);
        const serializedState = JSON.stringify(response?.data[0]?.id);
        await AsyncStorage.setItem('accountId', serializedState);
        dispatch({
          type: 'USER_DETAILS',
          payload: response?.data[0],
        });
        // Toast.show({
        //   type: 'success',
        //   text1: `success`,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        //dispatch(showToastMessage(true, `success`, false));
      } else {
        //Alert.alert(`${response?.data}`);
        // Toast.show({
        //   type: 'error',
        //   text1: `Unexpected token status` + response.status,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        // dispatch(
        //   showToastMessage(
        //     true,
        //     `Unexpected token status ${response.status}`,
        //     false,
        //   ),
        // );
        console.log('USER DETAILS ERROR', response);
      }
    } catch (error) {
      //Alert.alert(`${error}`);
      if (error.response) {
        // Toast.show({
        //   type: 'error',
        //   text1: error.response.status + error.response.data.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(
          showToastMessage(
            true,
            `${error.response.status + error.response.data.message}`,
            true,
          ),
        );
      } else if (error.request) {
        // Toast.show({
        //   type: 'error',
        //   text1: 'no response received',
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(showToastMessage(true, `no response received`, true));
      } else {
        // Toast.show({
        //   type: 'error',
        //   text1: 'Error:- ' + error.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        dispatch(showToastMessage(true, `Error:-  ${error.message}`, true));
      }
      console.log('ERROR IN REDUX ------>', error);
      dispatch({
        type: 'USER_ERROR',
        payload: error,
      });
    }
  } else {
    console.log('USER ID NOT FOUND');
  }
};

export const storeAccountId = (accId, navigation) => dispatch => {
  console.log('STORE ACCOUNT ID', accId);
  try {
    dispatch({
      type: 'ACCOUNT_ID',
      payload: accId,
    });
    if (accId === null) {
      navigation.navigate('Login');
    }
  } catch (error) {
    console.log('Error in storeAccountId: ', error);
  }
};

export const storeUserDetails = navigation => dispatch => {
  try {
    dispatch({
      type: 'USER_DETAILS',
      payload: user,
    });
    if (user === null) {
      navigation.navigate('Login');
    }
  } catch (error) {
    //Alert.alert(`${error}`);
    console.log('Error in storeUserDetails: ', error);
  }
};

export const saveAccIdToAsyncStorage = accId => async dispatch => {
  try {
    const serializedState = JSON.stringify(accId);
    await AsyncStorage.setItem('accountId', serializedState);
  } catch (error) {
    //Alert.alert(`${error}`);
    console.log(error);
  }
};

export const GetNotifications = id => async dispatch => {
  try {
    dispatch({
      type: 'NOTIF_LOADING',
      payload: true,
    });
    const response = await axios.get(`${BASE_URL}/notification/usermsg/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: TOKEN._j,
      },
    });
    console.log('NOTIFICATION RESPONSE ------>', response);
    if (response?.status === 200 || response?.status === 201) {
      console.log('NOTIFICATION RESPONSE --->', response?.data);
      dispatch({
        type: 'NOTIF_SUCCESS',
        payload: response?.data,
      });
      // Toast.show({
      //   type: 'success',
      //   text1: `success`,
      //   visibilityTime: 3000,
      //   autoHide: true,
      // });
      //dispatch(showToastMessage(true, `success`, false));
      dispatch({
        type: 'NOTIF_LOADING',
        payload: false,
      });
    } else {
      //Alert.alert(`${response?.data}`);
      console.log('NOTIFICATION ERROR', response);
      // Toast.show({
      //   type: 'error',
      //   text1: `Unexpected token status :` + response.status,
      //   visibilityTime: 3000,
      //   autoHide: true,
      // });
      // dispatch(
      //   showToastMessage(
      //     true,
      //     `Unexpected token status : ${response.status}`,
      //     true,
      //   ),
      // );
      dispatch({
        type: 'NOTIF_LOADING',
        payload: false,
      });

      dispatch({
        type: 'NOTIF_ERROR',
        payload: response,
      });
    }
  } catch (error) {
    //Alert.alert(`${error}`)
    if (error.response) {
      // Toast.show({
      //   type: 'error',
      //   text1: 'No notifications at the moment' + error.response.status,
      //   visibilityTime: 3000,
      //   autoHide: true,
      // });
      // dispatch(
      //   showToastMessage(
      //     true,
      //     `No notifications at the moment ${error.response.status}`,
      //     true,
      //   ),
      // );

      dispatch({
        type: 'NOTIF_LOADING',
        payload: false,
      });

      dispatch({
        type: 'NOTIF_ERROR',
        payload: error,
      });
    } else if (error.request) {
      // Toast.show({
      //   type: 'error',
      //   text1: 'no response received',
      //   visibilityTime: 3000,
      //   autoHide: true,
      // });
      // dispatch(showToastMessage(true, `no response received`, true));

      dispatch({
        type: 'NOTIF_LOADING',
        payload: false,
      });

      dispatch({
        type: 'NOTIF_ERROR',
        payload: error,
      });
    } else {
      // Toast.show({
      //   type: 'error',
      //   text1: 'Error:- ' + error.message,
      //   visibilityTime: 3000,
      //   autoHide: true,
      // });
      // dispatch(showToastMessage(true, `Error:-  ${error.message}`, true));

      dispatch({
        type: 'NOTIF_LOADING',
        payload: false,
      });

      dispatch({
        type: 'NOTIF_ERROR',
        payload: error,
      });
    }
    console.log('Notifications error:', error);
  }
};

export const MatchUser = (uid1, uid2) => async dispatch => {
  console.warn('Matching User ------------------->', uid1, 'with', uid2);
  try {
    const response = await axios.post(
      `${BASE_URL}/profilematch`,
      {
        user1id: uid1,
        user2id: uid2,
        lastswipe: 'right',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: TOKEN._j,
        },
      },
    );

    console.log('-------------------Matched User ------------', response?.data);
    if (response?.status === 200 || response?.status === 201) {
      console.log('Match User status 200', response?.data);
      // Toast.show({
      //   type: 'success',
      //   text1: 'Matched 🎉',
      //   text2: 'You have matched with this user',
      //   visibilityTime: 5000,
      //   autoHide: true,
      //   topOffset: 30,
      //   bottomOffset: 40,
      // });

      // dispatch(
      //   showToastMessage(
      //     true,
      //     `Matched 🎉 You have matched with this user`,
      //     false,
      //   ),
      // );

      dispatch({
        type: 'MATCHES_SUCCESS',
        payload: response?.data,
      });
    }
  } catch (error) {
    console.log('Matching error-----', error);
    // Toast.show({
    //   type: 'error',
    //   text1: 'Error:- ' + error.message,
    //   visibilityTime: 3000,
    //   autoHide: true,
    // });
    dispatch(showToastMessage(true, `Error:-  ${error.message}`, true));
  }
};

export const RejectUser = (uid1, uid2) => async dispatch => {
  console.warn('Rejecting User', uid1, 'with', uid2);
  try {
    const response = await axios.post(
      `${BASE_URL}/profilematch`,
      {
        user1id: uid1,
        user2id: uid2,
        lastswipe: 'left',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: TOKEN._j,
        },
      },
    );

    console.log('-------------------Matched User ------------', response?.data);
    if (response?.status === 200) {
      // if(response?.data?.status === "matched"){
      //   toggleModal()
      // }
      // Toast.show({
      //   type: 'success',
      //   text1: 'Rejected 👎',
      //   text2: 'You have rejected this user',
      //   visibilityTime: 5000,
      //   autoHide: true,
      //   topOffset: 30,
      //   bottomOffset: 40,
      // });
      // dispatch(
      //   showToastMessage(
      //     true,
      //     `Rejected 👎 You have rejected this user`,
      //     false,
      //   ),
      // );
      console.log('Reject User status 200', response?.data);

      dispatch({
        type: 'REJECTED_SUCCESS',
        payload: response?.data,
      });
    }
  } catch (error) {
    // Toast.show({
    //   type: 'error',
    //   text1: 'Error',
    //   text2: 'Something went wrong',
    //   visibilityTime: 5000,
    //   autoHide: true,
    //   topOffset: 30,
    //   bottomOffset: 40,
    // });
    dispatch(showToastMessage(true, `Something went wrong`, true));
    console.log('Rejecting error-----', error);
  }
};

export const GetAllUsers = id => async dispatch => {
  try {
    console.log('ACC ID TO GET ALL USERS ----->', id);
    const response = await axios.get(
      `${BASE_URL}/appaccount/notmymatchs/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: TOKEN._j,
        },
      },
    );
    // console.log(
    //   'Get All Users, other user data ----------------------------->',
    //   response,
    // );

    console.log('NOT MY MATCHES RESPONSE ------------->', response?.data);
    if (response?.status === 200) {
      dispatch({
        type: 'NOT_MY_MATCHES',
        payload: response?.data,
      });

      // Toast.show({
      //   type: 'success',
      //   text1: `success`,
      //   visibilityTime: 3000,
      //   autoHide: true,
      // });
      // dispatch(showToastMessage(true, `success`, false));
      console.log('STATUS CODE 200');
      console.log(
        'Get All Users, other user data ----------------------------->',
        response,
      );
      dispatch({
        type: 'USERS_STATUS_CODE',
        payload: 200,
      });
      dispatch(PauseVideo(false));
    } else if (response?.status === 204) {
      //Alert.alert(`${response?.data}`)
      // Toast.show({
      //   type: 'success',
      //   text1: ``,
      //   visibilityTime: 3000,
      //   autoHide: true,
      // });
      // dispatch(showToastMessage(true, `success`, false));
      console.log('STATUS CODE 204');
      dispatch({
        type: 'USERS_STATUS_CODE',
        payload: 204,
      });

      dispatch({
        type: 'NOT_MY_MATCHES',
        payload: 204,
      });
    } else {
      // Toast.show({
      //   type: 'error',
      //   text1: `Unexpected error occurred` + response.status,
      //   visibilityTime: 3000,
      //   autoHide: true,
      // });
      // dispatch(
      //   showToastMessage(
      //     true,
      //     `Unexpected error occurred ${response.status}`,
      //     true,
      //   ),
      // );

      dispatch({
        type: 'USERS_STATUS_CODE',
        payload: 500,
      });
    }
  } catch (error) {
    if (error?.response) {
      // Toast.show({
      //   type: 'error',
      //   text1: error?.response.status,
      //   visibilityTime: 3000,
      //   autoHide: true,
      // });
      // dispatch(showToastMessage(true, `${error?.response.status}`, true));
      dispatch({
        type: 'USERS_STATUS_CODE',
        payload: 500,
      });
    } else if (error?.request) {
      // Toast.show({
      //   type: 'error',
      //   text1: 'no response received',
      //   visibilityTime: 3000,
      //   autoHide: true,
      // });
      // dispatch(showToastMessage(true, `no response received`, true));
      dispatch({
        type: 'USERS_STATUS_CODE',
        payload: 500,
      });
    } else {
      // Toast.show({
      //   type: 'error',
      //   text1: 'Error:- ' + error?.message,
      //   visibilityTime: 3000,
      //   autoHide: true,
      // });
      // dispatch(showToastMessage(true, `Error:-  ${error?.message}`, true));
      dispatch({
        type: 'USERS_STATUS_CODE',
        payload: 500,
      });
    }
    //Alert.alert(`${error}`)
    console.log(error);
  }
};

export const ReloadOnSwipeCount = state => async dispatch => {
  dispatch({
    type: 'SWIPE_COUNT_RELOAD',
    payload: state,
  });
};

export const SetCurrentRoute = route => async dispatch => {
  dispatch({
    type: 'CURRENT_ROUTE',
    payload: route,
  });
};

export const PauseVideo = state => async dispatch => {
  dispatch({
    type: 'PAUSE_VIDEO',
    payload: state,
  });
};

// export const UploadVideo = (id, vid) => async dispatch => {
//   try {
//     dispatch({
//       type: 'UPLOAD_VIDEO_LOADING',
//       payload: true,
//     });

//     const response = await axios.post(
//       `${BASE_URL}/appupload/${id}/video`,
//       {
//         video: vid,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           authorization: TOKEN._j,
//         },
//       },
//     );

//     console.log('VIDEO RESPONSE ------>', response);
//     console.log('VIDEO RESPONSE Data ------>', response?.data);
//     if (response?.status === 200 || response?.status === 201) {
//       dispatch({
//         type: 'UPLOAD_VIDEO_LOADING',
//         payload: false,
//       });
//       dispatch({
//         type: 'UPLOAD_VIDEO_SUCCESS',
//         payload: response?.data,
//       });
//       // Toast.show({
//       //   type: 'success',
//       //   text1: 'Video uploaded successfully',
//       //   visibilityTime: 3000,
//       //   autoHide: true,
//       // });
//       dispatch(showToastMessage(true, `Video uploaded successfully`, false));
//     } else {
//       //Alert.alert(`${response?.data}`);
//       dispatch({
//         type: 'UPLOAD_VIDEO_LOADING',
//         payload: false,
//       });
//       // Toast.show({
//       //   type: 'error',
//       //   text1: `Unexpected error occurred` + response.status,
//       //   visibilityTime: 3000,
//       //   autoHide: true,
//       // });
//       dispatch(
//         showToastMessage(
//           true,
//           `Unexpected error occurred ${response.status}`,
//           true,
//         ),
//       );
//     }
//   } catch (error) {
//     //Alert.alert(`${error}`)
//     if (error.response) {
//       // Toast.show({
//       //   type: 'error',
//       //   text1: error.response.status + error.response.data.message,
//       //   visibilityTime: 3000,
//       //   autoHide: true,
//       // });
//       dispatch(
//         showToastMessage(
//           true,
//           `${error.response.status + error.response.data.message}`,
//           true,
//         ),
//       );
//     } else if (error.request) {
//       // Toast.show({
//       //   type: 'error',
//       //   text1: 'no response received',
//       //   visibilityTime: 3000,
//       //   autoHide: true,
//       // });
//       dispatch(showToastMessage(true, `no response received`, true));
//     } else {
//       // Toast.show({
//       //   type: 'error',
//       //   text1: 'Error:- ' + error.message,
//       //   visibilityTime: 3000,
//       //   autoHide: true,
//       // });
//       dispatch(showToastMessage(true, `no response received`, true));
//     }
//     dispatch({
//       type: 'UPLOAD_VIDEO_LOADING',
//       payload: false,
//     });

//     dispatch({
//       type: 'UPLOAD_VIDEO_ERR',
//       payload: error,
//     });
//     console.log('ERROR ------>', error);
//     // Toast.show({
//     //   type: 'error',
//     //   text1: error.response.data.message,
//     //   visibilityTime: 3000,
//     //   autoHide: true,
//     // });
//     dispatch(showToastMessage(true, `${error.response.data.message}`, true));
//   }
// };

export const GetAllVideos = () => async dispatch => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: TOKEN._j,
      },
    });
    console.log('RESPONSE GET ALL VIDEOS ------>', response?.data);
    if (response?.status === 200) {
      dispatch({
        type: 'GET_ALL_VIDEOS',
        payload: response?.data,
      });
      dispatch(GetUserDetails(uid));
    }
  } catch (error) {
    console.log('ERROR IN GET ALL VIDEOS ------>', error);
  }
};

export const DeleteVideo = (id, uid) => async dispatch => {
  try {
    const response = await axios.delete(`${BASE_URL}/videos/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: TOKEN._j,
      },
    });
    console.log('RESPONSE DELETE VIDEO ------>', response?.data);
    if (
      response?.status === 200 ||
      response?.status === 201 ||
      response?.status === 204
    ) {
      dispatch({
        type: 'DELETE_VIDEO',
        payload: id,
      });
      // Toast.show({
      //   type: 'success',
      //   text1: 'Video deleted successfully',
      //   visibilityTime: 3000,
      //   autoHide: true,
      // });
      dispatch(showToastMessage(true, `Video deleted successfully`, false));
      dispatch(GetAllVideos());
      dispatch(GetUserDetails(uid));
    }
  } catch (error) {
    console.log('ERROR IN DELETE VIDEO ------>', error);
    // Toast.show({
    //   type: 'error',
    //   text1: 'Error:- ' + error.message,
    //   visibilityTime: 3000,
    //   autoHide: true,
    // });
    dispatch(showToastMessage(true, `Error:- ${error.message}`, true));
  }
};

export const PrimaryVideo = (id, uid) => async dispatch => {
  try {
    const response = await axios.post(
      `${BASE_URL}/primaryvideo`,
      {
        vid: id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: TOKEN._j,
        },
      },
    );
    console.log('RESPONSE Primary VIDEO ------>', response?.data);
    if (
      response?.status === 200 ||
      response?.status === 201 ||
      response?.status === 204
    ) {
      dispatch({
        type: 'PRIMARY_VIDEO',
        payload: id,
      });
      // Toast.show({
      //   type: 'success',
      //   text1: 'Video deleted successfully',
      //   visibilityTime: 3000,
      //   autoHide: true,
      // });
      dispatch(
        showToastMessage(true, `Primary Video added successfully`, false),
      );
      dispatch(GetAllVideos());
      dispatch(GetUserDetails(uid));
    }
  } catch (error) {
    console.log('ERROR IN Setting Primary VIDEO ------>', error);
    // Toast.show({
    //   type: 'error',
    //   text1: 'Error:- ' + error.message,
    //   visibilityTime: 3000,
    //   autoHide: true,
    // });
    dispatch(showToastMessage(true, `Error:- ${error.message}`, true));
  }
};

export const GetAllProTags = token => async dispatch => {
  console.warn('TAGS REQUESTED ----------', token);
  console.log('TOKEN ---------->', TOKEN);
  const authToken = await AsyncStorage.getItem('access_token');
  try {
    const response = await axios.get(`${BASE_URL}/tags`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token || authToken,
      },
    });
    console.error('TAGS RESPONSE Data ------>', response?.data);
    if (response?.status === 200 || response?.status === 201) {
      console.log('ALL TAGS RESPONSE IN REDUX', response?.data);
      dispatch({
        type: 'GET_ALL_TAGS',
        payload: response?.data?.data,
      });
    } else {
      //Alert.alert(`${response?.data}`);
      console.log('USER DETAILS ERROR', response);
    }
  } catch (error) {
    console.log('ERROR IN TAGS REDUX ------>', error);
  }
};

export const UpdateUserProTag = tagId => async dispatch => {
  try {
    const authToken = await AsyncStorage.getItem('access_token');
    console.log('TAG ID ---------->', parseInt(tagId));
    console.log('TOKEN ---------->', authToken);
    dispatch({
      type: 'TAG_ADD_SUCCESS',
      payload: false,
    });
    const response = await axios.put(
      `${BASE_URL}/tags`,
      {
        tagId: parseInt(tagId),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: authToken,
        },
      },
    );
    console.log('TAGS Added RESPONSE Data ------>', response?.data);
    if (
      response?.status === 200 ||
      response?.status === 201 ||
      response?.status === 204
    ) {
      console.log('TAG Added RESPONSE IN REDUX', response?.data);
      dispatch({
        type: 'TAG_ADD_SUCCESS',
        payload: true,
      });

      // Toast.show({
      //   type: 'success',
      //   text1: 'Tag added successfully',
      //   visibilityTime: 3000,
      //   autoHide: true,
      // });
      dispatch(showToastMessage(true, `Tag added successfully`, false));
    } else {
      //Alert.alert(`${response?.data}`);
      console.log('USER DETAILS ERROR', response);
      dispatch({
        type: 'TAG_ADD_SUCCESS',
        payload: false,
      });
    }
  } catch (error) {
    console.log('ERROR IN TAGS REDUX ------>', error);
    dispatch({
      type: 'TAG_ADD_SUCCESS',
      payload: false,
    });
  }
};

export const GetOtherUserDetails = id => async dispatch => {
  console.log('ACC ID IN GET USER DETAILS', id);
  console.log('BASE_URL IN GET USER DETAILS', BASE_URL);
  if (id) {
    try {
      const response = await axios.get(`${BASE_URL}/appaccount/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: TOKEN._j,
        },
      });
      console.log('RESPONSE IN REDUX ------>', response);
      console.log('RESPONSE Data ------>', response?.data);
      if (response?.status === 200 || response?.status === 201) {
        console.log('OTHER USER DETAILS RESPONSE IN REDUX', response?.data);
        storeAccountId(response?.data[0]?.id);
        dispatch({
          type: 'OTHER_USER_DETAILS',
          payload: response?.data,
        });
      } else {
        //Alert.alert(`${response?.data}`);
        console.log('OTHER USER DETAILS ERROR', response);
        // Toast.show({
        //   type: 'error',
        //   text1: `Unexpected token status :` + response.status,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        // dispatch(
        //   showToastMessage(
        //     true,
        //     `Unexpected token status : ${response.status}`,
        //     true,
        //   ),
        // );
      }
    } catch (error) {
      //Alert.alert(`${error}`);
      if (error.response) {
        // Toast.show({
        //   type: 'error',
        //   text1: error.response.status + error.response.data.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        // dispatch(
        //   showToastMessage(
        //     true,
        //     `${error.response.status + error.response.data.message}`,
        //     true,
        //   ),
        // );
      } else if (error.request) {
        // Toast.show({
        //   type: 'error',
        //   text1: 'no response received',
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        // dispatch(showToastMessage(true, `no response received`, true));
      } else {
        // Toast.show({
        //   type: 'error',
        //   text1: 'Error:- ' + error.message,
        //   visibilityTime: 3000,
        //   autoHide: true,
        // });
        //dispatch(showToastMessage(true, `Error:- ${error.message}`, true));
      }
      console.log('ERROR IN REDUX ------>', error);
    }
  } else {
    console.log('USER ID NOT FOUND');
  }
};

export const ShowToastMessage = (visible, message, error) => async dispatch => {
  console.log('TOAST MESSAGE CALLED', id);
  try {
    dispatch({
      type: 'TOAST_MESSAGE',
      payload: {
        visible: visible,
        message: message,
        error: error,
      },
    });
  } catch (error) {
    //Alert.alert(`${error}`);
    console.log('ERROR IN TOAST REDUX ------>', error);
  }
};

export const GetAllChats = id => async dispatch => {
  try {
    // setLoading(true);
    // console.log('USER ID', user?.id?.toString());
    const response = await axios.get(`${BASE_URL}/chats/user/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: TOKEN?._j,
      },
    });

    console.log('Get All Chats ----------------------------->', response?.data);
    if (response.status == 200 || response.status == 201) {
      const filteredRooms = response?.data?.filter(
        chat => chat?.chat.isGroupChat,
      );
      console.log('FILTERED ROOMS', filteredRooms);
      const filteredInboxes = response?.data?.filter(
        chat => !chat?.chat.isGroupChat,
      );
      console.log('FILTERED INBOXES', filteredInboxes);
      // setRooms(filteredRooms);
      // setInboxes(filteredInboxes);
      // Toast.show({
      //   type: 'success',
      //   text1: `success`,
      //   visibilityTime: 3000,
      //   autoHide: true,
      // });.

      dispatch({
        type: 'ALL_CHATS',
        payload: response?.data,
      });
    } else {
      // Toast.show({
      //   type: 'error',
      //   text1: `Unexpected token status` + response.status,
      //   visibilityTime: 3000,
      //   autoHide: true,
      // });
      // setLoading(false);
    }
  } catch (error) {
    //Alert.alert(`${error}`)
    dispatch({
      type: 'ALL_CHATS',
      payload: [],
    });
    if (error.response) {
      // Toast.show({
      //   type: 'error',
      //   text1:
      //     'No Chats at the moment' +
      //     error.response.status +
      //     error.response.data.message,
      //   visibilityTime: 3000,
      //   autoHide: true,
      // });
      // setLoading(false);
    } else if (error.request) {
      // Toast.show({
      //   type: 'error',
      //   text1: 'no response received',
      //   visibilityTime: 3000,
      //   autoHide: true,
      // });
      // setLoading(false);
    } else {
      // Toast.show({
      //   type: 'error',
      //   text1: 'Error:- ' + error.message,
      //   visibilityTime: 3000,
      //   autoHide: true,
      // });
      // setLoading(false);
    }
    console.log('Error in get chats', error.message);
  }
};
