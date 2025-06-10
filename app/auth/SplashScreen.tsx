import { Button } from '@/components/Button';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function SplashScreen() {
  return (
    <View className="flex-1 p-28 justify-end items-center gap-4">
      <Image
        source={require('@/assets/images/moema.gif')}
        style={{ width: 200, height: 300 }}
        contentFit="contain"
      />
      <Text className='w-80 text-3xl font-poppinssb text-center text-black'>
        Preparado para explorar o campus?
      </Text>
      <Text className='w-96 text-base text-center text-stone-500 font-poppins leading-tight'>
        Crie sua conta e comece agora mesmo a descobrir os incríveis animais que vivem na Universidade de Fortaleza.
      </Text>
      
      <Button 
        title="Criar conta" 
        variant="primary" 
        onPress={() => router.push('/auth/Register')} 
      />

      <Link href="/auth/Login">
        <Text className="w-full font-poppinssb text-xl text-blue-800">Já tenho uma conta</Text>
      </Link>
    </View>
  );
}
