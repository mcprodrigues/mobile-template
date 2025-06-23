const nameMap: Record<string, string> = {
  gamba: 'Gambá',
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

export const apiToInternalNameMap: Record<string, string> = {
  possum: 'gamba',
  chameleon: 'camaleao',
  lizard: 'lagarto',
  peacock: 'pavao',
  ostrich: 'ema',
  pigeon: 'pombo',
  goat: 'bode',
  horse: 'cavalo',
  cat: 'gato',
  iguana: 'iguana',
  cow: 'vaca',
};

export const internalToBadgeNameMap: Record<string, string> = {
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


export function getDisplayName(apiName: string, isFound: boolean = true): string {
  if (!isFound) return '???';

  const internalName = apiToInternalNameMap[apiName] ?? apiName;
  return nameMap[internalName] ?? internalName.charAt(0).toUpperCase() + internalName.slice(1);
}

