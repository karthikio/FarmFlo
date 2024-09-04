import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity, Switch } from 'react-native';
import { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';

function Register({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // New state for phone number
  const [error, setError] = useState('');
  const [isSeller, setIsSeller] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !name || !phoneNumber) {
      Alert.alert('Validation Error', 'All fields are required.');
      return false;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name,
        email: user.email,
        phoneNumber: phoneNumber, // Save phone number
        status: isSeller, 
        createdAt: new Date()
      });
  
      navigation.navigate('Home');
    } catch (error) {
      setError(error.message);
      Alert.alert('Error', error.message);
    }
    setName('');
    setEmail('');
    setPassword('');
    setPhoneNumber('');
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

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.text}>I'm Seller / Farmer</Text>
        <Switch
          value={isSeller}
          onValueChange={setIsSeller}
          trackColor={{ false: "#FF9100", true: "#FF9100" }}
          thumbColor={isSeller ? "#fff" : "#FF9100"}
        />
      </View> 
      
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
  text: {
    fontSize: 18,
    marginVertical: 10,
    paddingLeft: 10,
    color: "#333333", 
    fontWeight: "bold"
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
  }, 
  switchContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
    width: '100%',
  },
})

export default Register;