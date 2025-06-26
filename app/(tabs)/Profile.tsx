import { images } from '@/constants/images';
import { useRouter } from 'expo-router';
import { ChevronRight, LogOut, MoreVertical, Trash } from 'lucide-react-native';
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
import Toast from 'react-native-toast-message';

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const name = user?.name || 'Nome não disponível';
  const email = user?.email || 'Email não disponível';

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
        <View className="flex-row items-end justify-between mt-4 mb-8">
          <View className="flex-row items-center">
            <Image
              source={images.Icon}
              style={{ width: 42, height: 42 }}
              resizeMode="contain"
            />
            <Text className="font-poppinssb text-zinc-800 text-xl ml-3">{name}</Text>
          </View>
          <TouchableOpacity onPress={() => setShowOptionsModal(true)}>
            <MoreVertical size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>

        <Text className="font-poppinssb text-black text-base mb-3">Informações da conta</Text>

        <TouchableOpacity className="justify-between flex-row py-3" onPress={() => router.push('/edit/Name')}> 
          <View className='flex-col'>
          <Text className="text-zinc-800 font-poppinssb text-sm">Nome</Text>
          <Text className="text-zinc-500 font-poppins text-sm">{name}</Text>
          </View>
          <ChevronRight color='black' size={20}/>
        </TouchableOpacity>

        <TouchableOpacity className="justify-between flex-row py-3">
          <View className='flex-col'>
          <Text className="text-zinc-800 font-poppinssb text-sm">E-mail</Text>
          <Text className="text-zinc-500 font-poppins text-sm">{email}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="justify-between flex-row py-3">
          <View className='flex-col'>
          <Text className="text-zinc-800 font-poppinssb text-sm">Senha</Text>
          <Text className="text-zinc-500 font-poppins text-sm">••••••••••</Text>
          </View>
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

      {/* Modal de confirmação de logout */}
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

      {/* Modal de opções */}
      <Modal
        visible={showOptionsModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowOptionsModal(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-end"
          onPress={() => setShowOptionsModal(false)}
        >
          <View className="bg-white rounded-t-2xl px-6 pt-4 pb-8">
            <View className="h-1 w-10 bg-zinc-300 self-center rounded-full mb-4" />
            <Text className="text-center text-black font-poppinssb text-base mb-6">
              Mais opções
            </Text>

            <TouchableOpacity
              className="flex-row items-center justify-center gap-2 bg-red-100 rounded-full py-3 mb-4"
              onPress={() => {
                setShowOptionsModal(false);
                setTimeout(() => setShowDeleteConfirm(true), 300);
              }}
            >
              <Trash size={18} color="#dc2626" />
              <Text className="text-red-600 font-poppinssb">Deletar minha conta</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowOptionsModal(false)}>
              <Text className="text-center text-zinc-600 font-poppinssb">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Modal de confirmação de deleção */}
      <Modal
        visible={showDeleteConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteConfirm(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-end"
          onPress={() => setShowDeleteConfirm(false)}
        >
          <View className="bg-white rounded-t-2xl px-6 pt-4 pb-8">
            <View className="h-1 w-10 bg-zinc-300 self-center rounded-full mb-4" />
            <Text className="text-center text-black font-poppinssb text-base mb-6">
              Tem certeza que deseja deletar sua conta?
            </Text>
            <Text className="text-center text-zinc-600 font-poppins mb-6">
              Essa é uma ação irreversível
            </Text>

            <TouchableOpacity
              className={`rounded-full py-3 items-center mb-4 ${
                isDeleting ? 'bg-red-400' : 'bg-red-600'
              }`}
              disabled={isDeleting}
              onPress={async () => {
                if (!user?.id || !user?.accessToken) return;

                try {
                  setIsDeleting(true);
                  const response = await fetch(
                    `https://pokedex-back-end-production-9709.up.railway.app/users/${user.id}`,
                    {
                      method: 'DELETE',
                      headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                        'Content-Type': 'application/json',
                      },
                    }
                  );

                  if (!response.ok) throw new Error('Erro ao deletar');

                  Toast.show({
                    type: 'success',
                    text2: 'Conta deletada com sucesso',
                    position: 'top',
                  });

                  await logout();
                  setShowDeleteConfirm(false);
                  router.replace('/');
                } catch (err) {
                  console.error('Erro ao deletar conta:', err);
                  Toast.show({
                    type: 'error',
                    text2: 'Erro ao deletar conta. Tente novamente.',
                    position: 'top',
                  });
                } finally {
                  setIsDeleting(false);
                }
              }}
            >
              <Text className="text-white font-poppinssb">
                {isDeleting ? 'Deletando...' : 'Sim, tenho certeza'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={isDeleting}
              onPress={() => setShowDeleteConfirm(false)}
            >
              <Text className="text-center text-zinc-600 font-poppinssb">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
