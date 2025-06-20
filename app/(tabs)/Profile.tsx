import { images } from '@/constants/images';
import { LogOut } from 'lucide-react-native';
import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const name = 'winterbona';
  const email = 'meuemail@gmail.com';

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-10">
      <ScrollView>
        {/* Header */}
        <View className="flex-row items-center mt-4 mb-8 ">
          <Image
            source={images.Icon}
            style={{ width: 42, height: 42}}
            resizeMode="contain"
          />
          <Text className="font-poppinssb text-zinc-800 text-xl ml-3">{name}</Text>
        </View>

        <Text className="font-poppinssb text-black text-base mb-3">Informações da conta</Text>

        <TouchableOpacity className="flex-col py-3">
          <Text className="text-zinc-800 font-poppinssb text-sm">Nome</Text>
          <Text className="text-zinc-500 font-poppins text-sm">{name}</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-col py-3">
          <Text className="text-zinc-800 font-poppinssb text-sm">E-mail</Text>
          <Text className="text-zinc-500 font-poppins text-sm">{email}</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-col py-3">
          <Text className="text-zinc-800 font-poppinssb text-sm">Senha</Text>
          <Text className="text-zinc-500 font-poppins text-sm">••••••••••</Text>
        </TouchableOpacity>

        <Text className="font-poppinssb text-black text-base mt-10 mb-3">Outros</Text>

        <TouchableOpacity className='flex-row items-center gap-2'>
          <Text className="text-red-500 font-poppinssb text-base">Sair</Text>
          <LogOut color={'#ef4444'} size={16}/>
        </TouchableOpacity>

        <Text className="text-zinc-500 font-poppins text-sm mt-2">
          Você entrou como {name}.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
