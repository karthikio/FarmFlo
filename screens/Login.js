import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import {useState} from "react";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      Alert.alert("Register Successful.");
    } else {
      Alert.alert('Please enter all fields.');
    }
  };

  return(
    <View style={styles.loginContainer}>
      <Text style={styles.heading}>Welcome Back</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false} 
        textContentType="emailAddress"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false} 
      />
      <View style={styles.btn}>
      <Button title="Login" onPress={handleLogin} color="#ffffff" />
      </View>

      <Text style={styles.link}>Don't have an account?</Text>

    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
    loginContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
    backgroundColor: "#FFFBE6",
    padding: 10,
    display: 'flex',
  },
  heading: {
    color: "#333333",
    fontSize: 20,
    fontWeight: "900", 
    paddingBottom: 30,
  }, 
  input: {
    height: 40,
    width: "100%",
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
    btn: {
    height: 40,
    width: "80%",
    borderRadius: 4,
    backgroundColor: "#00712D", 
    color: "#ffffff", 
    marginTop: 20,
    borderRadius: 10
  },
  forgetPwd: {
    color: "#D5ED9F",
    fontSize: 10, 
  }, 
  link: {
    marginTop: 30,
  }
})