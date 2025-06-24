import { images } from '@/constants/images';
import { useRouter } from 'expo-router';
import { LogOut } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useAuth } from '@/contexts/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const name = user?.name || 'Nome não disponível';
  const email = user?.email || 'Email não disponível';

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

const handleLogout = async () => {
  setShowLogoutConfirm(false);
  await logout();

  setTimeout(() => {
    router.replace('/');
  }, 100);
};


  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-10">
      <ScrollView>
        {/* Header */}
        <View className="flex-row items-center mt-4 mb-8 ">
          <Image
            source={images.Icon}
            style={{ width: 42, height: 42 }}
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

        <TouchableOpacity
          className="flex-row items-center gap-2"
          onPress={() => setShowLogoutConfirm(true)}
        >
          <Text className="text-red-500 font-poppinssb text-base">Sair</Text>
          <LogOut color={'#ef4444'} size={16} />
        </TouchableOpacity>

        <Text className="text-zinc-500 font-poppins text-sm mt-2">
          Você entrou como {name}.
        </Text>
      </ScrollView>

      {/* Modal de confirmação */}
      <Modal
        visible={showLogoutConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutConfirm(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-end"
          onPress={() => setShowLogoutConfirm(false)}
        >
          <View className="bg-white rounded-t-2xl px-6 pt-4 pb-8">
            <View className="h-1 w-10 bg-zinc-300 self-center rounded-full mb-4" />
            <Text className="text-center text-black font-poppinssb text-base mb-6">
              Tem certeza que deseja sair?
            </Text>

            <TouchableOpacity
              className="bg-red-600 rounded-full py-3 items-center mb-4"
              onPress={handleLogout}
            >
              <Text className="text-white font-poppinssb">Sair</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowLogoutConfirm(false)}>
              <Text className="text-center text-zinc-600 font-poppinssb">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
