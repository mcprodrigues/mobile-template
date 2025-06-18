import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface PokemonDetailsProps {
  name: string;
  description: string;
  image: any;
  bgColor: string;  
  bgCard: string;  
}

export default function PokemonDetails({
  bgColor,
  bgCard,
  name,
  description,
  image,
}: PokemonDetailsProps) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgCard }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Cabeçalho colorido */}
        <View
          style={{
            backgroundColor: bgColor,
            borderBottomLeftRadius: 80,
            borderBottomRightRadius: 80,
            paddingTop: 64,
            paddingBottom: 24,
            alignItems: 'center',
            paddingHorizontal: 16,
          }}
        >
          <Image source={image} style={{ width: 160, height: 160 }} resizeMode="contain" />
        </View>

        {/* Conteúdo abaixo */}
        <View style={{ paddingHorizontal: 24, marginTop: 16 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#000' }}>{name}</Text>
          <Text style={{ fontSize: 14, color: '#555', marginTop: 8 }}>{description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
