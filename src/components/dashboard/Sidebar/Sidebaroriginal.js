'use client'
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  ControlOutlined,
  BuildOutlined,
  DashboardOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useTheme } from 'next-themes';

const Sidebar = ({ setSelectedMenu }) => {
  const { theme } = useTheme();
  const items = [
    {
      key: 'h4hinsurance',
      icon: <AppstoreOutlined />,
      label: 'H4hinsurance',
      children: [
        { key: 'h4h-dashboard', label: 'Dashboard', icon: <DashboardOutlined /> },
        { key: 'h4h-customers', label: 'Customers List', icon: <UserOutlined /> },
      ],
    },
    {
      key: 'qualityoflife',
      icon: <BuildOutlined />,
      label: 'Quality of Life',
      children: [
        { key: 'qol-dashboard', label: 'Dashboard', icon: <DashboardOutlined /> },
        { key: 'qol-customers', label: 'Customers List', icon: <UserOutlined /> },
      ],
    },
      {
        key: 'settings',
        icon: <ControlOutlined />,
        label: 'Settings',

    },
    {
      key: 'User Account',
      icon: <UserOutlined />,
      label: 'User Account',

    },
  ];

  return (
    <div
      style={{
        height: '100vh',
        background: theme === "dark" ? "#333" : "#fff", // Fundo escuro no modo dark e claro no modo light
        color: theme === "dark" ? "#fff" : "#000",
        fontFamily: 'Poppins, sans-serif', // Alterado para Poppins
      }}
    >
      {/* Logo no topo da sidebar */}
      <div
        style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <img
          src="/images/EhgCorpLogo.png" // Substitua pelo caminho do seu logo
          alt="Logo"
          style={{ maxHeight: '50px', maxWidth: '80%' }}
        />
      </div>
      {/* Menu */}
      <Menu
        theme={theme}
        mode="inline"
        items={items}
        onClick={(e) => {
          console.log('Menu selecionado:', e.key);
          setSelectedMenu(e.key);
        }}
        style={{
          background: theme === "dark" ? "#333" : "#fff", // Fundo escuro no modo dark e claro no modo light
          color: theme === "dark" ? "#fff" : "#000",  
          border: 'none',
          fontFamily: 'Poppins, sans-serif', // Alterado para Poppins
        }}
      />
    </div>
  );
};

export default Sidebar;