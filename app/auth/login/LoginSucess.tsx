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
const CAPTURES_HISTORY_KEY = 'captureHistory';

async function updateCapturedPokemons(captures: any[]) {
  try {
    console.log('📌 Dados brutos das capturas recebidas:', captures);

    const internalNames = [
      ...new Set(
        captures
          .map((c) => apiToInternalNameMap[c.animal.name])
          .filter(Boolean)
      ),
    ];

    const pokemons = initialPokemons.map((p) => ({
      ...p,
      isFound: internalNames.includes(p.name),
    }));

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pokemons));
    console.log('✅ Pokémons atualizados e salvos.');

    const formattedHistory = captures.map((c) => ({
      animal: { name: c.animal.name },
      date: c.capturedAt,
    }));

    await AsyncStorage.setItem(CAPTURES_HISTORY_KEY, JSON.stringify(formattedHistory));
    console.log('📘 Histórico de capturas salvo.');

    // 📊 Contagem por espécie
    const countMap = captures.reduce((acc: Record<string, number>, curr: any) => {
      const name = curr.animal.name;
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});

    console.log('📊 Capturas por espécie:');
    Object.entries(countMap).forEach(([name, count]) => {
      console.log(`- ${name}: ${count}x`);
    });

  } catch (err) {
    console.error('❌ Erro ao atualizar pokémons ou histórico:', err);
  }
}


export default function LoginSuccess() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchCaptured = async () => {
      try {
        console.log('🔐 Iniciando requisição de capturas do usuário:', user?.id);

        const response = await fetch(
          `http://192.168.1.200:3000/captures/user/${user?.id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const text = await response.text();
        console.log('📦 Texto da resposta da API:', text);

        const data = JSON.parse(text);

        if (!Array.isArray(data)) {
          console.warn('⚠️ Resposta inesperada da API de capturas:', data);
          return;
        }

        await updateCapturedPokemons(data);

        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        console.log('💾 Pokémons no AsyncStorage:', stored);
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
        Esperamos que tenha tido uma longa jornada desde a última vez em que nos visitou.
      </Text>

      <Button
        title="Acessar Pokédex"
        variant="primary"
        onPress={() => router.push('/(tabs)')}
      />
    </View>
  );
}
