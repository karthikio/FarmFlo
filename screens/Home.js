import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';
import { useEffect, useState } from 'react';


//hooks
import useUserData from "../hooks/useUserData";

function Home({navigation}) {

  const { user, loading, error, updateUserData } = useUserData();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Good Morning';
    } else if (hour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  const greeting = getGreeting(); 

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }
 
  return(
    <View style={styles.homeContainer}>
      <Text style={styles.greet}>{`${greeting}, ${user.name}!`}</Text>

      {user.status && (
        <Button
          title="Add Crop"
          onPress={() => navigation.navigate('AddCrop')}
          color="#00712D"
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: "flex-start", 
    justifyContent: "flex-start", 
    backgroundColor: "#f5f6f7",
    paddingTop: 20, 
    padding: 10,
  }, 
  text: {
    color: "#ffffff",
  }, 
  greet: {
    fontWeight: "bold", 
    fontSize: 16,
  }
})

export default Home;
