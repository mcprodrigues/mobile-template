import '@/app/globals.css';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import React from 'react';
import { ActivityIndicator, View } from 'react-native';



export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf')

  })

  if (!fontsLoaded) {

    return (
      <View className='flex-1 justify-center items-center bg-white'>
        <ActivityIndicator size='large' color="EDB24E"></ActivityIndicator>
      </View>
    )

  }

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
