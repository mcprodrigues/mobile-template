import Camera, { CameraHandler } from '@/components/Camera';
import * as ImagePicker from 'expo-image-picker';
import { Image as LucideImage, RotateCw, SwitchCamera } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

import { initialPokemons } from '@/constants/initialPokemons';
import { useAuth } from '@/contexts/AuthContext';
import {
  apiToInternalNameMap,
  getDisplayName,
} from '@/utils/getDisplayName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const STORAGE_KEY = 'capturedPokemons';

async function markPokemonAsFound(apiName: string) {
  try {
    const internalName = apiToInternalNameMap[apiName];
    if (!internalName) {
      console.warn('⚠️ Nome não mapeado:', apiName);
      return;
    }

    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const pokemons = stored ? JSON.parse(stored) : initialPokemons;

    const alreadyCaptured = pokemons.find(
      (p: any) => p.name === internalName && p.isFound
    );
    if (alreadyCaptured) {
      console.log('🔁 Pokémon já capturado:', internalName);
      return;
    }

    const updated = pokemons.map((p: any) =>
      p.name === internalName ? { ...p, isFound: true } : p
    );

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    console.log('✅ Pokémon marcado como encontrado:', internalName);
  } catch (err) {
    console.error('❌ Erro ao marcar Pokémon como encontrado:', err);
  }
}

export default function Index() {
  const { user } = useAuth();
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const cameraRef = useRef<CameraHandler>(null);

  const [showUncertainModal, setShowUncertainModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [identifiedAnimal, setIdentifiedAnimal] = useState('');
  const [confidence, setConfidence] = useState<number | null>(null);

  const handleToggleFacing = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  const handleTakePicture = async () => {
    try {
      const photo = await cameraRef.current?.takePicture();
      if (!photo?.uri) {
        Alert.alert('Erro', 'Não foi possível tirar a foto.');
        return;
      }

      const formData = new FormData();
      formData.append('file', {
        uri: photo.uri,
        name: 'captura.jpg',
        type: 'image/jpeg',
      } as any);

      const response = await fetch('http://192.168.1.200:5000/prediction', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData,
      });

      const result = await response.json();
      console.log('🐾 Animal detectado:', result);

      if (result.prediction === 'uncertain') {
        setShowUncertainModal(true);
      } else {
        setIdentifiedAnimal(result.prediction);
        setConfidence(result.confidence);
        setShowConfirmModal(true);
      }
    } catch (err) {
      console.error('Erro ao capturar/enviar imagem:', err);
      Alert.alert('Erro', 'Falha ao processar a imagem.');
    }
  };

  const handlePickFromGallery = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permissão negada', 'Você precisa permitir o acesso à galeria.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (result.canceled) return;

      const asset = result.assets[0];
      const formData = new FormData();
      formData.append('file', {
        uri: asset.uri,
        name: 'galeria.jpg',
        type: 'image/jpeg',
      } as any);

      const response = await fetch('http://192.168.1.200:5000/prediction', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData,
      });

      const data = await response.json();
      console.log('🐾 Animal da galeria:', data);

      if (data.prediction === 'uncertain') {
        setShowUncertainModal(true);
      } else {
        setIdentifiedAnimal(data.prediction);
        setConfidence(data.confidence);
        setShowConfirmModal(true);
      }
    } catch (error) {
      console.error('Erro ao importar imagem da galeria:', error);
      Alert.alert('Erro', 'Não foi possível processar a imagem da galeria.');
    }
  };

  return (
    <View className="flex-1 bg-rose-700 items-center justify-start pt-12 space-y-6">
      {/* Parte superior com luzes */}
      <View className="flex-row w-full px-3">
        <View className="w-24 h-24 rounded-full bg-blue-600 border-[4px] border-white items-start justify-start">
          <View className="w-6 h-6 bg-white/60 rounded-full ml-2 mt-2" />
        </View>
        <View className="flex-row items-start gap-2 ml-4 mt-2">
          <View className="w-6 h-6 rounded-full bg-red-500 border border-black">
            <View className="w-2 h-2 bg-white/60 rounded-full ml-1 mt-1" />
          </View>
          <View className="w-6 h-6 rounded-full bg-yellow-400 border border-black">
            <View className="w-2 h-2 bg-white/60 rounded-full ml-1 mt-1" />
          </View>
          <View className="w-6 h-6 rounded-full bg-green-500 border border-black">
            <View className="w-2 h-2 bg-white/60 rounded-full ml-1 mt-1" />
          </View>
        </View>
      </View>

      {/* Linha decorativa */}
      <View className="w-full">
        <Svg height="40" width={width}>
          <Polyline points="0,30 75,30 100,10 410,10" fill="none" stroke="black" strokeWidth="3" />
        </Svg>
      </View>

      {/* Área da câmera */}
      <View className="w-[320px] rounded-bl-[60px] border-[2px] border-black items-center pt-3 px-3 space-y-3 bg-white">
        <View className="flex-row gap-3 mb-2">
          <View className="w-3 h-3 rounded-full bg-red-500">
            <View className="w-1 h-1 bg-white/60 rounded-full ml-0.5 mt-0.5" />
          </View>
          <View className="w-3 h-3 rounded-full bg-red-500">
            <View className="w-1 h-1 bg-white/60 rounded-full ml-0.5 mt-0.5" />
          </View>
        </View>

        <View className="aspect-[3/4] w-full border border-black rounded-2xl overflow-hidden">
          <Camera ref={cameraRef} facing={facing} />
        </View>

        <View className="flex-row justify-between items-center w-full px-6 m-2">
          <TouchableOpacity onPress={handlePickFromGallery}>
            <LucideImage color="black" size={28} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleTakePicture}
            className="w-16 h-16 rounded-full bg-blue-700 border-[4px] border-blue-800 items-center justify-center"
          >
            <View className="w-4 h-4 bg-white/60 rounded-full mr-4 mb-8" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleToggleFacing}>
            <SwitchCamera color="black" size={28} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Rodapé */}
      <View className="flex-row items-center justify-between w-full px-8">
        <View className="w-8 h-8 bg-gray-700 rounded-full">
          <View className="w-2 h-2 bg-white/60 rounded-full ml-1 mt-1" />
        </View>

        <View className="flex-row pl-6 gap-4">
          <View className="w-20 h-2 bg-red-500 rounded-full border border-black" />
          <View className="w-20 h-2 bg-blue-600 rounded-full border border-black" />
        </View>

        <View className="w-20 h-20 justify-center items-center">
          <View className="absolute w-14 h-4 bg-gray-800 rounded" />
          <View className="absolute h-14 w-4 bg-gray-800 rounded" />
          <View className="w-4 h-4 bg-black rounded-full z-10" />
        </View>
      </View>

      {/* Modal: Animal não identificado */}
      <Modal visible={showUncertainModal} transparent animationType="fade" onRequestClose={() => setShowUncertainModal(false)}>
        <Pressable className="flex-1 bg-black/50 justify-end" onPress={() => setShowUncertainModal(false)}>
          <View className="bg-white rounded-t-2xl px-6 pt-4 pb-8">
            <View className="h-1 w-10 bg-zinc-300 self-center rounded-full mb-4" />
            <Text className="text-center text-black font-poppinssb text-base mb-6">
              Não foi possível identificar o animal
            </Text>
            <TouchableOpacity
              className="bg-blue-900 rounded-full py-3 items-center flex-row justify-center gap-2 mb-4"
              onPress={() => setShowUncertainModal(false)}
            >
              <RotateCw size={18} color="white" />
              <Text className="text-white font-poppinssb">Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Modal: Confirmação */}
      <Modal visible={showConfirmModal} transparent animationType="fade" onRequestClose={() => setShowConfirmModal(false)}>
        <Pressable className="flex-1 bg-black/50 justify-end" onPress={() => setShowConfirmModal(false)}>
          <View className="bg-white rounded-t-2xl px-6 pt-4 pb-8">
            <View className="h-1 w-10 bg-zinc-300 self-center rounded-full mb-4" />
            <Text className="text-center text-black font-poppinssb text-base mb-3">
              Animal identificado: {getDisplayName(identifiedAnimal)}
            </Text>
            <Text className="text-center text-black font-poppins text-sm mb-6">
              Essa previsão está correta?
            </Text>

