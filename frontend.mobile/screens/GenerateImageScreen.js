// screens/GenerateImageScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    ScrollView,
    Alert
} from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
console.log(API_URL)

export default function GenerateImageScreen() {
    const [prompt, setPrompt] = useState('');
    const [generatedImage, setGeneratedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateImage = async () => {
        if (!prompt.trim()) {
            Alert.alert('Error', 'Please enter a description');
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/generate-image`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt,
                }),
            });

            const data = await response.json();
            // console.log(data)

            if (data.image_url) {
                setGeneratedImage(data.image_url);
            } else {
                Alert.alert('Error', 'Could not generate image. Please try again.');
            }
            setLoading(false);

        } catch (error) {
            console.error('Error generating image:', error);
            Alert.alert('Error', 'Failed to generate image. Please try again.');
            setLoading(false);
        }
    };

    const examplePrompts = [
        "A bouquet of red roses and white lilies",
        "Colorful spring flowers in a vintage vase",
        "Wedding centerpiece with pastel flowers",
        "Modern minimalist flower arrangement"
    ];

    const useExamplePrompt = (prompt) => {
        setPrompt(prompt);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Generate Flower Images</Text>
                <Text style={styles.subtitle}>
                    Describe your ideal flower arrangement and our AI will create it
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Describe the flower arrangement..."
                    value={prompt}
                    onChangeText={setPrompt}
                    multiline
                    numberOfLines={4}
                />
                <TouchableOpacity
                    style={[styles.generateButton, !prompt.trim() && styles.disabledButton]}
                    onPress={generateImage}
                    disabled={!prompt.trim() || loading}
                >
                    <Text style={styles.generateButtonText}>
                        {loading ? 'Generating...' : 'Generate Image'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.examplesContainer}>
                <Text style={styles.examplesTitle}>Try these examples:</Text>
                <View style={styles.exampleButtons}>
                    {examplePrompts.map((examplePrompt, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.exampleButton}
                            onPress={() => useExamplePrompt(examplePrompt)}
                        >
                            <Text style={styles.exampleButtonText} numberOfLines={1}>
                                {examplePrompt}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#ff6b81" />
                    <Text style={styles.loadingText}>Creating your flower image...</Text>
                </View>
            )}

            {generatedImage && !loading && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>Your Generated Arrangement</Text>
                    <Image
                        source={{ uri: generatedImage }}
                        style={styles.generatedImage}
                    />
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    inputContainer: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        height: 120,
        textAlignVertical: 'top',
    },
    generateButton: {
        backgroundColor: '#ff6b81',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 15,
    },
    disabledButton: {
        backgroundColor: '#ffb6c1',
    },
    generateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    examplesContainer: {
        padding: 20,
    },
    examplesTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    exampleButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    exampleButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        margin: 5,
    },
    exampleButtonText: {
        color: '#666',
        fontSize: 14,
    },
    loadingContainer: {
        padding: 40,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
        fontSize: 16,
    },
    resultContainer: {
        padding: 20,
        alignItems: 'center',
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    generatedImage: {
        width: '90%',
        height: 350,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    actionButton: {
        backgroundColor: '#ff6b81',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginHorizontal: 10,
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});