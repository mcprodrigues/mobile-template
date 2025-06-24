import { useIsFocused } from '@react-navigation/native';
import {
  CameraCapturedPicture,
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useSharedValue,
} from 'react-native-reanimated';


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

const [zoom, setZoom] = useState(0); 
const zoomValue = useSharedValue(1); 


const pinchHandler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
  onActive: (event) => {
    const newZoom = Math.min(Math.max((event.scale - 1) / 10 + zoom, 0), 1);
    runOnJS(setZoom)(newZoom);
  },
  onEnd: () => {
    zoomValue.value = 1;
  },
});


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
        <Image
          source={require('@/assets/images/moema-1.png')}
          style={{ width: 200, height: 300 }}
        />
        <Text className="mb-2 text-center text-lg font-poppinssb">Permita o acesso à câmera</Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-blue-900 px-4 py-2 w-52 rounded-full"
        >
          <Text className="text-white  text-center font-poppinssb">Permitir</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isFocused && (
<PinchGestureHandler onGestureEvent={pinchHandler}>
  <Animated.View style={StyleSheet.absoluteFill}>
    <CameraView
      ref={cameraRef}
      style={StyleSheet.absoluteFillObject}
      facing={facing}
      zoom={zoom}
    />
  </Animated.View>
</PinchGestureHandler>

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
