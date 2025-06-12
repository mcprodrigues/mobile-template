import { CameraCapturedPicture, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import { Image, SwitchCamera } from 'lucide-react-native';




export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);

  if (!permission) {
    return <Text className="text-center mt-10">Verificando permissões...</Text>;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="mb-4 text-center text-lg font-bold">Permita o acesso à câmera</Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          <Text className="text-white font-bold">Permitir</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const picture = await cameraRef.current.takePictureAsync();
      setPhoto(picture);
      Alert.alert('Foto capturada!', `Salva em: ${picture.uri}`);
    }
  };

  const handleToggleFacing = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  return (
    <View className="flex-1 pt-12">
      <Text className="text-2xl font-poppinssb px-6 mb-2">Localizar animais</Text>

      <View className="relative mx-4 rounded-2xl overflow-hidden bg-gray-400" style={{ aspectRatio: 9 / 16}}>
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing={facing}
        />

<View className="absolute bottom-5 w-full px-10 flex-row justify-between items-center">
  <TouchableOpacity onPress={() => Alert.alert('Abrir galeria')}>
    <Image color="white" size={28} />
  </TouchableOpacity>

  <TouchableOpacity
    onPress={handleTakePhoto}
    className="bg-slate-200 w-16 h-16 rounded-full items-center justify-center"
  >
    <View className="w-12 h-12 bg-white rounded-full" />
  </TouchableOpacity>

  <TouchableOpacity onPress={handleToggleFacing}>
    <SwitchCamera color="white" size={28} />
  </TouchableOpacity>
</View>
      </View>
    </View>
  );
}