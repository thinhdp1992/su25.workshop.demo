// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from './screens/HomeScreen';
// import UploadCaptionScreen from './screens/UploadCaptionScreen';
// import GenerateImageScreen from './screens/GenerateImageScreen';
// import ProfileScreen from './screens/ProfileScreen';

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator screenOptions={{ headerShown: false }}>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Upload & Caption" component={UploadCaptionScreen} />
//         <Tab.Screen name="Generate Image" component={GenerateImageScreen} />
//         <Tab.Screen name="Profile" component={ProfileScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// #######################################
// import { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, Image, TextInput, Button, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Constants
// const API_URL = 'http://localhost:8000'; // Replace with your actual API URL

// // Home Screen
// function HomeScreen() {
//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.hero}>
//         <Text style={styles.heroTitle}>Welcome to Flower Shop</Text>
//         <Text style={styles.heroSubtitle}>Discover beautiful flowers for every occasion</Text>
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Featured Collections</Text>
//         <Text style={styles.sectionText}>Explore our popular flower arrangements.</Text>
//         {/* Placeholder for featured products */}
//         <View style={styles.placeholder}>
//           <Text style={styles.placeholderText}>Featured Products Coming Soon!</Text>
//         </View>
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Why Choose Us?</Text>
//         <Text style={styles.sectionText}>Fresh flowers, fast delivery, and AI-powered designs.</Text>
//       </View>
//     </ScrollView>
//   );
// }

// // Image Captioning Screen
// function CaptionScreen() {
//   const [image, setImage] = useState(null);
//   const [caption, setCaption] = useState('');
//   const [loading, setLoading] = useState(false);

//   const pickImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Sorry, we need camera roll permissions to make this work!');
//       return;
//     }

//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       setCaption('');
//     }
//   };

//   const handleCaption = async () => {
//     if (!image) return;

//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('image', {
//         uri: image,
//         type: 'image/jpeg',
//         name: 'upload.jpg',
//       });

//       const response = await fetch(`${API_URL}/caption-image`, {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const data = await response.json();
//       setCaption(data.caption || 'No caption generated.');
//     } catch (error) {
//       console.error('Error generating caption:', error);
//       setCaption('Error generating caption.');
//     }
//     setLoading(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.sectionTitle}>Image Captioning</Text>
//       <Text style={styles.sectionText}>Upload an image to get a description.</Text>
//       <TouchableOpacity style={styles.button} onPress={pickImage}>
//         <Text style={styles.buttonText}>Pick an Image</Text>
//       </TouchableOpacity>
//       {image && (
//         <Image source={{ uri: image }} style={styles.image} />
//       )}
//       <TouchableOpacity
//         style={[styles.button, loading && styles.buttonDisabled]}
//         onPress={handleCaption}
//         disabled={loading}
//       >
//         <Text style={styles.buttonText}>{loading ? 'Generating...' : 'Generate Caption'}</Text>
//       </TouchableOpacity>
//       {caption && (
//         <Text style={styles.captionText}>Caption: {caption}</Text>
//       )}
//       {loading && <ActivityIndicator size="large" color="#3b82f6" />}
//     </View>
//   );
// }

// // Image Generation Screen
// function GenerateScreen() {
//   const [prompt, setPrompt] = useState('');
//   const [image, setImage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleGenerate = async () => {
//     if (!prompt.trim()) return;

//     setLoading(true);
//     try {
//       const response = await fetch(`${API_URL}/generate-image`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt }),
//       });
//       const data = await response.json();
//       setImage(`data:image/png;base64,${data.image_base64}`);
//     } catch (error) {
//       console.error('Error generating image:', error);
//       alert('Failed to generate image.');
//     }
//     setLoading(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.sectionTitle}>Generate Flower Image</Text>
//       <Text style={styles.sectionText}>Enter a prompt to create a flower image.</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter prompt..."
//         value={prompt}
//         onChangeText={setPrompt}
//       />
//       <TouchableOpacity
//         style={[styles.button, loading && styles.buttonDisabled]}
//         onPress={handleGenerate}
//         disabled={loading}
//       >
//         <Text style={styles.buttonText}>{loading ? 'Generating...' : 'Generate Image'}</Text>
//       </TouchableOpacity>
//       {image && (
//         <Image source={{ uri: image }} style={styles.image} />
//       )}
//       {loading && <ActivityIndicator size="large" color="#3b82f6" />}
//     </View>
//   );
// }

