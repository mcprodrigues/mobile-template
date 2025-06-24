import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { pokemons } from '@/constants/pokemons';
import { apiToInternalNameMap, getDisplayName } from '@/utils/getDisplayName';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { ArrowLeft, Trophy } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';


import rawMedalsJson from '@/constants/medals.json';

type Medal = {
  level: number;
  title: string;
  description: string;
};

const medalsJson = rawMedalsJson as Record<string, Medal[]>;

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

  const [medals, setMedals] = useState<Medal[]>([]);
  const [captured, setCaptured] = useState(0);

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

  useEffect(() => {
    const loadData = async () => {
      const historyJson = await AsyncStorage.getItem('captureHistory');
      const history = JSON.parse(historyJson || '[]');

      const internalToBadgeNameMap: Record<string, string> = {
        pavao: 'Pavão',
        gato: 'Gato',
        vaca: 'Vaca',
        gamba: 'Gamba',
        iguana: 'Iguana',
        lagarto: 'Lagarto',
        bode: 'Bode',
        cavalo: 'Cavalo',
        ema: 'Ema',
        pombo: 'Pombo',
      };

      const internalName = name; 
      const badgeKey = internalToBadgeNameMap[internalName];

      if (!badgeKey) {
        console.warn('⚠️ Espécie não mapeada para medalhas:', internalName);
        return;
      }

      const count = history.filter((h: any) => {
        const internal = apiToInternalNameMap[h.animal.name];
        return internal === internalName;
      }).length;

      const allMedals = medalsJson[badgeKey] || [];

      setCaptured(count);
      setMedals(allMedals);
    };

    loadData();
  }, []);


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

        <View className="items-center" style={{ marginTop: -110, zIndex: 10 }}>
          <Image source={image} style={{ width: 160, height: 160 }} resizeMode="contain" />
        </View>

        <View className="px-8 mt-4">
          <Text className="font-poppinssb text-black text-3xl mt-4">{getDisplayName(name)}</Text>
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

          <View className="mt-12">
            <Text className="font-poppinssb text-black text-2xl mb-4">Conquistas</Text>

            {medals.map((medal, index) => {
              const progress = Math.min(captured / medal.level, 1);
              const unlocked = captured >= medal.level;

              return (
                <View key={index} className="mb-4 p-1 rounded-lg items-start">
                  <Text className="text-base font-poppinssb text-black">{medal.title}</Text>
                  <Text className="text-sm font-poppins text-zinc-600 mb-2">{medal.description}</Text>

                  <View className="flex-row items-center justify-between">
                    <View className="flex-1 h-2 bg-zinc-300 rounded-full overflow-hidden">
                      <View
                        style={{ width: `${progress * 100}%` }}
                        className={`h-2 ${unlocked ? 'bg-yellow-400' : 'bg-zinc-400'}`}
                      />
                    </View>

                    <View className="ml-3 items-center">
                      <Trophy size={20} color={unlocked ? '#facc15' : '#a1a1aa'} />
                      <Text className="text-xs text-black">
                        {Math.min(captured, medal.level)}/{medal.level}
                      </Text>

                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
