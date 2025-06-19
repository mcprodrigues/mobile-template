import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import PokemonDetails from '@/components/PokemonDetails';
import { pokemons } from '@/constants/pokemons';
import { getPokemonBasicDetails } from '@/utils/getPokemonBasicDetails';

export const screenOptions = {
  headerShown: false,
  tabBarStyle: { display: 'none' },
};

export default function PokemonScreen() {
  const params = useLocalSearchParams<{ name?: string }>();
  const name = params.name;

  if (typeof name !== 'string' || !Object.keys(pokemons).includes(name)) {
    return <Text>Animal inválido</Text>;
  }

  const typedName = name as keyof typeof pokemons;
  const data = getPokemonBasicDetails(typedName);

  if (!data) return <Text>Animal não encontrado</Text>;

  return <PokemonDetails {...data} />;
}