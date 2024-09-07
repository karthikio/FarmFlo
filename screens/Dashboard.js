import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import useUserData from '../hooks/useUserData';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const { user, loading, updateUserData } = useUserData();
  const [userCrops, setUserCrops] = useState([]);
  const [loadingCrops, setLoadingCrops] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const navigation = useNavigation();

  // Fetch user crops
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
  }, [user]);

  // Real-time listener for notifications
  useEffect(() => {
    if (user?.uid) {
      const notificationsQuery = query(collection(db, 'notifications'), where('sellerUid', '==', user.uid));
      const unsubscribe = onSnapshot(
        notificationsQuery,
        (snapshot) => {
          const notificationsList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNotifications(notificationsList);
          setLoadingNotifications(false);
        },
        (error) => {
          console.error('Error fetching notifications: ', error);
          setLoadingNotifications(false);
          Alert.alert('Error', 'Failed to fetch notifications');
        }
      );
      return () => unsubscribe(); // Clean up listener on unmount
    }
  }, [user]);

  const handleDeleteCrop = async (cropId) => {
    try {
      await deleteDoc(doc(db, 'crops', cropId));
      setUserCrops(prevCrops => prevCrops.filter(crop => crop.id !== cropId));
      Alert.alert('Success', 'Crop deleted successfully');
    } catch (error) {
      console.error('Error deleting crop: ', error);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await deleteDoc(doc(db, 'notifications', notificationId));
      setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== notificationId));
      Alert.alert('Success', 'Notification deleted successfully');
    } catch (error) {
      console.error('Error deleting notification: ', error);
    }
  };

  const renderCropItem = ({ item }) => (
    <TouchableOpacity style={styles.cropItem}>
      <View style={styles.cropDetails}>
        <Text style={styles.cropName}>{item.name}</Text>
        <Text style={styles.cropPrice}>Price: ₹{item.pricePerUnit}</Text>
        <Text style={styles.cropQuantity}>Available Quantity: {item.availableQuantity}</Text>
        <Text style={styles.cropLocation}>Location: {item.location}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteCrop(item.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>Buyer: {item.userName}</Text>
        <Text style={styles.notificationText}>Crop: {item.cropName}</Text>
        <Text style={styles.notificationText}>Timestamp: {new Date(item.timestamp.toDate()).toLocaleString()}</Text>
      </View>
      <TouchableOpacity style={styles.deleteIconButton} onPress={() => handleDeleteNotification(item.id)}>
        <Icon name="trash" size={20} color="#FF5A5F" />
      </TouchableOpacity>
    </View>
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
      {loading || loadingCrops || loadingNotifications ? (
        <ActivityIndicator size="large" color="#00712D" />
      ) : user?.status ? (
        <>
          <Text style={styles.statsText}>You have added {userCrops.length} crops</Text>
          <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('AddCrop')}>
            <Text style={styles.linkButtonText}>Add Crop</Text>
          </TouchableOpacity>
          <FlatList
            data={userCrops}
            renderItem={renderCropItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
          />
          <Text style={styles.notificationsTitle}>Notifications</Text>
          <FlatList
            data={notifications}
            renderItem={renderNotificationItem}
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
  statsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00712D',
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
    paddingTop: 20,
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
  notificationsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00712D',
    marginTop: 20,
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  deleteIconButton: {
    padding: 10,
    borderRadius: 5,
  },
});

export default Dashboard;