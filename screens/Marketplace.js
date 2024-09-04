import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

const Marketplace = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('lowToHigh');

  useEffect(() => {
    fetchCrops();
  }, [sortOption]);

  const fetchCrops = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'crops'),
        orderBy('pricePerUnit', sortOption === 'lowToHigh' ? 'asc' : 'desc')
      );
      const querySnapshot = await getDocs(q);
      const cropsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCrops(cropsData);
    } catch (error) {
      console.error('Error fetching crops:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.cropItem}>
      {item.photo ? (
        <Image source={{ uri: item.photo }} style={styles.cropImage} />
      ) : (
        <Text style={styles.noImageText}>No Image Available</Text>
      )}
      <View style={styles.cropDetails}>
        <Text style={styles.cropName}>{item.name}</Text>
        <Text style={styles.cropPrice}>Price: ₹{item.pricePerUnit}</Text>
        <Text style={styles.cropQuantity}>Available Quantity: {item.availableQuantity}</Text>
        <Text style={styles.cropLocation}>Location: {item.location}</Text>
      </View>
    </View>
  );

  const handleSortChange = () => {
    setSortOption(prevOption => (prevOption === 'lowToHigh' ? 'highToLow' : 'lowToHigh'));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sortButton} onPress={handleSortChange}>
        <Text style={styles.sortText}>
          Sort by Price: {sortOption === 'lowToHigh' ? 'Low to High' : 'High to Low'}
        </Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#00712D" />
      ) : (
        <FlatList
          data={crops}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00712D',
  },
  sortButton: {
    padding: 10,
    backgroundColor: '#00712D',
    borderRadius: 5,
    marginBottom: 20,
  },
  sortText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
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
  cropImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 15,
  },
  noImageText: {
    width: 80,
    height: 80,
    borderRadius: 5,
    backgroundColor: '#ccc',
    textAlign: 'center',
    lineHeight: 80, // To center the text vertically
    marginRight: 15,
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
});

export default Marketplace;