'use client';

import SheetDataComponent from '@/app/sheets2/page';
import { useSelector } from 'react-redux';
// Importe outros componentes que você quer renderizar condicionalmente
// import DashboardComponent from '@/components/Dashboard';
// import SettingsComponent from '@/components/Settings';

const ContentRenderer = () => {
  const selectedMenu = useSelector((state) => state.menu.selectedMenu);

  if (!selectedMenu) {
    return <p>Selecione um item no menu para ver os dados.</p>;
  }

  switch (selectedMenu) {
    case 'CustomersList':
      return <SheetDataComponent />;
    // case 'alldashboards':
    //   return <DashboardComponent />;
    // case 'settings':
    //   return <SettingsComponent />;
    default:
      return <p>Conteúdo não disponível para: {selectedMenu}</p>;
  }
};

export default ContentRenderer;
