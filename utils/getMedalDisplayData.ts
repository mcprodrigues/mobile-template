import rawMedalsJson from '@/constants/medals.json';
import { apiToInternalNameMap } from '@/utils/getDisplayName';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Badge = {
  level: number;
  title: string;
  description: string;
};

type BadgeDisplay = {
  species: string;
  title: string;
  description: string;
  level: number;
  captured: number;
  unlocked: boolean;
};

const medalsJson = rawMedalsJson as Record<string, Badge[]>;

export async function getMedalsDisplayData(): Promise<BadgeDisplay[]> {
  const historyJson = await AsyncStorage.getItem('captureHistory');
  const history = JSON.parse(historyJson || '[]');

  const count: Record<string, number> = {};

  for (const h of history) {
    const apiName = h.animal.name;
    const internal = apiToInternalNameMap[apiName];
    const displayName = internal.charAt(0).toUpperCase() + internal.slice(1); 
    count[displayName] = (count[displayName] || 0) + 1;
  }

  const result: BadgeDisplay[] = [];

  for (const species of Object.keys(medalsJson)) {
    const capturedTotal = count[species] || 0;
    const badges = medalsJson[species];

    for (const badge of badges) {
      const currentCaptured = Math.min(capturedTotal, badge.level);

      result.push({
        species,
        title: badge.title,
        description: badge.description,
        level: badge.level,
        captured: currentCaptured,
        unlocked: capturedTotal >= badge.level,
      });
    }
  }

  return result;
}
