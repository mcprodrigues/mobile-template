import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { pokemons } from '@/constants/pokemons';
import { getDisplayName } from '@/utils/getDisplayName';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

interface PokemonDetailsProps {
  name: keyof typeof pokemons;
  description: string;
  curiosities: string;
  image: any;
  bgColor: string;
  bgCard: string;
}

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

export default function PokemonDetails({
  bgColor,
  bgCard,
  name,
  description,
  curiosities,
  image,
}: PokemonDetailsProps) {

  const insets = useSafeAreaInsets();
  const ElementImage = pokemons[name]?.element;

  const renderElementImage = () => {
    if (!ElementImage) return null;

    const Svg = ElementImage as React.FC<SvgProps>;
    return (
      <Svg
        width={180}
        height={180}
        style={{
          position: 'absolute',
          zIndex: 0,
        }}
      />
    );

  };

  return (
    <View style={{ flex: 1, backgroundColor: bgCard }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: 'absolute',
            top: insets.top + 12,
            left: 16,
            zIndex: 10,
          }}
        >
          <ArrowLeft size={28} color="white" />
        </TouchableOpacity>
        <View
          className="w-[480px] h-72 rounded-b-[300px] px-4 pb-6 items-center justify-center relative self-center"
          style={{ backgroundColor: bgColor }}
        >
          {renderElementImage()}
        </View>

        {/* Imagem do Pokémon */}
        <View className="items-center" style={{ marginTop: -110, zIndex: 10 }}>
          <Image source={image} style={{ width: 160, height: 160 }} resizeMode="contain" />
        </View>

        <View className="px-8 mt-4">
          <Text className="font-poppinssb text-black text-3xl mt-4">
            {getDisplayName(name)}
          </Text>
          <Text className="font-poppins text-black/70 text-sm mt-2">{description}</Text>

          <View className="mt-12">
            <View className="flex-col gap-1">
              <View className="flex-row items-start gap-2 mb-1">
                <View className="w-2 h-2 rounded-full bg-red-500" />
                <View className="w-2 h-2 rounded-full bg-yellow-400" />
                <View className="w-2 h-2 rounded-full bg-green-500" />
              </View>
              <Text className="font-poppinsm text-black text-2xl">Curiosidades</Text>
            </View>

            <Text className="font-poppins text-black/70 text-sm mt-2">{curiosities}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}