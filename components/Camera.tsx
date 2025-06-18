import { CameraCapturedPicture, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type CameraProps = {
  facing: 'front' | 'back';
};

export default function Camera({ facing }: CameraProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
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



  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject} 
        facing={facing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 16,
  },
});
