import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Feather } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  router: {
    back: () => void
  }
}

export default function Header({ title, router }: HeaderProps) {

  return (
    <View className="flex-row items-center justify-between px-4 h-16">
      <TouchableOpacity onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <Text className=" left-0 right-0 text-center text-lg font-poppinssb text-black">
        {title}
      </Text>

      <View style={{ width: 24 }} />
    </View>
  );
}
