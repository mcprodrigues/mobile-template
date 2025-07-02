import { useQuery } from '@tanstack/react-query';

export function useUserCaptures(userId: string, token: string) {
  return useQuery({
    queryKey: ['userCaptures', userId],
    queryFn: async () => {
      const res = await fetch(
        `https://pokedex-back-end-production-9709.up.railway.app/captures/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Resposta inesperada');
      return data;
    },
    enabled: !!userId && !!token, 
  });
}
