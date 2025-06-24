import '@/app/globals.css';
import { toastConfig } from '@/components/toastConfig';
import { AuthProvider } from '@/contexts/AuthContext';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Toast from 'react-native-toast-message';


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBackgroundColorAsync('transparent');
  }, []);

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#EDB24E" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast config={toastConfig} />
    </AuthProvider>
  );
}
