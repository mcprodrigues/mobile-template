import RevealAnimation from '@/components/RevealAnimation';
import { pokemons } from '@/constants/pokemons';
import { apiToInternalNameMap, getDisplayName } from '@/utils/getDisplayName';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';


const { width } = Dimensions.get('window');

function normalizeKey(key: string) {
  return key
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export default function Discovery() {
  const { name: animalName } = useLocalSearchParams();

  const rawName = animalName?.toString() || '';
  const mappedName = apiToInternalNameMap[rawName] || rawName;
  const normalizedKey = normalizeKey(mappedName);
  const animal = pokemons[normalizedKey as keyof typeof pokemons];


  return (
    <View className="flex-1 bg-rose-700 p-4 items-center gap-10 justify-center">
      <View className="w-full" style={{ transform: [{ scaleX: -1 }] }}>
        <Svg height="40" width={width}>
          <Polyline points="0,30 75,30 100,10 420,10" fill="none" stroke="black" strokeWidth="3" />
        </Svg>
      </View>

      {/* Cartão com imagem */}
      <View className="items-center">
        <View className="w-44 aspect-[3/4] border border-black rounded-bl-[30px] bg-white justify-between p-2">
          {/* Luzes superiores */}
          <View className="flex-row items-center justify-center gap-2">
            <View className="w-2 h-2 rounded-full bg-red-600 border border-black" />
            <View className="w-2 h-2 rounded-full bg-red-600 border border-black" />
          </View>

          {/* Imagem com animação */}
          <View className="w-full items-center rounded-lg bg-green-600 justify-center">
            <RevealAnimation image={animal.normal} />
          </View>

          {/* Luzes inferiores */}
          <View className="flex-row justify-between px-2">
            <View className="w-3 h-3 bg-red-500 border-2 border-black rounded-full" />
            <View>
              <View className="w-5 h-0.5 bg-black mb-1" />
              <View className="w-5 h-0.5 bg-black mb-1" />
              <View className="w-5 h-0.5 bg-black" />
            </View>
          </View>
        </View>
      </View>

      {/* Nome formatado */}
      <View className="mt-4 px-4 py-3 bg-green-600 rounded-md w-72">
        <Text className="text-zinc-800 text-base text-center font-poppinssb">
          Animal identificado: {getDisplayName(rawName)}
        </Text>
      </View>


      <View className="flex-row flex-wrap w-80 justify-center gap-1 mb-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <View key={i} className="w-14 h-14 bg-blue-400 border border-black rounded-sm" />
        ))}
      </View>
      {/* Center buttons */}
      <View className="flex-row justify-between w-full max-w-xs mb-4">
        <View>
          <View className="flex-row gap-3 mb-2">
            <View className="w-3 h-3 bg-red-600 border-2 border-black rounded-full" />
            <View className="w-3 h-3 bg-red-600 border-2 border-black rounded-full" />
          </View>
          <View className="flex-row ">
            <View className="w-8 h-8 bg-white border-2 border-black rounded-md" />
            <View className="w-8 h-8 bg-white border-2 border-black rounded-md" />
          </View>
        </View>
        <View>
          <View className="flex-row justify-end gap-3 mb-2">
            <View className="w-10 h-1 bg-gray-700 border-2 border-black" />
            <View className="w-10 h-1 bg-gray-700 border-2 border-black" />
          </View>

          <TouchableOpacity
          
            onPress={() => router.push('/Pokedex')}
            className="mt-6 flex-row"
          >
            <Text className="text-center text-white font-poppins">
              Prosseguir
            </Text>
            <ArrowRight color='white'/>
          </TouchableOpacity>

        </View>
      </View>



    </View>
  );
}