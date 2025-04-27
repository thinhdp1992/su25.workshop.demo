// screens/ImageCaptionScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
console.log(API_URL)

export default function ImageCaptionScreen() {
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [caption, setCaption] = useState(null);
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please grant permission to access your photo library');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setImageBase64(result.assets[0].base64);
            setCaption(null);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please grant permission to access your camera');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setImageBase64(result.assets[0].base64);
            setCaption(null);
        }
    };

    const generateCaption = async () => {
        if (!imageBase64) {
            Alert.alert('No image', 'Please select or take a photo first');
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/caption-image`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image_base64: imageBase64,
                }),
            });

            const data = await response.json();
            console.log(data)

            if (data.caption) {
                setCaption(data.caption);
            } else {
                Alert.alert('Error', 'Could not generate caption for this image');
            }
            setLoading(false);

        } catch (error) {
            console.error('Error generating caption:', error);
            Alert.alert('Error', 'Failed to generate caption. Please try again.');
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Flower Image Caption</Text>
                <Text style={styles.subtitle}>
                    Upload a flower photo and our AI will describe it
                </Text>
            </View>

            <View style={styles.imageContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                    <View style={styles.placeholderImage}>
                        <MaterialCommunityIcons name="flower" size={80} color="#ddd" />
                        <Text style={styles.placeholderText}>No image selected</Text>
                    </View>
                )}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <MaterialCommunityIcons name="image" size={24} color="white" />
                    <Text style={styles.buttonText}>Choose Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                    <MaterialCommunityIcons name="camera" size={24} color="white" />
                    <Text style={styles.buttonText}>Take Photo</Text>
                </TouchableOpacity>
            </View>

            {image && (
                <TouchableOpacity
                    style={[styles.captionButton, loading && styles.disabledButton]}
                    onPress={generateCaption}
                    disabled={loading}
                >
                    <MaterialCommunityIcons name="text-recognition" size={24} color="white" />
                    <Text style={styles.buttonText}>Generate Caption</Text>
                </TouchableOpacity>
            )}

            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#ff6b81" />
                    <Text style={styles.loadingText}>Generating caption...</Text>
                </View>
            )}

            {caption && (
                <View style={styles.captionContainer}>
                    <Text style={styles.captionTitle}>Flower Description:</Text>
                    <Text style={styles.captionText}>{caption}</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 5,
    },
    imageContainer: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        marginTop: 10,
        color: '#888',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ff6b81',
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.48,
    },
    captionButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    disabledButton: {
        backgroundColor: '#A5D6A7',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    loadingContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
    },
    captionContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    captionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    captionText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#444',
    },
});