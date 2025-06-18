import { images } from '@/constants/images';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { pokemons } from '@/constants/pokemons';
import { getDisplayName } from '@/utils/getDisplayName';
import { SvgProps } from 'react-native-svg';

interface PokemonDetailsProps {
  name: string;
  description: string;
  curiosities: string;
  image: any;
  bgColor: string;
  bgCard: string;
}

const nameMap: Record<string, string> = {
  gamba: 'Gambá',
  camaleao: 'Camaleão',
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

  const ElementImage = pokemons[name]?.element;

  const renderElementImage = () => {
    if (!ElementImage) return null;

    const Svg = ElementImage as React.FC<SvgProps>;
    return (
      <Svg
        width={204}
        height={204}
        style={{
          position: 'absolute',
          zIndex: 0,
        }}
      />
    );

  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgCard }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <View
          className="rounded-b-[900px] px-4 pt-24 pb-6 items-center justify-center relative"
          style={{ backgroundColor: bgColor }}
        >
          {renderElementImage()}

          <Image
            source={image}
            style={{ width: 160, height: 160, zIndex: 1}}
            resizeMode="contain"
          />
        </View>

        <View className="px-8 mt-4">
          <Text className="font-poppinssb text-black text-3xl mt-4">
            {getDisplayName(name)}
          </Text>
          <Text className="font-poppins text-black/70 text-sm mt-2">{description}</Text>

          <View className="mt-12">
            <View className="flex-row items-center gap-1">
              <images.Pokebola width={18} height={18} />
              <Text className="font-poppinsm text-black text-2xl">Curiosidades</Text>
            </View>

            <Text className="font-poppins text-black/70 text-sm mt-2">{curiosities}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