// // Profile Screen
// function ProfileScreen() {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');

//   useEffect(() => {
//     // Load user data from AsyncStorage (mocked for simplicity)
//     const loadUserData = async () => {
//       try {
//         const storedUsername = await AsyncStorage.getItem('username');
//         const storedEmail = await AsyncStorage.getItem('email');
//         if (storedUsername) setUsername(storedUsername);
//         if (storedEmail) setEmail(storedEmail);
//       } catch (error) {
//         console.error('Error loading user data:', error);
//       }
//     };
//     loadUserData();
//   }, []);

//   const handleSave = async () => {
//     try {
//       await AsyncStorage.setItem('username', username);
//       await AsyncStorage.setItem('email', email);
//       alert('Profile saved!');
//     } catch (error) {
//       console.error('Error saving profile:', error);
//       alert('Failed to save profile.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.sectionTitle}>User Profile</Text>
//       <Text style={styles.sectionText}>Manage your account details.</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />
//       <TouchableOpacity style={styles.button} onPress={handleSave}>
//         <Text style={styles.buttonText}>Save Profile</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// // Bottom Tab Navigator
// const Tab = createBottomTabNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//             if (route.name === 'Home') {
//               iconName = focused ? 'home' : 'home-outline';
//             } else if (route.name === 'Caption') {
//               iconName = focused ? 'image' : 'image-outline';
//             } else if (route.name === 'Generate') {
//               iconName = focused ? 'sparkles' : 'sparkles-outline';
//             } else if (route.name === 'Profile') {
//               iconName = focused ? 'person' : 'person-outline';
//             }
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: '#3b82f6',
//           tabBarInactiveTintColor: 'gray',
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Caption" component={CaptionScreen} />
//         <Tab.Screen name="Generate" component={GenerateScreen} />
//         <Tab.Screen name="Profile" component={ProfileScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9fafb',
//     padding: 16,
//   },
//   hero: {
//     backgroundColor: '#e0f2fe',
//     padding: 24,
//     borderRadius: 12,
//     marginBottom: 16,
//     alignItems: 'center',
//   },
//   heroTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1f2937',
//   },
//   heroSubtitle: {
//     fontSize: 16,
//     color: '#4b5563',
//     marginTop: 8,
//   },
//   section: {
//     marginBottom: 24,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1f2937',
//     marginBottom: 8,
//   },
//   sectionText: {
//     fontSize: 16,
//     color: '#4b5563',
//   },
//   placeholder: {
//     backgroundColor: '#e5e7eb',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   placeholderText: {
//     fontSize: 16,
//     color: '#6b7280',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#d1d5db',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//     fontSize: 16,
//     backgroundColor: '#fff',
//   },
//   button: {
//     backgroundColor: '#3b82f6',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   buttonDisabled: {
//     backgroundColor: '#93c5fd',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   image: {
//     width: 200,
//     height: 200,
//     borderRadius: 8,
//     marginBottom: 16,
//     alignSelf: 'center',
//   },
//   captionText: {
//     fontSize: 16,
//     color: '#1f2937',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
// });

// export default App;

// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './screens/HomeScreen';
import ImageCaptionScreen from './screens/ImageCaptionScreen';
import GenerateImageScreen from './screens/GenerateImageScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductDetail from './screens/ProductDetail';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home Stack" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="Product Detail" component={ProductDetail} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Image Caption') {
              iconName = focused ? 'image' : 'image-outline';
            } else if (route.name === 'Generate') {
              iconName = focused ? 'color-wand' : 'color-wand-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ff6b81',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Image Caption" component={ImageCaptionScreen} />
        <Tab.Screen name="Generate" component={GenerateImageScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
