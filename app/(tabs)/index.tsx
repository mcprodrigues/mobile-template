import Camera from '@/components/Camera';
import { Image, SwitchCamera } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Dimensions, TouchableOpacity, View } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';


const { width } = Dimensions.get('window');

export default function Index() {

  const [facing, setFacing] = useState<'front' | 'back'>('back');

  const handleToggleFacing = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  return (
    <View className="flex-1 bg-rose-700 items-center justify-start pt-12 space-y-6">

      {/* Topo com luzes indicadores */}
      <View className="flex-row w-full px-3">

        {/* Círculo azul grande (principal) */}
        <View className="w-24 h-24 rounded-full bg-blue-600 border-[4px] border-white items-start justify-start">
          <View className="w-6 h-6 bg-white/60 rounded-full ml-2 mt-2" />
        </View>

        {/* Três luzes indicadoras menores (vermelha, amarela, verde) */}
        <View className="flex-row items-start gap-2 ml-4 mt-2">
          <View className="w-6 h-6 rounded-full bg-red-500 border border-black items-start justify-start">
            <View className="w-2 h-2 bg-white/60 rounded-full ml-1 mt-1" />
          </View>
          <View className="w-6 h-6 rounded-full bg-yellow-400 border border-black items-start justify-start">
            <View className="w-2 h-2 bg-white/60 rounded-full ml-1 mt-1" />
          </View>
          <View className="w-6 h-6 rounded-full bg-green-500 border border-black items-start justify-start">
            <View className="w-2 h-2 bg-white/60 rounded-full ml-1 mt-1" />
          </View>
        </View>
      </View>

      {/* Linha decorativa em SVG */}
      <View className="w-full">
        <Svg height="40" width={width}>
          <Polyline
            points="0,30 75,30 100,10 410,10"
            fill="none"
            stroke="black"
            strokeWidth="3"
          />
        </Svg>
      </View>

      {/* Área da tela da pokédex */}
      <View className="w-[320px] rounded-2xl border-[2px] border-black items-center pt-3 px-3 space-y-3 overflow-hidden bg-white">
        {/* Luzes vermelhas pequenas */}
        <View className="flex-row gap-3 mb-2">
          <View className="w-3 h-3 rounded-full bg-red-500 items-start justify-start">
            <View className="w-1 h-1 bg-white/60 rounded-full ml-0.5 mt-0.5" />
          </View>
          <View className="w-3 h-3 rounded-full bg-red-500 items-start justify-start">
            <View className="w-1 h-1 bg-white/60 rounded-full ml-0.5 mt-0.5" />
          </View>
        </View>

        {/* Área da câmera com aspecto 3:4 e borda */}
        <View className="aspect-[3/4] w-full border border-black rounded-2xl overflow-hidden"
        style={{ borderRadius: 16 }}>
          <Camera facing={facing} />

        </View>
<View className="flex-row justify-between items-center w-full px-6 m-2">
          {/* Botão galeria (esquerda) */}
          <TouchableOpacity onPress={() => Alert.alert('Abrir galeria')}>
            <Image color="black" size={28} />
          </TouchableOpacity>

          {/* Botão de tirar foto (centro) */}
          <TouchableOpacity className="w-16 h-16 rounded-full bg-blue-700 border-[4px] border-blue-800 items-center justify-center">
          <View className="w-4 h-4 bg-white/60 rounded-full mr-4 mb-8" />
          </TouchableOpacity>

          {/* Botão de trocar câmera (direita) */}
          <TouchableOpacity onPress={handleToggleFacing}>
            <SwitchCamera color="black" size={28} />
          </TouchableOpacity>
        </View>

      </View>

      <View className="flex-row items-center justify-between w-full px-8">

        {/* Círculo cinza esquerdo */}
        <View className="w-8 h-8 bg-gray-700 rounded-full items-start justify-start">
          <View className="w-2 h-2 bg-white/60 rounded-full ml-1 mt-1" />
        </View>

        {/* Barras coloridas  */}
        <View className="flex-row pl-6 gap-4">
          <View className="w-20 h-2 bg-red-500 rounded-full border border-black" />

          <View className="w-20 h-2 bg-blue-600 rounded-full border border-black" />
        </View>

        {/* D-pad (controle direcional)*/}
        <View className="w-20 h-20 justify-center items-center">
          <View className="absolute w-14 h-4 bg-gray-800 rounded" />
          <View className="absolute h-14 w-4 bg-gray-800 rounded" />
          <View className="w-4 h-4 bg-black rounded-full z-10" />
        </View>
      </View>

    </View>
  );
}