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
    cabra: 'As cabras são animais ruminantes e foram domesticados há mais de 10 mil anos, tendo sido extremamente importantes para a sobrevivência do homem, fornecendo leite, carne e fibra dos seus pelos e sua pele até os dias atuais. Além disso, esses animais são altamente inteligentes e curiosos, capazes de resolver problemas lógicos complexos, como manipular objetos.',
    gato: 'Os gatos domésticos, apesar de viverem em casas, apartamentos e até fazendas, eles carregam em seu corpo e comportamento a herança de milhões de anos de evolução como predadores solitários. Pertencem ao grupo dos felinos, como leões, onças e tigres e foram domesticados há cerca de 9 mil anos. Esse processo começou de forma espontânea: os primeiros humanos sedentários armazenavam grãos, o que atraía roedores e, por consequência, os gatos primitivos.',
    lagarto: 'Os lagartos são o grupo mais diverso de répteis atualmente, podendo ser encontrados nos mais variados ambientes do planeta, como nosso campus! Apesar de possuírem várias espécies, o lagarto Tropidurus, conhecido popularmente como Calango em muitas regiões do Nordeste, é um réptil pequeno, ágil e bastante comum no nosso dia-a-dia. Ele possui corpo fino, escamas duras, pernas rápidas e uma longa cauda. É comum vê-lo tomando sol em muros, calçadas e pedras. Alimenta-se de insetos e pequenos animais, sendo um grande aliado no controle de pragas urbanas.',
    cavalo: 'Você sabia que os ancestrais dos cavalos possuíam de três a quatro dedos nos pés? Ao longo da evolução, eles aumentaram de tamanho e reduziram a quantidade de dedos, possuindo atualmente apenas um. Essas modificações foram importantes para a adaptação ao seu estilo de vida em ambientes abertos, permitindo que se tornassem animais com grande vigor físico. Os cavalos foram domesticados pelos humanos, inicialmente nas estepes da Ásia Central. Desde então, tornaram-se peças-chave na agricultura, nos transportes, nas guerras e até no esporte.',
    ema: 'O verdadeiro dinossauro do nosso campus, animal tão emblemático que virou até o símbolo da universidade. A ema é a maior ave nativa das Américas e a terceira maior do mundo. Pode chegar a 1,70 metro de altura e pesar até 40 quilos, mas não voa. Em compensação, suas pernas longas e fortes permitem que atinja velocidades de até 60 km/h, tornando-a uma excelente corredora, uma adaptação essencial para fugir de predadores em ambientes abertos.',
    gamba: 'Quando se fala em gambá, muita gente pensa em um animal fedorento e indesejado no quintal, mas o que pouca gente sabe é que esses mamíferos são extremamente importantes para o equilíbrio ecológico e possuem adaptações incríveis para sobreviver tanto na natureza quanto nas cidades. São animais noturnos, com excelente olfato e audição, e possuem cauda preênsil, que usam como apoio para subir em árvores ou carregar materiais. Além disso, realizam tanatose: comportamento animal instintivo e involuntário onde um animal se finge de morto para escapar de predadores.',    
