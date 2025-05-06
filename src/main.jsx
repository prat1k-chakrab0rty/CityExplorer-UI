import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MsalProvider } from '@azure/msal-react'
import { PublicClientApplication } from '@azure/msal-browser'
import { msalConfig } from './authConfig.js'

const msalInstance = new PublicClientApplication(msalConfig);

async function main() {
  await msalInstance.initialize();
  msalInstance.handleRedirectPromise().then(res => {
    if (res !== null) {
      console.log(res.account);
      msalInstance.setActiveAccount(res.account);
    }
    else {
      const currentAccount = msalInstance.getAllAccounts();
      if (currentAccount.length === 1) {
        console.log(currentAccount);
        msalInstance.setActiveAccount(currentAccount[0]);
      }
    }
  });
}


createRoot(document.getElementById('root')).render(
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>
);
main();
