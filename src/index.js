import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from 'react-oidc-context';
import './index.css';

const cognitoAuthConfig = {
  authority: "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_xNFuVanTz",
  client_id: "67ofutr22ug4bbklq6dd00elh9",
  // redirect_uri: "http://localhost:3000",
  // redirect_uri: "https://main.d2nt8ipaswef7v.amplifyapp.com/",
  redirect_uri: process.env.REACT_APP_REDIRECT_URL,
  response_type: "code",
  scope: "email openid phone",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
