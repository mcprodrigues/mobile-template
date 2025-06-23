import { initialPokemons } from '@/constants/initialPokemons';
import medalsJson from '@/constants/medals.json';
import { apiToInternalNameMap } from '@/utils/getDisplayName';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mapeamento de nomes internos para os nomes usados no JSON de medalhas
const internalToBadgeNameMap: Record<string, string> = {
  gamba: 'Gamba',
  camaleao: 'Camaleão',
  lagarto: 'Lagarto',
  pavao: 'Pavão',
  ema: 'Ema',
  pombo: 'Pombo',
  bode: 'Bode',
  cavalo: 'Cavalo',
  gato: 'Gato',
  iguana: 'Iguana',
  vaca: 'Vaca',
};

// Tipagem
type Badge = {
  level: number;
  title: string;
  description: string;
};

const badgesData = medalsJson as Record<string, Badge[]>;

const STORAGE_KEY = 'capturedPokemons';
const CAPTURES_HISTORY_KEY = 'captureHistory';
const BADGES_KEY = 'userBadges';

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
    console.log('✅ Pokémons atualizados e salvos:', pokemons);

    const formattedHistory = captures.map((c) => ({
      animal: { name: c.animal.name },
      date: c.capturedAt,
    }));

    await AsyncStorage.setItem(CAPTURES_HISTORY_KEY, JSON.stringify(formattedHistory));
    console.log('📘 Histórico de capturas salvo:', formattedHistory);

    // Contagem por espécie
    const countMap = captures.reduce((acc: Record<string, number>, curr: any) => {
      const name = curr.animal.name;
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});
    console.log('📊 Contagem de capturas por animal:', countMap);

    const userBadges: Record<string, Badge[]> = {};

    for (const [apiName, count] of Object.entries(countMap)) {
      const internal = apiToInternalNameMap[apiName];
      const badgeKey = internalToBadgeNameMap[internal];

      if (!badgeKey) {
        console.log(`⚠️ Animal não mapeado para medalha: ${internal}`);
        continue;
      }

      const availableBadges = badgesData[badgeKey];
      if (!availableBadges) {
        console.log(`⚠️ Sem medalhas definidas para: ${badgeKey}`);
        continue;
      }

      const unlocked = availableBadges.filter((badge) => count >= badge.level);

      if (unlocked.length > 0) {
        userBadges[internal] = unlocked;
        console.log(`🏅 Medalhas desbloqueadas para ${badgeKey} (${count} capturas):`);
        unlocked.forEach((b) =>
          console.log(`   - ${b.title} (nível ${b.level}): ${b.description}`)
        );
      } else {
        console.log(`📭 Nenhuma medalha desbloqueada ainda para ${badgeKey} (${count} capturas).`);
      }
    }

    await AsyncStorage.setItem(BADGES_KEY, JSON.stringify(userBadges));
    console.log('🎯 Medalhas salvas no AsyncStorage:', userBadges);

    // 🔍 Imprime todas as medalhas salvas
    console.log('🏆 Medalhas totais do usuário:');
    Object.entries(userBadges).forEach(([internalName, medals]) => {
      const label = internalToBadgeNameMap[internalName] ?? internalName;
      console.log(`- ${label}:`);
      medals.forEach((badge) =>
        console.log(`   • ${badge.title} (nível ${badge.level}) — ${badge.description}`)
      );
    });

  } catch (err) {
    console.error('❌ Erro ao atualizar pokémons, histórico ou medalhas:', err);
  }
}
