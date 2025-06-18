import { initialPokemons } from '@/constants/initialPokemons';
import { pokemons } from '@/constants/pokemons';

interface PokemonBasicDetails {
  name: string;
  description: string;
  image: any;
  bgColor: string;     // ← representa bgRight
  bgCard: string;      // ← representa bgCard
}

export function getPokemonBasicDetails(name: string): PokemonBasicDetails | null {
  const base = initialPokemons.find(p => p.name === name);
  const sprite = pokemons[name as keyof typeof pokemons];

  if (!base || !sprite) return null;

  const descriptionMap: Record<string, string> = {
    cabra: 'A cabra é resistente, adaptável e vive em terrenos montanhosos.',
    camaleao: 'O camaleão muda de cor e se camufla para se proteger.',
    cavalo: 'O cavalo é veloz e foi domesticado para transporte.',
    ema: 'A ema é uma ave corredora do nordeste, incapaz de voar.',
    gamba: 'O gambá se defende liberando um forte odor.',
    gato: 'O gato é ágil e caçador nato, mesmo domesticado.',
    iguana: 'A iguana é um réptil tranquilo e adora tomar sol.',
    pavao: 'O pavão exibe sua cauda colorida para atrair parceiros.',
    pombo: 'O pombo se adaptou à vida urbana e vive em grandes cidades.',
    vaca: 'A vaca é dócil e fornece leite e derivados ao ser humano.',
  };

  return {
    name: base.name.charAt(0).toUpperCase() + base.name.slice(1),
    description: descriptionMap[name] ?? 'Animal desconhecido.',
    image: sprite.normal,
    bgColor: base.bgRight,
    bgCard: base.bgCard,
  };
}
