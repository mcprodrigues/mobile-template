import MaskedView from '@react-native-masked-view/masked-view';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface RevealAnimationProps {
  image: any;
  duration?: number;
  
}

export default function RevealAnimation({
  image,
  duration = 2000,
}: RevealAnimationProps) {
  const height = useSharedValue(0);

  const maskStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  useEffect(() => {
    height.value = withTiming(120, { duration });
  }, []);

  return (
    <View className="items-center justify-center w-32 aspect-[3/4]">
      <MaskedView
        style={{ flex: 1, width: '100%' }}
        maskElement={
          <Animated.View style={[{ width: '100%', backgroundColor: 'black' }, maskStyle]} />
        }
      >
        <Image source={image} className="w-full h-full" resizeMode="contain" />
      </MaskedView>
    </View>
  );
}
