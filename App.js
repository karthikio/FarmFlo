import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './firebaseConfig';



const Stack = createStackNavigator();


export default function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return () => unsubscribe(); 
  }, [initializing]);

  if (initializing) return null;

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} /> 
          </>
        )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6f7",
  },
});
