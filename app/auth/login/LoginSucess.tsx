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
        captures
          .map((c) => apiToInternalNameMap[c.animal.name])
          .filter(Boolean)
      ),
    ];

    const pokemons = initialPokemons.map((p) => ({
      ...p,
      isFound: internalNames.includes(p.name),
    }));

    try {
      const pokemonsStr = JSON.stringify(pokemons);
      await AsyncStorage.setItem(STORAGE_KEY, pokemonsStr);
      console.log('✅ Pokémons atualizados e salvos:', pokemons);
    } catch (e) {
      console.error('❌ Erro ao salvar pokémons:', e);
    }

    const formattedHistory = captures.map((c) => ({
      animal: { name: c.animal.name },
      date: c.capturedAt,
    }));

    try {
      await AsyncStorage.setItem(CAPTURES_HISTORY_KEY, JSON.stringify(formattedHistory));
      console.log('📘 Histórico de capturas salvo:', formattedHistory);
    } catch (e) {
      console.error('❌ Erro ao salvar histórico de capturas:', e);
    }

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

      if (!badgeKey) {
        console.log(`⚠️ Animal não mapeado para medalha: ${internal}`);
        continue;
      }

      const availableBadges = badgesData[badgeKey];
      if (!availableBadges) {
        console.log(`⚠️ Sem medalhas definidas para: ${badgeKey}`);
        continue;
      }

      const unlocked = availableBadges.filter((badge) => count >= badge.level);

      if (unlocked.length > 0) {
        userBadges[internal] = unlocked;
        console.log(`🏅 Medalhas desbloqueadas para ${badgeKey} (${count} capturas):`);
        unlocked.forEach((b) =>
          console.log(`   - ${b.title} (nível ${b.level}): ${b.description}`)
        );
      } else {
        console.log(`📭 Nenhuma medalha desbloqueada ainda para ${badgeKey} (${count} capturas).`);
      }
    }

    try {
      await AsyncStorage.setItem(BADGES_KEY, JSON.stringify(userBadges));
      console.log('🎯 Medalhas salvas no AsyncStorage:', userBadges);
    } catch (e) {
      console.error('❌ Erro ao salvar medalhas:', e);
    }

    console.log('🏆 Medalhas totais do usuário:');
    Object.entries(userBadges).forEach(([internalName, medals]) => {
      const label = internalToBadgeNameMap[internalName] ?? internalName;
      console.log(`- ${label}:`);
      medals.forEach((badge) =>
        console.log(`   • ${badge.title} (nível ${badge.level}) — ${badge.description}`)
      );
    });

  } catch (err) {
    console.error('❌ Erro geral ao processar capturas:', err);
  }
}

export default function LoginSuccess() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  return () => clearTimeout(timer);
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
