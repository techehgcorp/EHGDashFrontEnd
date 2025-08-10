'use client';

import { useState, useEffect } from 'react';

const GoogleAuth = ({ onAuthChange }) => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);

  useEffect(() => {
    const scriptGapi = document.createElement('script');
    scriptGapi.src = 'https://apis.google.com/js/api.js';
    scriptGapi.onload = () => gapi.load('client', initializeGapiClient);
    document.body.appendChild(scriptGapi);

    const scriptGis = document.createElement('script');
    scriptGis.src = 'https://accounts.google.com/gsi/client';
    scriptGis.onload = gisLoaded;
    document.body.appendChild(scriptGis);

    return () => {
      document.body.removeChild(scriptGapi);
      document.body.removeChild(scriptGis);
    };
  }, []);

  const initializeGapiClient = async () => {
    await gapi.client.init({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    });

    const storedToken = localStorage.getItem('google_token');
    if (storedToken) {
      gapi.client.setToken({ access_token: storedToken });
      setIsAuthenticated(true);
      onAuthChange(true);
    }
  };

  const gisLoaded = () => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (resp) => {
        if (resp.error) return;
        localStorage.setItem('google_token', resp.access_token);
        setIsAuthenticated(true);
        onAuthChange(true);
      },
    });
    setTokenClient(client);
  };

  const handleAuthClick = () => tokenClient.requestAccessToken({ prompt: 'consent' });

  const handleSignoutClick = () => {
    gapi.client.setToken(null);
    localStorage.removeItem('google_token');
    setIsAuthenticated(false);
    onAuthChange(false, null);
  };

  return (
    <button onClick={isAuthenticated ? handleSignoutClick : handleAuthClick}>
      {isAuthenticated ? 'Sign Out' : 'Sign In'}
    </button>
  );
};

export default GoogleAuth;
