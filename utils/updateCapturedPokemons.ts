import { initialPokemons } from '@/constants/initialPokemons';
import { apiToInternalNameMap } from '@/utils/getDisplayName';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'capturedPokemons';
const CAPTURES_HISTORY_KEY = 'captureHistory';

export async function updateCapturedPokemons(captures: any[]) {
  try {
    console.log('📌 Dados brutos das capturas recebidas:', captures);

    const internalNames = [
      ...new Set(
        captures
          .map((c) => apiToInternalNameMap[c.animal.name])
          .filter(Boolean)
      ),
    ];

    const pokemons = initialPokemons.map((p) => ({
      ...p,
      isFound: internalNames.includes(p.name),
    }));

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pokemons));
    console.log('✅ Pokémons atualizados e salvos.');

    const formattedHistory = captures.map((c) => ({
      animal: { name: c.animal.name },
      date: c.capturedAt,
    }));

    await AsyncStorage.setItem(CAPTURES_HISTORY_KEY, JSON.stringify(formattedHistory));
    console.log('📘 Histórico de capturas salvo.');

    const countMap = captures.reduce((acc: Record<string, number>, curr: any) => {
      const name = curr.animal.name;
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});

    console.log('📊 Capturas por espécie:');
    Object.entries(countMap).forEach(([name, count]) => {
      console.log(`- ${name}: ${count}x`);
    });

  } catch (err) {
    console.error('❌ Erro ao atualizar pokémons ou histórico:', err);
  }
}