<TouchableOpacity
  className="bg-blue-900 rounded-full py-3 items-center mb-4"
  onPress={async () => {
    setShowConfirmModal(false);

    const payload = {
      prediction: identifiedAnimal,
      confidence: confidence ?? 0,
    };

    const token = user?.accessToken;
    const userId = user?.id;

    try {
      const response = await fetch('http://192.168.1.200:3000/image-processing/capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const resText = await response.text();
      console.log('📥 Resposta da API de captura:', resText);

      await markPokemonAsFound(identifiedAnimal);

      // 🔁 NOVO: Buscar todas as capturas e atualizar localmente
      const capturesResponse = await fetch(`http://192.168.1.200:3000/captures/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allCaptures = await capturesResponse.json();
      console.log('📊 Capturas atualizadas:', allCaptures);

      // 🔄 Atualiza AsyncStorage e dashboards
      const { updateCapturedPokemons } = await import('@/utils/updateCapturedPokemons');
      await updateCapturedPokemons(allCaptures);

    } catch (error) {
      console.error('❌ Erro ao enviar captura:', error);
    }

    router.push({
      pathname: '/discovery',
      params: { name: identifiedAnimal },
    });
  }}
>
  <Text className="text-white font-poppinssb">Sim, prosseguir</Text>
</TouchableOpacity>


            <TouchableOpacity
              className="border border-black rounded-full py-3 items-center"
              onPress={() => setShowConfirmModal(false)}
            >
              <Text className="text-black font-poppinssb">Não, tentar novamente</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
