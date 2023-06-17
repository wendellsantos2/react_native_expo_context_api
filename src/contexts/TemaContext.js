import { createContext, useEffect, useState } from 'react';
import { escuro, claro } from '../estilosGlobais';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TemaContext = createContext({});

export function TemaProvider({ children }) {
  const [temaAtual, setTemaAtual] = useState('escuro');

  const temas = {
    escuro: escuro,
    claro: claro
  };

  useEffect(() => {
    async function carregarTemaSalvo() {
      try {
        const temaSalvo = await AsyncStorage.getItem('@tema');
        if (temaSalvo) {
          setTemaAtual(temaSalvo);
        }
      } catch (error) {
        console.error('Erro ao carregar tema:', error);
      }
    }

    carregarTemaSalvo();
  }, []);

  async function salvarTemaNoDispositivo(tema) {
    try {
      await AsyncStorage.setItem('@tema', tema);
      setTemaAtual(tema);
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  }

  return (
    <TemaContext.Provider
      value={{
        temaAtual,
        setTemaAtual,
        temaEscolhido: temas[temaAtual],
        salvarTemaNoDispositivo
      }}
    >
      {children}
    </TemaContext.Provider>
  );
}
