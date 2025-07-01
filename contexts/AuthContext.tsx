import { updateCapturedPokemons } from '@/utils/updateCapturedPokemons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  accessToken: string;
};

type AuthContextType = {
  user: User | null;
  login: (data: User) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

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

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
