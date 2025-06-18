import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

export default function LoginSuccess() {

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-950">
        <LottieView
          source={require('@/assets/lottie/loading.json')}
          autoPlay
          loop
          style={{ width: 120, height: 120 }}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 p-28 justify-end items-center gap-4 bg-white">
      <Image
        source={require('@/assets/images/pixel.png')}
        style={{ width: 200, height: 300 }}
      />
      <Text className="w-80 text-3xl font-poppinssb text-center text-black">
        Bem-vindo de volta, Treinador!
      </Text>
      <Text className="w-96 text-base text-center text-stone-500 font-poppins leading-tight">
        Esperamos que tenha tido uma longa jornada desde a última vez em que nos visitou.      </Text>

      <Button
        title="Acessar Pokédex"
        variant="primary"
        onPress={() => router.push('/(tabs)')}
      />
    </View>
  );
}