'use client';

import { Layout, Breadcrumb } from 'antd';
import { useState, useEffect } from 'react';
import Header from '@/components/dashboard/Header/Header';
import Sidebar from '@/components/dashboard/Sidebar/Sidebar';
import Footer from '@/components/dashboard/Footer/Footer';
import CustomerTable from '@/components/dashboard/CustomerTable/CustomerTable';
import GoogleSheetsData from '@/service/GoogleSheets/GoogleSheetsData';
import DashboardGraphs from '@/components/dashboard/DashboardGraphs';
import LineChartComponent from '@/components/dashboard/cards/LineChart';
import '@ant-design/v5-patch-for-react-19';
import Providers from '@/components/Themes/Provider';
import Loader from '@/components/Loader/Loader';
import { auth } from '@/auth';

const { Content, Sider } = Layout;

const DashboardPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('h4h-dashboard');
  const [session, setSession] = useState(null); // Substituímos isAuthenticated por session
  const [data, setData] = useState({ sheet1: [], sheet2: [] });

  // Buscar a sessão ao montar o componente
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await auth(); // Chama a função auth
        setSession(sessionData);
        if (!sessionData) setData({ sheet1: [], sheet2: [] }); // Resetar dados se não houver sessão
      } catch (error) {
        console.error('Erro ao buscar sessão:', error);
        setSession(null);
        setData({ sheet1: [], sheet2: [] });
      }
    };
    fetchSession();
  }, []);

  const handleDataUpdate = (newData) => {
    console.log('Dados recebidos do GoogleSheetsData:', newData);
    setData(newData);
  };

  const getRelevantData = () => {
    return selectedMenu.includes('h4h') ? data.sheet1 || [] : data.sheet2 || [];
  };

  // Função para mapear os dados das planilhas
  const mapSheetData = (sheetData, sheetName) => {
    if (!Array.isArray(sheetData) || sheetData.length === 0) {
      console.log(`Nenhum dado na planilha ${sheetName}`);
      return [];
    }

    return sheetData.map((row) => {
      const zip = row['Zip']?.trim();
      const signupDate = sheetName.includes('h4h') ? row['Date Time'] : row['birth'];
      const firstName = sheetName.includes('h4h') ? row['First Name'] : row['firstname'];
      const lastName = sheetName.includes('h4h') ? row['Last Name'] : row['lastname'];

      console.log(`Linha mapeada (${sheetName}):`, { zip, signupDate, firstName, lastName });

      return {
        zip: zip || 'Unknown',
        signupDate,
        firstName,
        lastName,
      };
    });
  };

  // Função para processar os dados mapeados
  const processSheetData = (mappedData) => {
    if (!Array.isArray(mappedData)) {
      console.error('mappedData não é um array:', mappedData);
      return { customersAddedData: [], zipCodeDistributionData: [] };
    }

    const customersAddedData = [
      ...mappedData.reduce((acc, curr) => {
        const dateStr = curr.signupDate || '';
        const date = new Date(dateStr);

        if (isNaN(date.getTime())) return acc;

        const year = date.getFullYear().toString();
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate().toString().padStart(2, '0');

        acc.set(year, acc.get(year) || { period: year, count: 0 });
        acc.get(year).count += 1;

        acc.set(month, acc.get(month) || { period: month, count: 0 });
        acc.get(month).count += 1;

        acc.set(day, acc.get(day) || { period: day, count: 0 });
        acc.get(day).count += 1;

        return acc;
      }, new Map()).values(),
    ];

    const zipCodeDistributionData = mappedData.reduce((acc, curr) => {
      const zipcode = curr.zip ? String(curr.zip).trim() : 'Unknown';
      if (!zipcode || zipcode === '') return acc;

      console.log(`ZIP Code encontrado: ${zipcode}`);

      const existing = acc.find((item) => item.zipcode === zipcode);
      if (existing) {
        existing.value += 1;
      } else {
        acc.push({ zipcode, value: 1 });
      }
      return acc;
    }, []);

    console.log('ZipCodeDistributionData:', zipCodeDistributionData);
    return { customersAddedData, zipCodeDistributionData };
  };

  // Função para renderizar o conteúdo baseado no menu selecionado
  const renderContent = () => {
    // Verificar se a sessão ainda está carregando ou não existe
    if (session === null) return <p>Carregando sessão...</p>;
    if (!session) return <p>Por favor, faça login para ver o conteúdo.</p>;

    const relevantData = getRelevantData();
    console.log('Dados brutos:', relevantData);

    const mappedData = mapSheetData(relevantData, selectedMenu.includes('h4h') ? 'h4h' : 'qol');
    const processedData = processSheetData(mappedData);
    const lineChartData = processedData.customersAddedData;

    switch (selectedMenu) {
      case 'h4h-customers':
        return <CustomerTable data={data.sheet1} isAuthenticated={!!session} />;
      case 'h4h-dashboard':
        return (
          <>
            <DashboardGraphs
              totalCustomers={data.sheet1.length}
              customersAddedData={processedData.customersAddedData}
              zipCodeDistributionData={processedData.zipCodeDistributionData}
            />
            <LineChartComponent data={lineChartData} />
          </>
        );
      case 'qol-customers':
        return <CustomerTable data={data.sheet2} isAuthenticated={!!session} />;
      case 'qol-dashboard':
        return (
          <>
            <DashboardGraphs
              totalCustomers={data.sheet2.length}
              customersAddedData={processedData.customersAddedData}
              zipCodeDistributionData={processedData.zipCodeDistributionData}
            />
            <LineChartComponent data={lineChartData} />
          </>
        );
      default:
        return <h3>Welcome to H4H Insurance Dashboard!</h3>;
    }
  };

  return (
    <Loader>
      <Providers>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider style={{ backgroundColor: '#fff' }}>
            <Sidebar setSelectedMenu={setSelectedMenu} />
          </Sider>
          <Layout>
            <Header /> {/* Removido onAuthChange, pois a sessão é gerenciada pelo useEffect */}
            <div style={{ padding: '0 48px' }}>
              <Breadcrumb
                style={{ margin: '16px 0' }}
                items={[
                  { title: 'Home' },
                  {
                    title: selectedMenu.includes('dashboard') ? 'Dashboard' : 'Customer List',
                  },
                ]}
              />
            </div>
            <GoogleSheetsData
              isAuthenticated={!!session} // Converte session para booleano
              setData={handleDataUpdate}
            />
            <Content>{renderContent()}</Content>
            <Footer />
          </Layout>
        </Layout>
      </Providers>
    </Loader>
  );
};

export default DashboardPage;