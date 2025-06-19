import PokemonCard from '@/components/PokemonCard';
import { images } from '@/constants/images';
import { initialPokemons } from '@/constants/initialPokemons';
import { useRouter } from 'expo-router'; // ✅ Importar o router
import React, { useState } from 'react';
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

function formatPokemonName(name: string) {
  return nameMap[name] ?? name.charAt(0).toUpperCase() + name.slice(1);
}

export default function Pokedex() {
  const [pokemons, setPokemons] = useState(initialPokemons);
  const router = useRouter(); 

  function handleCapture(name: string, isFound: boolean) {
    if (isFound) {
      router.push({
        pathname: '/(details)/[name]',
        params: { name },
      });
    } else {
      setPokemons((oldPokemons) =>
        oldPokemons.map((p) =>
          p.name === name ? { ...p, isFound: true } : p
        )
      );
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
