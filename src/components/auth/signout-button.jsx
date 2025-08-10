// src/components/auth/signout-button.jsx
'use client';

import { signOut } from 'next-auth/react';

const Signout = () => {
  const handleSignOut = async () => {
    // Requisição ao backend para invalidar o refresh_token
    try {
      await fetch(`${process.env.DJANGO_API_URL}/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Garante que os cookies HttpOnly sejam incluídos
      });

      // Logout com NextAuth (que também limpa os cookies de sessão)
      await signOut({ redirect: false });

      // Redireciona o usuário para a página inicial
      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  );
};

export default Signout;
