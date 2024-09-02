import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import {useState} from "react";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (email && password) {
      Alert.alert('Login Successful', `Welcome}!`);
    } else {
      Alert.alert('Login Failed', 'Invalid username or password.');
    }
  };

  return (
    <View style={styles.registerContainer}>
      <Text style={styles.heading}>Create an account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
        autoCorrect={false}
      />

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
        <Button title="Register" onPress={handleRegister} color="#ffffff" />
      </View>

      <Text style={styles.link}>Already have an account?</Text>
    </View>
  );
}

export default Register;

const styles = StyleSheet.create({
    registerContainer: {
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
  link: {
    marginTop: 30,
  }
})