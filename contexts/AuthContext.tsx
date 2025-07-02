import { updateCapturedPokemons } from '@/utils/updateCapturedPokemons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  accessToken: string;
  title?: string;
  level?: number;
  totalPoints?: number;
};

type AuthContextType = {
  user: User | null;
  login: (data: User) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>; 
    isUserLoading: boolean;

};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
const [isUserLoading, setIsUserLoading] = useState(true);
  useEffect(() => {
    refreshUser();
  }, []);

<<<<<<< HEAD
const refreshUser = async () => {
  try {
    setIsUserLoading(true);
    const stored = await AsyncStorage.getItem('user');
    if (!stored) return;

    const parsed = JSON.parse(stored);

    if (parsed.id && parsed.accessToken) {
      // 1. Buscar dados atualizados do usuário
      const userResponse = await fetch(
        `https://pokedex-back-end-production-9709.up.railway.app/users/${parsed.id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${parsed.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const userData = await userResponse.json();

      const updatedUser = {
        ...parsed,
        title: userData.title,
        totalPoints: userData.totalPoints,
        level: Math.floor(userData.totalPoints / 300) + 1,
      };

      // 2. Atualizar o contexto e o AsyncStorage com os dados atualizados
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

      // 3. Buscar capturas e atualizar pokémons
      const capturesResponse = await fetch(
        `https://pokedex-back-end-production-9709.up.railway.app/captures/user/${parsed.id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${parsed.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const captures = await capturesResponse.json();
      if (Array.isArray(captures)) {
        await updateCapturedPokemons(captures);
      }

      console.log('🔄 Usuário restaurado com dados atualizados:', updatedUser);
    }
  } catch (err) {
    console.error('❌ Erro ao restaurar usuário e capturas:', err);
  } finally {
    setIsUserLoading(false);
=======
  useEffect(() => {
    const loadUser = async () => {
      try {
        const stored = await AsyncStorage.getItem('user');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.id && parsed?.email && parsed?.name && parsed?.password) {
            console.log('Usuário carregado do AsyncStorage:', parsed); 
            setUser(parsed);
          } else {
            console.warn('Usuário armazenado incompleto:', parsed);
          }
        }
      } catch (err) {
        console.error('Erro ao carregar usuário do AsyncStorage:', err);
      }
    };

    loadUser();
  }, []);

const login = async (data: User) => {
  console.log('✅ Salvando usuário no contexto e AsyncStorage:', data); 
  setUser(data);
  await AsyncStorage.setItem('user', JSON.stringify(data));

  try {
    const response = await fetch(
      `https://pokedex-back-end-production-9709.up.railway.app/captures/user/${data.id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const captures = await response.json();

    if (!Array.isArray(captures)) {
      console.warn('⚠️ Resposta inesperada da API de capturas:', captures);
      return;
    }

    console.log('📦 Capturas recebidas:', captures.length);
    await updateCapturedPokemons(captures, false); 
  } catch (err) {
    console.error('❌ Erro ao restaurar capturas no login:', err);
>>>>>>> fix/build
  }
};

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove([
        'user',
        'capturedPokemons',
        'captureHistory',
        'userBadges',
        'recentBadges',
      ]);
      setUser(null);
      console.log('🧹 Logout limpo: dados da conta anterior removidos.');
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
  };

const login = async (data: User) => {
  console.log('✅ Salvando login no contexto e AsyncStorage:', data); 
  setUser(data);
  await AsyncStorage.setItem('user', JSON.stringify(data));

  try {
    const capturesResponse = await fetch(
      `https://pokedex-back-end-production-9709.up.railway.app/captures/user/${data.id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const captures = await capturesResponse.json();
    if (Array.isArray(captures)) {
      await updateCapturedPokemons(captures);
    } else {
      console.warn('⚠️ Resposta inesperada da API de capturas:', captures);
    }
  } catch (err) {
    console.error('❌ Erro ao buscar capturas no login:', err);
  }
};


  const logout = async () => {
    try {
      await AsyncStorage.multiRemove([
        'user',
        'capturedPokemons',
        'captureHistory',
        'userBadges',
      ]);
      setUser(null);
      console.log('🧹 Logout limpo: dados da conta anterior removidos.');
    } catch (err) {
      console.error('❌ Erro ao fazer logout:', err);
    }
  };

  return (
<AuthContext.Provider value={{ user, login, logout, refreshUser, isUserLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
