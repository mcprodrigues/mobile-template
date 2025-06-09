import { Button } from '@/components/Button';
import React from 'react';
import { Text, View } from 'react-native';

export default function Index(){
  return (
    <View className="flex-1 justify-center items-center ">
      <Text className='text-5xl text-cyan-950 font-poppinssb'>Hello World!</Text>
<Button title="Continuar" variant="primary" onPress={() => console.log('Primary')} />
<Button title="Continuar" variant="outline" onPress={() => console.log('Outline')} />
<Button title="Continuar" variant="disabled" />
<Button title="Carregando..." variant="primary" loading />


    </View>
  );
}