iguana: 'Embora muitas vezes chamada de camaleão, as iguanas são bem diferentes. Elas são diurnas e passam boa parte do tempo tomando sol em galhos altos ou pedras. São também excelentes nadadoras e podem mergulhar para fugir de ameaças. Apesar da aparência tranquila, podem ser territoriais, principalmente os machos, que usam sinais visuais como balançar a cabeça, inflar a papada e mudar a coloração para intimidar rivais ou atrair fêmeas.',    
pavao: 'Pavões são aves galiformes, assim como as galinhas, faisões e perus. E quando se fala em animais exuberantes, o pavão vem logo à mente. Com sua cauda colorida e exuberante, ele se tornou um símbolo da beleza, mas a sua cauda sempre intrigou cientistas, o Charles Darwin usou esse exemplo para explicar a seleção sexual: embora uma cauda grande seja um obstáculo à fuga de predadores, ela é mantida pela evolução porque atrai mais fêmeas. Ou seja, os machos com caudas maiores e mais vistosas têm mais chances de deixar descendentes.',
    pombo: 'Os pombos são aves granívoras, ou seja, alimentam-se principalmente de sementes e grãos, mas se adaptaram bem à vida urbana e consomem restos de alimentos humanos. Eles são considerados por muitos como pragas urbanas, devido à superpopulação, fezes ácidas e transmissão potencial de doenças. No entanto, a melhor forma de lidar com esse problema não é com rejeição ou maus-tratos, mas com controle populacional ético e educação ambiental, evitando alimentá-los e melhorando a gestão do lixo urbano.',
    vaca:  'As vacas estão tão presentes na vida humana que é fácil esquecer o quanto esses animais são importantes. Foram domesticadas há cerca de 10 mil anos e, até hoje, ainda utilizamos seu leite, carne e couro no cotidiano. São animais herbívoros pastadores e pertencem ao grupo dos ruminantes, como as cabras, ovelhas, girafas e outros. Apesar do preconceito de acharmos que são animais lentos e com pouca cognição, estudos mostraram que as vacas são extremamente inteligentes e sociais, conseguindo até mesmo decorar nossos rostos.',
  };

    const curiositiesMap: Record<string, string> = {
    cabra: 'As cabras conseguem escalar superfícies íngremes com facilidade, até mesmo árvores e encostas rochosas, além de emitirem uma variedade de sons (os “bêêês”) para expressar emoções, chamar filhotes ou alertar sobre perigos. Estudos também indicam que seus sons podem variar regionalmente, quase como “sotaques”. ',
    gato: 'Gatos possuem uma excelente noção de orientação, e casos de felinos que retornam para casa após se perderem a longas distâncias são bem documentados.',
    lagarto: 'Quando se sentem ameaçados, os lagartos podem soltar a própria cauda para distrair o predador e escapar. Depois de um tempo, ela consegue se regenerar.',
    cavalo: 'Estudos mostraram que os cavalos têm excelente memória visual e conseguem reconhecer expressões faciais humanas, ou seja, eles lembram se uma pessoa foi gentil ou rude com eles, mesmo dias depois do encontro. Isso indica um nível de cognição social surpreendente, parecido com o de cães e alguns primatas.',
    ema: 'Cuidado parental invertido! Uma das curiosidades mais incríveis da ema está na sua reprodução: quem choca os ovos e cuida dos filhotes é o macho. Após o acasalamento, o macho reúne os ovos de várias fêmeas em um mesmo ninho, até 50 ovos, e passa cerca de 40 dias incubando. Quando nascem, o pai ainda passa alguns meses ensinando tudo o que seus filhotes precisam saber para sobreviverem sozinhos.',
    gamba: 'Os gambás são marsupiais, assim como os cangurus. Ou seja, sua placenta é insuficiente para permitir o desenvolvimento completo dos filhotes durante a gestação. Por isso, os filhotes nascem prematuros e passam um tempo dentro de uma bolsa para completar esse processo. Lembra da bolsa do canguru? Ela se chama marsúpio, assim como nos gambás!',    
iguana: 'As iguanas possuem um órgão sensorial acima de suas cabeças comumente chamado de terceiro olho. Esse órgão é o olho parietal e percebe variações de luz e ajuda a detectar predadores aéreos.',    
 pavao: 'Durante a época do acasalamento, o pavão abre a cauda em forma de leque, exibe os "olhos" das penas e vibra as penas para produzir um som ultrassônico que as fêmeas conseguem ouvir.',
    pombo:  'Uma característica impressionante é a sua capacidade de navegação: pombos conseguem se orientar por campos magnéticos, pela posição do Sol e até por odores no ar. Por isso, sempre foram muito utilizados como mensageiros ao longo da história.',
    vaca:  'As vacas possuem um estômago com quatro compartimentos. Esse sistema permite que elas fermentem e reaproveitem os alimentos, facilitando a digestão completa e a extração de nutrientes, o que as torna ruminantes eficientes.'
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
