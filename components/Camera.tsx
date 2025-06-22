import { useIsFocused } from '@react-navigation/native';
import {
  CameraCapturedPicture,
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import {
  forwardRef,
  useImperativeHandle,
  useRef
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

type CameraProps = {
  facing: 'front' | 'back';
};

export type CameraHandler = {
  takePicture: () => Promise<CameraCapturedPicture | null>;
};

const Camera = forwardRef<CameraHandler, CameraProps>(({ facing }, ref) => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const isFocused = useIsFocused(); 

  useImperativeHandle(ref, () => ({
    takePicture: async () => {
      if (cameraRef.current) {
        const picture = await cameraRef.current.takePictureAsync();
        return picture;
      }
      return null;
    },
  }));

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

  return (
    <View style={styles.container}>
      {/* Só renderiza a câmera se a tela estiver visível */}
      {isFocused && (
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFillObject}
          facing={facing}
        />
      )}
    </View>
  );
});

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 16,
  },
});
