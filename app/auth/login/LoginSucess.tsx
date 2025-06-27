import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

import { initialPokemons } from '@/constants/initialPokemons';
import medalsJson from '@/constants/medals.json';
import { useAuth } from '@/contexts/AuthContext';
import { apiToInternalNameMap } from '@/utils/getDisplayName';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'capturedPokemons';
const CAPTURES_HISTORY_KEY = 'captureHistory';
const BADGES_KEY = 'userBadges';

const internalToBadgeNameMap: Record<string, string> = {
  gamba: 'Gamba',
  lagarto: 'Lagarto',
  pavao: 'Pavão',
  ema: 'Ema',
  pombo: 'Pombo',
  bode: 'Bode',
  cavalo: 'Cavalo',
  gato: 'Gato',
  iguana: 'Iguana',
  vaca: 'Vaca',
};

type Badge = {
  level: number;
  title: string;
  description: string;
};

const badgesData = medalsJson as Record<string, Badge[]>;

async function updateCapturedPokemons(captures: any[]) {
  try {
    console.log('📌 Dados brutos das capturas recebidas:', captures);

    const internalNames = [
      ...new Set(
        captures.map((c) => apiToInternalNameMap[c.animal.name]).filter(Boolean)
      ),
    ];

    const pokemons = initialPokemons.map((p) => ({
      ...p,
      isFound: internalNames.includes(p.name),
    }));

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pokemons));
    console.log('✅ Pokémons atualizados e salvos:', pokemons);

    const formattedHistory = captures.map((c) => ({
      animal: { name: c.animal.name },
      date: c.capturedAt,
    }));

    await AsyncStorage.setItem(CAPTURES_HISTORY_KEY, JSON.stringify(formattedHistory));
    console.log('📘 Histórico de capturas salvo:', formattedHistory);

    const countMap = captures.reduce((acc: Record<string, number>, curr: any) => {
      const name = curr.animal.name;
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});

    console.log('📊 Contagem de capturas por animal:', countMap);

    const userBadges: Record<string, Badge[]> = {};

    for (const [apiName, count] of Object.entries(countMap)) {
      const internal = apiToInternalNameMap[apiName];
      const badgeKey = internalToBadgeNameMap[internal];

      if (!badgeKey) continue;

      const availableBadges = badgesData[badgeKey];
      if (!availableBadges) continue;

      const unlocked = availableBadges.filter((badge) => count >= badge.level);
      if (unlocked.length > 0) {
        userBadges[internal] = unlocked;
      }
    }

    await AsyncStorage.setItem(BADGES_KEY, JSON.stringify(userBadges));
    console.log('🎯 Medalhas salvas no AsyncStorage:', userBadges);

  } catch (err) {
    console.error('❌ Erro geral ao processar capturas:', err);
  }
}

export default function LoginSuccess() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user, refreshUser  } = useAuth();

  useEffect(() => {
    const fetchUserInfoAndCaptured = async () => {
      if (!user?.id || !user?.accessToken) {
        console.warn('⚠️ Usuário não definido ou sem token. Abortando...');
        setIsLoading(false);
        return;
      }

      try {
        console.log('📥 Buscando dados atualizados do usuário...');
        const userResponse = await fetch(
          `https://pokedex-back-end-production-9709.up.railway.app/users/${user.id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const userData = await userResponse.json();
        console.log('🎯 Dados do usuário atualizados:', userData);

const updatedUser = {
  id: userData._id,
  name: userData.name,
  email: userData.email,
  password: user?.password || '',
  accessToken: user?.accessToken || '',
  title: userData.title,
  totalPoints: userData.totalPoints,
  level: Math.floor(userData.totalPoints / 300) + 1, 
};


await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
await refreshUser(); // atualiza o contexto com os novos dados
console.log('✅ Dados do usuário atualizados no AsyncStorage:', updatedUser);
console.log('📦 Dados montados para salvar:', updatedUser);


      } catch (err) {
        console.error('❌ Erro ao buscar dados atualizados do usuário:', err);
      }

      try {
        console.log('🔐 Iniciando requisição de capturas do usuário:', user.id);

        const capturesResponse = await fetch(
          `https://pokedex-back-end-production-9709.up.railway.app/captures/user/${user.id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        const text = await capturesResponse.text();
        const data = JSON.parse(text);
        console.log('📡 Resposta da API:', data);

        if (!Array.isArray(data)) {
          console.warn('⚠️ Resposta inesperada da API de capturas:', data);
          return;
        }

        await updateCapturedPokemons(data);

      } catch (err) {
        console.error('❌ Erro ao buscar capturas do usuário:', err);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchUserInfoAndCaptured();
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
        source={require('@/assets/images/moema.gif')}
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
        onPress={() => router.push('/(tabs)/page')}
      />
    </View>
  );
}
