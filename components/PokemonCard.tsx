import { pokemons } from '@/constants/pokemons';
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
      {/* Lado direito do card */}
<View
  style={{ backgroundColor: bgColorRight }}
  className="w-[126px] h-[102px] absolute left-[202px] top-0 rounded-2xl"
/>

      {/* Container das imagens alinhado à direita */}
      <View className="absolute right-2 top-0 w-[100px] h-[100px]">
        <View className="absolute top-2 right-0 z-0">{renderElementImage()}</View>
        <View className="absolute top-4 right-4 z-10">{renderPokemonImage()}</View>
      </View>

      {/* Nome do Pokémon */}
      <View className="absolute left-5 top-8 justify-center items-center gap-1">
        <Text className="text-black text-2xl font-poppinssb">
          {isFound ? displayName ?? name.charAt(0).toUpperCase() + name.slice(1) : '???'}
        </Text>
      </View>
    </View>
  );
}
