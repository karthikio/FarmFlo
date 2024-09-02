import { StyleSheet, Text, View } from 'react-native';

function Home() {
  return(
    <View style={styles.homeContainer}>
      <Text style={styles.text}>Home</Text>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "#f5f6f7",
  }, 
  text: {
    color: "#ffffff",
  }
})