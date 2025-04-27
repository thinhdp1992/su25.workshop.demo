// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { products } from '../data';

const API_URL = 'https://your-backend-url.com/api';

export default function HomeScreen({ navigation }) {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, fetch data from your API
        fetchFeaturedProducts();
    }, []);

    const fetchFeaturedProducts = async () => {
        try {
            // Sort products by quantity descending and take top 4
            const topProducts = products
                .sort((a, b) => b.quantity - a.quantity)
                .slice(0, 4);
            setTimeout(() => {
                setFeaturedProducts(topProducts);
                setLoading(false);
            }, 1000); // Fake loading for demo
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const renderProductItem = ({ item }) => (
        <TouchableOpacity style={styles.productCard} onPress={() => navigation.navigate('Product Detail', { product: item })}>
            <Image
                source={item.image}
                style={styles.productImage}
            />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
                <Text style={styles.productDescription} numberOfLines={2}>
                    {item.description}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <StatusBar style="auto" />

            {/* Hero Section */}
            <View style={styles.heroSection}>
                <Text style={styles.heroTitle}>Beautiful Flowers</Text>
                <Text style={styles.heroSubtitle}>For Every Occasion</Text>
                <TouchableOpacity style={styles.heroButton}>
                    <Text style={styles.heroButtonText}>Shop Now</Text>
                </TouchableOpacity>
            </View>

            {/* Featured Products */}
            <View style={styles.featuredSection}>
                <Text style={styles.sectionTitle}>Featured Collections</Text>
                <Text style={styles.sectionSubtitle}>Our most popular arrangements</Text>

                {loading ? (
                    <Text style={styles.loadingText}>Loading featured products...</Text>
                ) : (
                    <FlatList
                        data={featuredProducts}
                        renderItem={renderProductItem}
                        keyExtractor={item => item.id.toString()}
                        horizontal={false}
                        numColumns={2}
                        contentContainerStyle={styles.productList}
                        scrollEnabled={false}
                    />
                )}
            </View>

            {/* Image Generator Promo */}
            <View style={styles.promoSection}>
                <Text style={styles.promoTitle}>Create Custom Designs</Text>
                <Text style={styles.promoText}>
                    Use our AI-powered tools to visualize your dream flower arrangements
                </Text>
                <TouchableOpacity style={styles.promoButton}>
                    <Text style={styles.promoButtonText}>Try Now</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    heroSection: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff6b81',
        padding: 20,
    },
    heroTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    heroSubtitle: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 20,
    },
    heroButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
    },
    heroButtonText: {
        color: '#ff6b81',
        fontWeight: 'bold',
        fontSize: 16,
    },
    featuredSection: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 8,
    },
    sectionSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        padding: 20,
    },
    productList: {
        paddingBottom: 10,
    },
    productCard: {
        flex: 1,
        margin: 8,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        maxWidth: '45%',
    },
    productImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    productInfo: {
        padding: 12,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#ff6b81',
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
    },
    promoSection: {
        padding: 20,
        backgroundColor: '#f9f1f3',
        alignItems: 'center',
        marginVertical: 10,
    },
    promoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    promoText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 15,
    },
    promoButton: {
        backgroundColor: '#ff6b81',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
    },
    promoButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});