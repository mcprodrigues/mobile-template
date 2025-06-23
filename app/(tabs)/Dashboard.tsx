import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import CaptureCountPieChart from '@/components/CaptureCountPieChart';
import { MedalItem } from '@/components/MedalItem';
import ProgressChart from '@/components/ProgressChart';
import { initialPokemons } from '@/constants/initialPokemons';
import { getMedalsDisplayData } from '@/utils/getMedalDisplayData';

const STORAGE_KEY = 'capturedPokemons';
const CAPTURES_HISTORY_KEY = 'captureHistory';

type CaptureItem = {
  animal: { name: string };
  date: string;
};

type BadgeDisplay = {
  species: string;
  title: string;
  description: string;
  level: number;
  captured: number;
  unlocked: boolean;
};

export default function Dashboard() {
  const isFocused = useIsFocused();
  const [pokemons, setPokemons] = useState(initialPokemons);
  const [captureHistory, setCaptureHistory] = useState<CaptureItem[]>([]);
  const [recentMedals, setRecentMedals] = useState<BadgeDisplay[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        const history = await AsyncStorage.getItem(CAPTURES_HISTORY_KEY);

        if (stored) setPokemons(JSON.parse(stored));
        if (history) setCaptureHistory(JSON.parse(history));

        const medals = await getMedalsDisplayData();
        const unlockedMedals = medals.filter((m) => m.unlocked);
        const sorted = unlockedMedals.sort((a, b) => b.level - a.level);
        setRecentMedals(sorted.slice(0, 3));
      } catch (err) {
        console.error('Erro ao carregar dados do Dashboard:', err);
      }
    };

    if (isFocused) loadData();
  }, [isFocused]);

  const collected = pokemons.filter((p) => p.isFound).length;
  const total = pokemons.length;

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 60 }}
    >
      <Text className="text-2xl font-poppinssb text-slate-900 mb-4">Visão Geral</Text>

      <View className="mb-6">
        <ProgressChart collected={collected} total={total} />
      </View>

      <CaptureCountPieChart captureHistory={captureHistory} />

      <View className="mt-4 bg-white p-4 rounded-xl shadow-md">
        <Text className="text-xl font-poppinssb text-black mb-8">Conquistas Recentes</Text>

        {recentMedals.length === 0 ? (
          <Text className="text-slate-500 font-poppins">Você ainda não desbloqueou conquistas.</Text>
        ) : (
          recentMedals.map((medal, idx) => (
            <MedalItem
              key={idx}
              title={medal.title}
              description={medal.description}
              captured={medal.captured}
              required={medal.level}
              unlocked={medal.unlocked}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}
