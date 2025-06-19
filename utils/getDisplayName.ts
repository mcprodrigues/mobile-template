
const nameMap: Record<string, string> = {
  gamba: 'Gambá',
  camaleao: 'Lagarto',
  pavao: 'Pavão',
  ema: 'Ema',
  pombo: 'Pombo',
  bode: 'Bode',
  cavalo: 'Cavalo',
  gato: 'Gato',
  iguana: 'Iguana',
  vaca: 'Vaca',
};

export function getDisplayName(name: string, isFound: boolean = true): string {
  if (!isFound) return '???';
  return nameMap[name] ?? name.charAt(0).toUpperCase() + name.slice(1);
}

