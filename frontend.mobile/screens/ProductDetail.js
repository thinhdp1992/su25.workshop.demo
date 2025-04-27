// components/ProductDetail.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductDetail({ route }) {
    const { product } = route.params;
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(prev => !prev);
    };

    return (
        <View style={styles.productCard}>
            <Image
                source={product.image}
                style={styles.productImage}
            />
            <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
                <Ionicons
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={22}
                    color="#ff6b81"
                />
            </TouchableOpacity>
            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#ffc107" />
                    <Ionicons name="star" size={14} color="#ffc107" />
                    <Ionicons name="star" size={14} color="#ffc107" />
                    <Ionicons name="star" size={14} color="#ffc107" />
                    <Ionicons name="star-half" size={14} color="#ffc107" />
                    <Text style={styles.ratingText}>(4.5)</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        margin: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    productImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
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
        marginBottom: 6,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 12,
        color: '#888',
        marginLeft: 4,
    },
});

