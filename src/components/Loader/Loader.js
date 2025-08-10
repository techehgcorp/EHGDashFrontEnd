// components/Loader.js
'use client';

import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';

const Loader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleCssLoad = () => {
      setTimeout(() => setIsLoading(false), 1000); // Ajustar o tempo conforme necessário
    };

    if (document.readyState === 'complete') {
      handleCssLoad();
    } else {
      window.addEventListener('load', handleCssLoad);
    }

    return () => {
      window.removeEventListener('load', handleCssLoad);
    };
  }, []);

  // Se estiver carregando, exibe o loader
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <Spin size="large" />
      </div>
    );
  }

  // Se não estiver mais carregando, renderiza os filhos (conteúdo da aplicação)
  return <>{children}</>;
};

export default Loader;
