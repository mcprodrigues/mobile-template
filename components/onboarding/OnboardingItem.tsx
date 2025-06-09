import { Button } from '@/components/Button';
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, ImageSourcePropType, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

interface Props {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  buttonTitle: string;
  onPress: () => void;
}

export default function OnboardingItem({ image, title, subtitle, buttonTitle, onPress }: Props) {
  return (
    <View className="flex-1 justify-end items-center gap-5 p-44" style={{ width }}>
      <Image source={image} style={{ width: 200, height: 300 }} contentFit="contain" />
      <Text className="w-80 text-3xl font-poppinssb text-center text-black">{title}</Text>
      <Text className="w-96 text-base text-center text-stone-500 font-poppins leading-tight">{subtitle}</Text>
      <Button title={buttonTitle} variant="primary" onPress={onPress} />
    </View>
  );
}
