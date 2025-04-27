// screens/ProfileScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);

    // User data (in a real app, this would come from your authentication system)
    const user = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        photo: 'https://randomuser.me/api/portraits/women/17.jpg',
        memberSince: 'March 2023',
    };

    // Order history (mock data)
    const orderHistory = [
        {
            id: 'ORD-2024-0123',
            date: '15 Apr 2024',
            totalAmount: 78.99,
            status: 'Delivered',
        },
        {
            id: 'ORD-2024-0099',
            date: '28 Mar 2024',
            totalAmount: 64.50,
            status: 'Delivered',
        },
        {
            id: 'ORD-2024-0078',
            date: '12 Feb 2024',
            totalAmount: 125.00,
            status: 'Delivered',
        },
    ];

    // Toggle functions
    const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);
    const toggleDarkMode = () => setDarkModeEnabled(!darkModeEnabled);

    return (
        <ScrollView style={styles.container}>
            {/* User Info Section */}
            <View style={styles.profileHeader}>
                <Image source={{ uri: user.photo }} style={styles.profileImage} />
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
            </View>

            {/* Account Actions */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account</Text>

                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="person-outline" size={22} color="#555" />
                    <Text style={styles.menuItemText}>Edit Profile</Text>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.menuItemIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="location-outline" size={22} color="#555" />
                    <Text style={styles.menuItemText}>Address Book</Text>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.menuItemIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="card-outline" size={22} color="#555" />
                    <Text style={styles.menuItemText}>Payment Methods</Text>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.menuItemIcon} />
                </TouchableOpacity>
            </View>

            {/* Order History */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Order History</Text>

                {orderHistory.map((order) => (
                    <TouchableOpacity key={order.id} style={styles.orderItem}>
                        <View>
                            <Text style={styles.orderId}>{order.id}</Text>
                            <Text style={styles.orderDate}>{order.date}</Text>
                        </View>
                        <View style={styles.orderRightSection}>
                            <Text style={styles.orderAmount}>${order.totalAmount.toFixed(2)}</Text>
                            <Text style={[
                                styles.orderStatus,
                                { color: order.status === 'Delivered' ? '#4CAF50' : '#ff9800' }
                            ]}>
                                {order.status}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.viewAllButton}>
                    <Text style={styles.viewAllButtonText}>View All Orders</Text>
                </TouchableOpacity>
            </View>

            {/* Settings */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Settings</Text>

                <View style={styles.settingItem}>
                    <View style={styles.settingItemLeft}>
                        <Ionicons name="notifications-outline" size={22} color="#555" />
                        <Text style={styles.settingItemText}>Notifications</Text>
                    </View>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={toggleNotifications}
                        trackColor={{ false: "#ddd", true: "#ff6b81" }}
                        thumbColor={notificationsEnabled ? "#fff" : "#fff"}
                    />
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.settingItemLeft}>
                        <Ionicons name="moon-outline" size={22} color="#555" />
                        <Text style={styles.settingItemText}>Dark Mode</Text>
                    </View>
                    <Switch
                        value={darkModeEnabled}
                        onValueChange={toggleDarkMode}
                        trackColor={{ false: "#ddd", true: "#ff6b81" }}
                        thumbColor={darkModeEnabled ? "#fff" : "#fff"}
                    />
                </View>

                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="language-outline" size={22} color="#555" />
                    <Text style={styles.menuItemText}>Language</Text>
                    <View style={styles.menuItemRight}>
                        <Text style={styles.menuItemRightText}>English</Text>
                        <Ionicons name="chevron-forward" size={20} color="#ccc" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="help-circle-outline" size={22} color="#555" />
                    <Text style={styles.menuItemText}>Help & Support</Text>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.menuItemIcon} />
                </TouchableOpacity>
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton}>
                <Ionicons name="log-out-outline" size={22} color="#ff6b81" />
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>

            {/* App Version */}
            <Text style={styles.versionText}>App Version 1.0.0</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profileHeader: {
        alignItems: 'center',
        padding: 20,
        paddingBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    userEmail: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    memberSince: {
        fontSize: 14,
        color: '#999',
        marginTop: 8,
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    menuItemText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        marginLeft: 12,
    },
    menuItemIcon: {
        marginLeft: 'auto',
    },
    menuItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemRightText: {
        fontSize: 14,
        color: '#999',
        marginRight: 5,
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    orderId: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
    },
    orderDate: {
        fontSize: 14,
        color: '#888',
        marginTop: 3,
    },
    orderRightSection: {
        alignItems: 'flex-end',
    },
    orderAmount: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
    },
    orderStatus: {
        fontSize: 14,
        marginTop: 3,
    },
    viewAllButton: {
        alignItems: 'center',
        padding: 12,
        marginTop: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    viewAllButtonText: {
        fontSize: 16,
        color: '#ff6b81',
        fontWeight: 'bold',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    settingItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingItemText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 12,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ff6b81',
    },
    logoutButtonText: {
        fontSize: 16,
        color: '#ff6b81',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    versionText: {
        textAlign: 'center',
        color: '#999',
        fontSize: 12,
        marginBottom: 30,
    },
});