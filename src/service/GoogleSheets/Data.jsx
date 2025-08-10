import { useEffect } from 'react';

const dbData = ({ session, setData }) => {
  useEffect(() => {
    if (!session) fetchData();  // Verifica se a session está ausente (não autenticado)
  }, [session]);  // Reexecuta o efeito toda vez que a session mudar

  const fetchData = async () => {
    try {
      // Obtendo os dados do backend Django
      const data = await fetchSheetsData();
      
      if (!data || data.length === 0) {
        console.error('Nenhum dado encontrado.');
        return;
      }

      // Processa os dados recebidos, ajustando conforme necessário
      setData({ sheet1: data }); // Ajuste a estrutura conforme os dados que você recebe do backend
    } catch (err) {
      console.error('Erro ao buscar dados:', err.message);
    }
  };

  return null;
};

export default dbData;
