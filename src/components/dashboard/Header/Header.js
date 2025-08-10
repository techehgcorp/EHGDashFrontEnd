'use client';

import { Dropdown, Avatar, Badge } from 'antd';
import { BellOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import GoogleAuth from '@/components/auth/GoogleOAuth/GoogleOAuth';
import SearchBar from '../SearchBar/searchBar';
import { useTheme } from 'next-themes';
import ThemeSwitch from '@/components/Themes/ThemeSwitch';

const Header = ({ session }) => {
  const { theme } = useTheme(); // Usando o hook do next-themes para controlar o tema

  const userMenu = {
    items: [
      { key: 'profile', label: <a href="/profile">Profile</a> },
      {
        key: 'signout',
        label: !session ? (
          <GoogleAuth /> // Mostra o botão de login se não houver sessão
        ) : (
          <a href="/api/auth/signout">Sign Out</a> // Mostra opção de logout se houver sessão
        ),
      },
    ],
  };

  const handleSearch = (value) => {
    console.log('Search value:', value); // Pode integrar a lógica de busca aqui!
  };

  return (
    <header
      style={{
        background: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Lado esquerdo: Ícones de notificação e mensagem */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Badge count={5}>
          <BellOutlined
            style={{
              background: theme === 'dark' ? '#333' : '#fff',
              color: theme === 'dark' ? '#fff' : '#000',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          />
        </Badge>
        <Badge count={2}>
          <MessageOutlined
            style={{
              background: theme === 'dark' ? '#333' : '#fff',
              color: theme === 'dark' ? '#fff' : '#000',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          />
        </Badge>
      </div>

      {/* Meio: Barra de pesquisa */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <SearchBar placeholder="Search for something..." onSearch={handleSearch} />
      </div>

      {/* Lado direito: Ícone Day/Night e Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Avatar e menu dropdown */}
        <Dropdown menu={userMenu} placement="bottomRight" arrow>
          <Avatar size="large" icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
        </Dropdown>
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Header;