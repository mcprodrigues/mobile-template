import { initialPokemons } from '@/constants/initialPokemons';
import { pokemons } from '@/constants/pokemons';

interface PokemonBasicDetails {
  name: string;
  description: string;
  curiosities: string;
  image: any;
  bgColor: string;     
  bgCard: string;     
}


export function getPokemonBasicDetails(name: string): PokemonBasicDetails | null {
  const base = initialPokemons.find(p => p.name === name);
  const sprite = pokemons[name as keyof typeof pokemons];

  if (!base || !sprite) return null;

const descriptionMap: Record<string, string> = {
    cabra: 'A cabra é um animal curioso, ágil e muito adaptável. Com seu olhar esperto e comportamento brincalhão, costuma chamar atenção dos estudantes enquanto explora os arredores em busca de folhas ou sombra. Seu comportamento sociável e ativo a torna uma presença divertida no campus.',
    lagarto: 'O Lagarto, conhecido popularmente como Calango em muitas regiões do Nordeste, é um réptil pequeno e ágil. Ele possui corpo fino, escamas duras, pernas rápidas e uma longa cauda. É comum vê-lo tomando sol em muros, calçadas e pedras. Alimenta-se de insetos e pequenos animais, sendo um grande aliado no controle de pragas urbanas.',
    cavalo: 'O cavalo é símbolo de força e elegância. No campus, ele representa conexão com a natureza e com atividades ligadas ao cuidado e à educação. Sempre atento ao ambiente ao redor, o cavalo é também um grande companheiro, demonstrando empatia e sensibilidade com humanos.',
    ema: 'A ema é a maior ave nativa do Brasil e uma das mais queridas do campus. Mesmo sem voar, é extremamente rápida e curiosa. Com seu pescoço alto e olhos atentos, costuma andar livremente pelos campos e gramados da universidade.',
    gamba: 'O gambá é um marsupial noturno conhecido por sua habilidade de se fingir de morto quando se sente ameaçado. Além disso, possui um odor característico que libera como forma de defesa. No campus, ele costuma ser discreto, mas essencial para o controle de insetos e pequenos roedores.',
    gato: 'Os gatos do campus são carismáticos, amados pelos alunos e muitas vezes adotados de forma comunitária. Costumam circular entre os prédios e jardins em busca de sombra e carinho.',
    iguana: 'Com visual primitivo e andar tranquilo, a iguana é uma das moradoras mais exóticas da universidade. Gosta de tomar sol nas árvores ou em áreas mais quentes.',
    pavao: 'Com sua cauda exuberante e colorida, o pavão macho encanta visitantes e estudantes. É uma das presenças mais marcantes no campus, especialmente quando “abre o leque” para impressionar.',
    pombo: 'Comum em ambientes urbanos, o pombo marca presença também no campus. Anda em bandos e se adapta bem a qualquer ambiente, especialmente onde há presença de alimentos.',
    vaca: 'As vacas do campus são dóceis e convivem bem com o ambiente universitário. Além de embelezarem o cenário natural, despertam curiosidade e afeto dos visitantes.',
  };

    const curiositiesMap: Record<string, string> = {
    cabra: 'As cabras conseguem escalar superfícies íngremes com facilidade, até mesmo árvores e encostas rochosas ',
    lagarto: 'Quando se sente ameaçado, o lagarto pode soltar a própria cauda para distrair o predador e escapar. Depois de um tempo, ele consegue regenerar a cauda – uma defesa incrível da natureza!',
    cavalo: 'Os cavalos têm uma memória impressionante — eles conseguem lembrar de pessoas, caminhos e até emoções por muitos anos.',
    ema: 'O macho é quem choca os ovos e cuida dos filhotes, comportamento raro entre as aves.',
    gamba: 'Apesar da má fama, o gambá é inofensivo e um grande aliado ecológico, pois ajuda no equilíbrio do ecossistema urbano.',
    gato: ' Cada gato tem um “território” preferido no campus — e geralmente conquista muitos corações por onde passa.',
    iguana: 'As iguanas têm um terceiro olho no topo da cabeça chamado "parietal", que detecta mudanças de luz e movimento — útil contra predadores.',
    pavao: 'Apenas o pavão macho possui a cauda colorida; as fêmeas (pavoas) têm plumagem mais discreta. ',
    pombo: 'Apesar de serem vistos como pragas em algumas cidades, pombos têm excelente memória espacial e já foram usados como mensageiros em guerras.',
    vaca: 'As vacas possuem um estômago com quatro compartimentos. Esse sistema permite que elas fermentem e reaproveitem os alimentos, facilitando a digestão completa e a extração de nutrientes, o que as torna ruminantes eficientes.',
  };

return {
  name: base.name ?? name.charAt(0).toUpperCase() + name.slice(1),
  description: descriptionMap[name] ?? 'Animal desconhecido.',
  curiosities: curiositiesMap[name] ?? 'Animal desconhecido',
  image: sprite.normal,
  bgColor: base.bgRight,
  bgCard: base.bgCard,
};
}
