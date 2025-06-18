
const nameMap: Record<string, string> = {
  gamba: 'Gambá',
  camaleao: 'Camaleão',
  pavao: 'Pavão',
  ema: 'Ema',
  pombo: 'Pombo',
  bode: 'Bode',
  cavalo: 'Cavalo',
  gato: 'Gato',
  iguana: 'Iguana',
  vaca: 'Vaca',
};

export function getDisplayName(name: string): string {
  return nameMap[name] ?? name.charAt(0).toUpperCase() + name.slice(1);
}
