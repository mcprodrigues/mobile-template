import { initialPokemons } from '@/constants/initialPokemons';
import medalsJson from '@/constants/medals.json';
import { apiToInternalNameMap } from '@/utils/getDisplayName';
import { showBadgeToast } from '@/utils/showBadgeToast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const internalToBadgeNameMap: Record<string, string> = {
  gamba: 'Gamba',
  lagarto: 'Lagarto',
  pavao: 'Pavão',
  ema: 'Ema',
  pombo: 'Pombo',
  bode: 'Cabra',
  cavalo: 'Cavalo',
  gato: 'Gato',
  iguana: 'Iguana',
  vaca: 'Vaca',
};

type Badge = {
  level: number;
  title: string;
  description: string;
};

const badgesData = medalsJson as Record<string, Badge[]>;

const STORAGE_KEY = 'capturedPokemons';
const CAPTURES_HISTORY_KEY = 'captureHistory';
const BADGES_KEY = 'userBadges';
const RECENT_BADGES_KEY = 'recentBadges'; // Novo

export async function updateCapturedPokemons(captures: any[]) {
  try {
    console.log('📌 Dados brutos das capturas recebidas:', captures.length);

    // 1. Atualizar estado dos pokémons encontrados
    const internalNames = [
      ...new Set(
        captures
          .map((c) => apiToInternalNameMap[c.animal?.name])
          .filter(Boolean)
      ),
    ];

    const pokemons = initialPokemons.map((p) => ({
      ...p,
      isFound: internalNames.includes(p.name),
    }));

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pokemons));
      console.log('✅ Pokémons atualizados e salvos.');
    } catch (e) {
      console.error('❌ Erro ao salvar pokémons:', e);
    }

    // 2. Histórico de capturas
    const formattedHistory = captures.map((c) => ({
      animal: { name: c.animal?.name },
      date: c.capturedAt,
    }));

    try {
      await AsyncStorage.setItem(CAPTURES_HISTORY_KEY, JSON.stringify(formattedHistory));
      console.log('📘 Histórico de capturas salvo.');
    } catch (e) {
      console.error('❌ Erro ao salvar histórico:', e);
    }

    // 3. Contagem por animal
    const countMap = captures.reduce((acc: Record<string, number>, curr: any) => {
      const name = curr.animal?.name;
      if (!name) return acc;
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});
    console.log('📊 Contagem de capturas por animal:', countMap);

    // 4. Obter medalhas anteriores
    let previousBadges: Record<string, Badge[]> = {};
    try {
      const previous = await AsyncStorage.getItem(BADGES_KEY);
      previousBadges = previous ? JSON.parse(previous) : {};
    } catch (e) {
      console.warn('⚠️ Não foi possível ler medalhas anteriores:', e);
    }

    const userBadges: Record<string, Badge[]> = {};
    const newlyUnlockedBadges: Badge[] = [];

    // 5. Verificação de conquistas por animal
    for (const [apiName, count] of Object.entries(countMap)) {
      const internal = apiToInternalNameMap[apiName];
      if (!internal) {
        console.log(`⚠️ Nome da API não mapeado internamente: ${apiName}`);
        continue;
      }

      const badgeKey = internalToBadgeNameMap[internal];
      if (!badgeKey) {
        console.log(`⚠️ Animal sem mapeamento para medalha: ${internal}`);
        continue;
      }

      const availableBadges = badgesData[badgeKey];
      if (!availableBadges) {
        console.log(`⚠️ Sem medalhas definidas para: ${badgeKey}`);
        continue;
      }

      const unlocked = availableBadges.filter((b) => count >= b.level);
      const previouslyUnlocked = previousBadges[internal] || [];

      const newBadges = unlocked.filter(
        (b) => !previouslyUnlocked.some((p) => p.level === b.level)
      );

      newlyUnlockedBadges.push(...newBadges);

      if (newBadges.length > 0) {
        newBadges.forEach((badge) => {
          try {
            showBadgeToast('Nova conquista desbloqueada!', badge.title, badge.description);
          } catch (e) {
            console.error('❌ Erro ao exibir toast de medalha:', e);
          }
        });
      }

      const combined = [
        ...previouslyUnlocked,
        ...newBadges.filter((n) => !previouslyUnlocked.some((p) => p.level === n.level)),
      ];

      if (combined.length > 0) {
        userBadges[internal] = combined;
        console.log(`🏅 Medalhas desbloqueadas para ${badgeKey} (${count} capturas):`);
        combined.forEach((b) =>
          console.log(`   - ${b.title} (nível ${b.level}) — ${b.description}`)
        );
      } else {
        console.log(`📭 Nenhuma medalha desbloqueada ainda para ${badgeKey}.`);
      }
    }

    // 6. Salvar medalhas acumuladas
    try {
      const mergedBadges: Record<string, Badge[]> = { ...previousBadges };

      for (const key in userBadges) {
        const existing = mergedBadges[key] || [];
        const newOnes = userBadges[key];
        const combined = [
          ...existing,
          ...newOnes.filter((n) => !existing.some((e) => e.level === n.level)),
        ];
        mergedBadges[key] = combined;
      }

      await AsyncStorage.setItem(BADGES_KEY, JSON.stringify(mergedBadges));
      console.log('🎯 Medalhas salvas com sucesso no AsyncStorage.');
    } catch (e) {
      console.error('❌ Erro ao salvar medalhas:', e);
    }

    // 7. Atualizar conquistas recentes
    try {
      const existingRecent = await AsyncStorage.getItem(RECENT_BADGES_KEY);
      const recentList: Badge[] = existingRecent ? JSON.parse(existingRecent) : [];

      const updatedRecent = [
        ...newlyUnlockedBadges,
        ...recentList.filter(
          (b) =>
            !newlyUnlockedBadges.some(
              (n) => n.title === b.title && n.level === b.level
            )
        ),
      ].slice(0, 10); // últimas 10 conquistas

      await AsyncStorage.setItem(RECENT_BADGES_KEY, JSON.stringify(updatedRecent));
      console.log('🆕 Conquistas recentes atualizadas:', updatedRecent);
    } catch (e) {
      console.error('❌ Erro ao salvar conquistas recentes:', e);
    }

    // 8. Exibir resumo final
    console.log('🏆 Medalhas totais do usuário:');
    Object.entries(userBadges).forEach(([internal, badges]) => {
      const label = internalToBadgeNameMap[internal] ?? internal;
      console.log(`- ${label}:`);
      badges.forEach((badge) =>
        console.log(`   • ${badge.title} (nível ${badge.level}) — ${badge.description}`)
      );
    });
  } catch (err) {
    console.error('❌ Erro geral ao processar capturas:', err);
  }
}
