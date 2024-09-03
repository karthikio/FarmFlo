import { FlatList, StyleSheet, Text, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { collection } from 'firebase/firestore';

// import { db } from '../firebaseConfig';
// import { collection, onSnapshot } from 'firebase/firestore';


function Home({ navigation }) {
  const [error, setError] = useState('');


    const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
      console.log(auth.onAuthStateChanged)
    } catch (error) {
      setError(error.message);
      console.log(error.message)
    }
  };
  // const [crops, setCrops] = useState([]);

  // useEffect(() => {
  //   const cropRef = collection(db, 'crop');
  //   const subscriber = onSnapshot(cropRef, {
  //     next: (snapshot) => {
  //       const crops= [];
  //       snapshot.docs.forEach((doc) => {
  //         crops.push({
  //           id: doc.id,
  //           ...doc.data()
  //         });
  //       });

  //       setCrops(crops);

  //     }
  //   });

  //   // // Unsubscribe from events when no longer in use
  //   return () => subscriber();
  // }, []);

  return (
    <>
      <View style={styles.WelcomeBanner}>
        <Text style={styles.greetings} >{`${getGreeting()}, ${name}`}</Text>
      </View>
      <View style={styles.homeContainer}>
        <Text style={styles.text}>Home</Text>
        {/* <FlatList
        data={crops}
        renderItem={
          (({item}) => <Text>{item.name}</Text>)
        }
        keyExtractor={item => item.id}
      /> */}
        <Text>{auth.currentUser.email}</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </>
  );
}

export default Home;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f6f7",
    paddingTop: 60
  },
  text: {
    color: "#ffffff",
  }
});