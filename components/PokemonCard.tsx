import { pokemons } from '@/constants/pokemons';
import { getDisplayName } from '@/utils/getDisplayName';
import { Image, Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

interface PokemonCardProps {
  name: string;
  isFound: boolean;
  bgColorCard: string;
  bgColorRight: string;
  displayName?: string;
}

export default function PokemonCard({
  name,
  isFound,
  bgColorCard,
  bgColorRight,
  displayName,
}: PokemonCardProps) {
  const key = name as keyof typeof pokemons;
  const PokemonImage = isFound ? pokemons[key].normal : pokemons[key].hidden;
  const ElementImage = pokemons[key].element;

  const renderPokemonImage = () => {
    if (typeof PokemonImage === 'number') {
      return (
        <Image
          source={PokemonImage}
          style={{
            width: 70,
            height: 70,
            resizeMode: name === 'iguana' ? 'contain' : 'cover',
          }}
        />
      );
    }

    const Svg = PokemonImage as React.FC<SvgProps>;
    return <Svg width={70} height={70} />;
  };

  const renderElementImage = () => {
    if (typeof ElementImage === 'number') return null;

    const Svg = ElementImage as React.FC<SvgProps>;
    return <Svg width={94} height={94} />;
  };

  return (
    <View
      style={{ backgroundColor: bgColorCard }}
      className="w-[328px] h-[102px] relative rounded-2xl overflow-hidden"
    >

      <View
        style={{ backgroundColor: bgColorRight }}
        className="w-[126px] h-[102px] absolute right-[202px] top-0 rounded-2xl"
      />
      {/* Container das imagens alinhado à esquerda */}
      <View className="absolute left-2 top-0 w-[100px] h-[100px]">
        <View className="absolute top-2 right-0 z-0">{renderElementImage()}</View>
        <View className="absolute top-4 right-4 z-10">{renderPokemonImage()}</View>
      </View>


      <View className="absolute left-40 top-8 justify-center items-center gap-1">
        <Text className="text-black text-2xl font-poppinssb">
            {getDisplayName(name)}
        </Text>
      </View>
    </View>
  );
}
