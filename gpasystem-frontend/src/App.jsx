import React, { useState } from 'react';
import AuthContext from './AuthContext';
import LoginPage from './LoginPage';
import HomeComponent from './HomeComponent';
import TransactionsComponent from './Transactions';
import AccountTransactionsComponent from './AccountTransactions';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const App = () => {
  const [authToken, setAuthToken] = useState(null);
  const [username, setUsername] = useState('');

  const handleLoginSuccess = (tokenData, username) => {
    setAuthToken(tokenData);
    setUsername(username);
    localStorage.setItem('authToken', JSON.stringify(tokenData));
    };

  return (
    <AuthContext.Provider value={{authToken}}>
      <Router>
        <Switch>
          <Route path="/login">
            {!authToken ? <LoginPage onLoginSuccess={handleLoginSuccess} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/">
            {authToken ? <HomeComponent authToken={authToken} username={username} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/all-transactions">
            {authToken ? <TransactionsComponent authToken={authToken} username={username} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/transactions/:accountId">
            {authToken ? <AccountTransactionsComponent authToken={authToken} username={username}/> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
