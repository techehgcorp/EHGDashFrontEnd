'use client';
import { Menu } from 'antd';
import { useDispatch } from 'react-redux';
import { setSelectedMenu } from '@/redux/menuSlice/menuSlice';
import {
  AppstoreOutlined,
  ControlOutlined,
  BuildOutlined,
  DashboardOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useTheme } from 'next-themes';

const Sidebar = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const items = [
    {
        key: 'alldashboards',
        icon: <AppstoreOutlined />,
        label: 'Dashboard',
      },
    {
        key: 'CustomersList',
        icon: <AppstoreOutlined />,
        label: 'CustomersList',
      },
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
        background: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
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
          src="/images/EhgCorpLogo.png"
          alt="Logo"
          style={{ maxHeight: '50px', maxWidth: '80%' }}
        />
      </div>
      <Menu
        theme={theme}
        mode="inline"
        items={items}
        onClick={(e) => {
          console.log('Item selecionado:', e.key); // <-- AQUI!
          dispatch(setSelectedMenu(e.key));
          }}
          style={{
          background: theme === 'dark' ? '#333' : '#fff',
          color: theme === 'dark' ? '#fff' : '#000',
          border: 'none',
          fontFamily: 'Poppins, sans-serif',
        }}
      />
    </div>
  );
};

export default Sidebar;
