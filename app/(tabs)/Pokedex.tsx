import PokemonCard from '@/components/PokemonCard';
import { images } from '@/constants/images';
import { initialPokemons } from '@/constants/initialPokemons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

const nameMap: Record<string, string> = {
  gamba: 'Gambá',
  camaleao: 'Lagarto',
  pavao: 'Pavão',
  ema: 'Ema',
  pombo: 'Pombo',
  bode: 'Bode',
  cavalo: 'Cavalo',
  gato: 'Gato',
  iguana: 'Iguana',
  vaca: 'Vaca',
};

const STORAGE_KEY = 'capturedPokemons';

function formatPokemonName(name: string) {
  return nameMap[name] ?? name.charAt(0).toUpperCase() + name.slice(1);
}

export default function Pokedex() {
  const [pokemons, setPokemons] = useState(initialPokemons);
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name?: string }>();

  useFocusEffect(
    useCallback(() => {
      const loadPokemons = async () => {
        try {
          const stored = await AsyncStorage.getItem(STORAGE_KEY);
          if (stored) {
            const parsed = JSON.parse(stored);
            console.log('📦 Pokémons carregados ao focar:', parsed);
            setPokemons(parsed);
          } else {
            setPokemons(initialPokemons);
          }
        } catch (err) {
          console.error('❌ Erro ao carregar pokémons:', err);
          setPokemons(initialPokemons);
        }
      };

      loadPokemons();
    }, [])
  );

  useEffect(() => {
    if (name) {
      setPokemons((prev) =>
        prev.map((p) =>
          p.name === name ? { ...p, isFound: true } : p
        )
      );
    }
  }, [name]);

  function handleCapture(name: string, isFound: boolean) {
    if (isFound) {
      router.push({
        pathname: '/(details)/[name]',
        params: { name },
      });
    }
  }

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 20, alignItems: 'center' }}>
      <images.Logo width={120} height={120} />
      {pokemons.map(({ name, isFound, bgCard, bgRight }) => (
        <TouchableOpacity
          key={name}
          onPress={() => handleCapture(name, isFound)}
          activeOpacity={0.7}
          className="mb-4"
        >
          <PokemonCard
            name={name}
            isFound={isFound}
            bgColorCard={bgCard}
            bgColorRight={bgRight}
            displayName={formatPokemonName(name)}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
