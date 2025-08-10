import { useEffect } from 'react';

const GoogleSheetsData = ({ isAuthenticated, setData }) => {
  const SHEET_ID_1 = '1hCCNo_o8bk7IXva1KZt16FfTQX8m54FbQCxevjjNSt0';
  const SHEET_ID_2 = '1y6lTtqhdQOZSjoJViedVWD3hs9-F-jhgYfYAcp43UM0';
  const RANGE = 'Sheet2!A1:Z100';

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      const response1 = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID_1,
        range: RANGE,
      });

      const values1 = response1.result.values;
      if (!values1 || values1.length < 2) {
        console.error('Nenhum dado encontrado na primeira planilha.');
        return;
      }

      const headers1 = values1[0];
      const rows1 = values1.slice(1);
      const formattedData1 = rows1.map((row, index) => {
        const rowData = {};
        headers1.forEach((header, i) => {
          rowData[header] = row[i] || '';
        });
        return { key: `sheet1-${index}`, ...rowData };
      });

      const response2 = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID_2,
        range: RANGE,
      });
      console.log('response2:', response2);

      const values2 = response2.result.values;
      if (!values2 || values2.length < 2) {
        console.error('Nenhum dado encontrado na segunda planilha.');
        return;
      }

      const headers2 = values2[0];
      const rows2 = values2.slice(1);
      const formattedData2 = rows2.map((row, index) => {
        const rowData = {};
        headers2.forEach((header, i) => {
          rowData[header] = row[i] || '';
        });
        return { key: `sheet2-${index}`, ...rowData };
      });

      const combinedData = {
        sheet1: formattedData1,
        sheet2: formattedData2,
      };

      // console.log('Dados combinados:', combinedData);
      setData(combinedData);
    } catch (err) {
      console.error('Erro ao buscar dados:', err.message);
    }
  };

  return null;
};

export default GoogleSheetsData;