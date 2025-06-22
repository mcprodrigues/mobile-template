import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';


import { initialPokemons } from '@/constants/initialPokemons';
import { useAuth } from '@/contexts/AuthContext';
import { apiToInternalNameMap } from '@/utils/getDisplayName';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'capturedPokemons';

async function updateCapturedPokemons(capturedApiNames: string[]) {
  try {
    // converte nomes da API para os nomes internos usados no initialPokemons
    const internalNames = [
      ...new Set(
        capturedApiNames
          .map((apiName) => apiToInternalNameMap[apiName])
          .filter(Boolean)
      ),
    ];

    const pokemons = initialPokemons.map((p) => ({
      ...p,
      isFound: internalNames.includes(p.name),
    }));

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pokemons));
    console.log('✅ Pokémons atualizados após login:', internalNames);
  } catch (err) {
    console.error('❌ Erro ao atualizar pokémons após login:', err);
  }
}






export default function LoginSuccess() {

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

const { user } = useAuth();

useEffect(() => {
const fetchCaptured = async () => {
  try {
    const response = await fetch(`http://192.168.1.200:3000/captures/user/${user?.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const text = await response.text();
    console.log('📦 Resposta da API:', text);

    const data = JSON.parse(text);

    if (!Array.isArray(data)) {
      console.warn('⚠️ Resposta inesperada da API de capturas:', data);
      return;
    }

const capturedNames = data.map((capture: any) => capture.animal.name);
await updateCapturedPokemons(capturedNames);
const stored = await AsyncStorage.getItem('capturedPokemons');
console.log('🎯 Conteúdo salvo:', stored);

  } catch (err) {
    console.error('❌ Erro ao buscar capturas do usuário:', err);
  } finally {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }
};

  fetchCaptured();
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