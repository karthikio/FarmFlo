import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import useUserData from '../hooks/useUserData';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const Dashboard = () => {
  const { user, loading, updateUserData } = useUserData();
  const [userCrops, setUserCrops] = useState([]);
  const [loadingCrops, setLoadingCrops] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const fetchUserCrops = async () => {
      if (user?.uid) {
        const q = query(collection(db, 'crops'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);

        const cropsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUserCrops(cropsList);
      }
      setLoadingCrops(false);
    };

    fetchUserCrops();
  }, [user]); // Refresh data when component is focused or user updates

  useEffect(() => {
    if (route.params?.updatedUser) {
      updateUserData(route.params.updatedUser);
    }
  }, [route.params?.updatedUser]);

  const handleDelete = async (cropId) => {
    try {
      await deleteDoc(doc(db, 'crops', cropId));
      setUserCrops(prevCrops => prevCrops.filter(crop => crop.id !== cropId));
      Alert.alert('Success', 'Crop deleted successfully');
    } catch (error) {
      console.error('Error deleting crop: ', error);
    }
  };

  const renderCropItem = ({ item }) => (
    <TouchableOpacity style={styles.cropItem}>
      <View style={styles.cropDetails}>
        <Text style={styles.cropName}>{item.name}</Text>
        <Text style={styles.cropPrice}>Price: ₹{item.pricePerUnit}</Text>
        <Text style={styles.cropQuantity}>Available Quantity: {item.availableQuantity}</Text>
        <Text style={styles.cropLocation}>Location: {item.location}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderBecomeSellerMessage = () => (
    <View style={styles.becomeSellerContainer}>
      <Icon name="shopping-cart" size={50} color="#00712D" />
      <Text style={styles.becomeSellerText}>
        Become a seller to start adding crops and earn money! 
        {'\n'}
        Edit your profile and enable the seller mode.
      </Text>
      <TouchableOpacity 
        style={styles.linkButton} 
        onPress={() => navigation.navigate('Profile')} // Navigate to Profile page
      >
        <Text style={styles.linkButtonText}>Go to Profile</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading || loadingCrops ? (
        <ActivityIndicator size="large" color="#00712D" />
      ) : user?.status ? (
        <>
          <Text style={styles.dashboardTitle}>Dashboard</Text>
          <Text style={styles.statsText}>You have added {userCrops.length} crops</Text>
          <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('AddCrop')}>
            <Text style={styles.linkButtonText}>
              Add Crop
            </Text>
          </TouchableOpacity>
          <FlatList
            data={userCrops}
            renderItem={renderCropItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </>
      ) : (
        renderBecomeSellerMessage()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f7',
    padding: 20,
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  statsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00712D',
    marginBottom: 20,
  },
  cropItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cropDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cropPrice: {
    fontSize: 16,
    color: '#00712D',
    marginTop: 5,
  },
  cropQuantity: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  cropLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: '#FF5A5F',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 50,
  },
  becomeSellerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  becomeSellerText: {
    fontSize: 18,
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  linkButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#00712D',
    borderRadius: 5,
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default Dashboard;