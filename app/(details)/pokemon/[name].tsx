import PokemonDetails from '@/components/PokemonDetails';
import { getPokemonBasicDetails } from '@/utils/getPokemonBasicDetails';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

export default function PokemonScreen() {
  const params = useLocalSearchParams<{ name?: string }>();
  const name = params.name;

  if (typeof name !== 'string') {
    return <Text>Animal inválido</Text>;
  }

  const data = getPokemonBasicDetails(name);

  if (!data) return <Text>Animal não encontrado</Text>;

  return <PokemonDetails {...data} />;
}
