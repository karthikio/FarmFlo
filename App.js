import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';

export default function App() {
  return (
    <View style={styles.container}>
      <Register/>
      {/* <Login/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6f7",
  },
});
