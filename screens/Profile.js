import { View, Text,  StyleSheet, ActivityIndicator, Button, TouchableOpacity, Modal, TextInput, Switch} from "react-native";
import {useState, useEffect} from "react";
import { Ionicons } from '@expo/vector-icons'; 

import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from "../firebaseConfig";
import { signOut } from 'firebase/auth';


//hooks
import useUserData from "../hooks/useUserData";


const Profile = () => {

  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [location, setLocation] = useState(user?.location || '');
  const [isSeller, setIsSeller] = useState(user?.status);  

  const { user, loading, error, updateUserData } = useUserData();

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhoneNumber(user.phoneNumber || '');
      setLocation(user.location || '');
      setIsSeller(user.status || false);    
    }
  }, [user]);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
      console.log(auth.onAuthStateChanged)
    } catch (error) {
      console.log(error.message)
    }
  };

  const handleSave = () => {
    updateUserData({ 
      name, 
      phoneNumber, 
      location, 
      status: isSeller 
    });
    setModalVisible(false);
  };

  const handleCancel = () => {
    setIsSeller(user.status || false);    
    setModalVisible(false);
  };


  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00712D" />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return(
    <View style={styles.profileContainer}> 
      {user ? (
        <>
        <View style={styles.horizontal}>
          <Ionicons name="person-circle-outline" size={30}  color="#333333" />
          <Text style={styles.text}>{user.name}</Text>
        </View>

        <View style={styles.horizontal}>
          <Ionicons name="mail-outline" size={30}  color="#333333" />
          <Text style={styles.text}>{user.email}</Text>
        </View>


          <View style={styles.horizontal}>
          <Ionicons name="phone-portrait-outline" size={30}  color="#333333" />
          <Text style={styles.text}>{user?.phoneNumber}</Text>
          </View>

          <View style={styles.horizontal}>
          <Ionicons name="location-outline" size={30}  color="#333333" />
          <Text style={styles.text}>{user?.location}</Text>
          </View>

      
          <TouchableOpacity onPress={handleLogout}>
          <View style={styles.horizontal}>
            <Ionicons name="log-out-outline" size={30}  color="#FF9100" />
            <Text style={styles.text}>Logout</Text>
          </View>
          </TouchableOpacity>

       
        </>
      ) : (
        <Text style={styles.text}>No user data found</Text>
      )}

    <View style={styles.btn} >
    <Button title="Edit Profile" onPress={() => setModalVisible(true)} color="#ffffff" />
    </View>

<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalView}>
  <Text style={styles.title}>Profile Settings</Text>
    <TextInput
      placeholder="Name"
      value={name}
      onChangeText={setName}
      style={styles.input}
    />
    <TextInput
      placeholder="Phone Number"
      value={phoneNumber}
      onChangeText={setPhoneNumber}
      style={styles.input}
    />
    <TextInput
      placeholder="Location"
      value={location}
      onChangeText={setLocation}
      style={styles.input}
    />

  <View style={styles.switchContainer}>
      <Text style={styles.text}>Seller</Text>
      <Switch
          value={isSeller}
          onValueChange={setIsSeller}
          trackColor={{ false: "#FF9100", true: "#FF9100" }}
          thumbColor={isSeller ? "#fff" : "#FF9100"}
        />
    </View>
    
    <View style={styles.horizontal}>
    <Button title="Cancel" onPress={() => handleCancel()} />
    <Button title="Save" onPress={handleSave} />
    </View>

  </View>
  </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',    
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
    paddingLeft: 10,
  },
  horizontal:{
    flexDirection: "row",
    alignItems: "center", 
    paddingBottom: 12, 
  }, 
  title: {
    paddingTop: 60,
    paddingBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    width: "100%",
    borderRadius: 4,
    backgroundColor: "#FF9100", 
    color: "#ffffff", 
    marginTop: 20,
    borderRadius: 10
  },
  switchContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default Profile;