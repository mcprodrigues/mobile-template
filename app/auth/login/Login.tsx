import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { Button } from '@/components/Button';
import Header from '@/components/Header';

export default function Login() {

  const router = useRouter();

  return (
    <View className="flex-1 pt-14">
      <Header title="Entrar" router={router} />
      <View className="flex-1 items-center justify-center gap-4 px-8">
        <Image
          source={require('@/assets/images/moema.gif')}
          style={{ width: 200, height: 300 }}
          contentFit="contain"
        />
        <Text className="w-80 text-3xl font-poppinssb text-center text-black">
          Que bom te ver por aqui novamente!
        </Text>
        <Text className="w-96 text-base text-center text-stone-500 font-poppins leading-tight">
          Entre novamente e siga explorando o campus da Universidade de Fortaleza
        </Text>

        <Button
          title="Continuar com o e-mail"
          variant="primary"
          onPress={() => router.push('/auth/login/LoginForm')}
        />
      </View>
    </View>
  );
}
