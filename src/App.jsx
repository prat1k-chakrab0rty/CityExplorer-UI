import { useState } from 'react'
import './App.css'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { loginRequest } from './authConfig'

function App() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [cities, setCities] = useState([])

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  }
  const handleLogout = () => {
    instance.logoutRedirect();
  }

  const callApi = async () => {
    try {
      const account = instance.getActiveAccount();
      if (!account) throw new Error("No account");
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account
      });
      const token = response.accessToken;
      const res = await fetch("https://cityexplorer-api-erczcnahbwfeeubm.canadacentral-01.azurewebsites.net/api/City", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setCities(data);
    } catch (error) {
      console.error("API call failed", error);
    }
  }

  return (
    <>
      <h2>Azure AD for you...</h2>
      <h1>City Explorer</h1>
      {!isAuthenticated?(
        <button onClick={handleLogin}>Login</button>
      ):(
        <>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={callApi}>Load Cities</button>
          <ul>
            {cities.map(city => <li key={city}>{city}</li>)}
          </ul>
        </>
      )}
    </>
  )
}

export default App
