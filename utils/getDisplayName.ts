const nameMap: Record<string, string> = {
  gamba: 'Gambá',
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

export const apiToInternalNameMap: Record<string, string> = {
  possum: 'gamba',
  lizard: 'lagarto',
  peacock: 'pavao',
  ostrich: 'ema',
  pigeon: 'pombo',
  goat: 'cabra',
  horse: 'cavalo',
  cat: 'gato',
  iguana: 'iguana',
  cow: 'vaca',
};

export const internalToBadgeNameMap: Record<string, string> = {
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


export function getDisplayName(apiName: string, isFound: boolean = true): string {
  if (!isFound) return '???';

  const internalName = apiToInternalNameMap[apiName] ?? apiName;
  return nameMap[internalName] ?? internalName.charAt(0).toUpperCase() + internalName.slice(1);
}

