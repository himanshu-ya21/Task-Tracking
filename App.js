import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
// import { Alert } from 'react-native';
// import { messaging } from './src/utils/firebase';
import TaskListScreen from './src/screens/TaskListScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';

const Stack = createStackNavigator();

const App = () => {
  // useEffect(() => {
  //   console.log('App useEffect: messaging object:', messaging);
  //   const requestPermissions = async () => {
  //     try {
  //       console.log('Requesting permissions...');
  //       const authStatus = await messaging().requestPermission();
  //       const enabled =
  //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //       if (enabled) {
  //         console.log('Authorization status:', authStatus);
  //       }
  //     } catch (error) {
  //       console.log('Permission request failed:', error);
  //     }
  //   };

  //   requestPermissions();

  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     Alert.alert('New Notification', remoteMessage.notification?.body || 'You have a new message');
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TaskList">
          <Stack.Screen name="TaskList" component={TaskListScreen} />
          <Stack.Screen name="TaskForm" component={TaskFormScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
