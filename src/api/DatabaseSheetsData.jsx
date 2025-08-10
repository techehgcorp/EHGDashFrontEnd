import { useEffect } from 'react';
import { fetchSheetsData } from './fetchSheetsData';

const DatabaseSheetsData = ({ isAuthenticated, setData }) => {
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllCompanyData();
    }
  }, [isAuthenticated]);

  const fetchAllCompanyData = async () => {
    try {
      const data = await fetchSheetsData();

      const groupedByCompany = data.reduce((acc, item) => {
        const company = item.company || 'unknown';
        if (!acc[company]) acc[company] = [];
        acc[company].push(item);
        return acc;
      }, {});

      setData(groupedByCompany);
    } catch (err) {
      console.error('Erro ao buscar dados do banco:', err.message);
    }
  };

  return null;
};

export default DatabaseSheetsData;
