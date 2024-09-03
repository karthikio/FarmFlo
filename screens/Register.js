//react
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import {useState} from "react";

//firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';



function Register({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(collection(db, 'users'), {
        userId: user.uid,
        name: name,
        email: user.email,
        createdAt: new Date()
      });
  
      navigation.navigate('Home');
    } catch (error) {
      setError(error.message);
      console.log(error.message)
    }
    setName('');
    setEmail('');
    setPassword('');
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
        placeholder="Email"
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
        <Button title="Register" onPress={handleSignUp} color="#ffffff" />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: '#333333', marginTop: 20 }}>
          Already have an account? Log In
        </Text>
      </TouchableOpacity>
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
    backgroundColor: "#FF9100", 
    color: "#ffffff", 
    marginTop: 20,
    borderRadius: 10
  },
  link: {
    marginTop: 30,
  }
})