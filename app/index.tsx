import { Button } from '@/components/Button';
import { Image } from 'expo-image';
import React, { useRef } from 'react';
import { Animated, Dimensions, ImageSourcePropType, FlatList as RNFlatList, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

interface OnboardingItem {
  id: string;
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  buttonTitle: string;
  onButtonPress?: () => void;
}

const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    image: require('@/assets/images/moema.gif'),
    title: 'Explore os Animais do Campus Unifor',
    subtitle: 'Uma Pokédex feita para você explorar o campus da Universidade de Fortaleza de forma prática e interativa.',
    buttonTitle: 'Continuar',
  },
  {
    id: '2',
    image: require('@/assets/images/hilda.png'),
    title: 'Mantenha sua Pokédex atualizada',
    subtitle: 'Cadastre-se e acesse sempre a lista dos animais do campus, com informações para você explorar a qualquer momento.',
    buttonTitle: 'Vamos começar!',
  },
];

export default function OnboardingScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<RNFlatList>(null);

  const handlePress = (index: number) => {
    if (index < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: index + 1 });
    } else {
      console.log('Começar');
    }
  };

  const renderItem = ({ item, index }: { item: OnboardingItem; index: number }) => (
    <View className="flex-1 justify-end items-center gap-5 p-44" style={{ width }}>
      <Image source={item.image} style={{ width: 200, height: 300 }} contentFit="contain" />
      <Text className="w-80 text-3xl font-poppinssb text-center text-black">{item.title}</Text>
      <Text className="w-96 text-base text-center text-stone-500 font-poppins leading-tight">{item.subtitle}</Text>
      <Button title={item.buttonTitle} variant="primary" onPress={() => handlePress(index)} />
    </View>
  );

  return (
    <View className="flex-1">
      <Animated.FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />

      <View className="absolute bottom-24 flex-row justify-center w-full">
        {onboardingData.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 24, 8],
            extrapolate: 'clamp',
          });
          const dotColor = scrollX.interpolate({
            inputRange,
            outputRange: ['#D1D5DB', '#1746C7', '#D1D5DB'], 
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={i}
              style={{
                width: dotWidth,
                height: 8,
                borderRadius: 8,
                backgroundColor: dotColor,
                marginHorizontal: 4,
              }}
            />
          );
        })}
      </View>
    </View>
  );
}
