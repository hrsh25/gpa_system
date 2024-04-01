import React from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import LoginPage from './LoginPage';
import HomeComponent from './HomeComponent';
import TransactionsComponent from './Transactions';
import AccountTransactionsComponent from './AccountTransactions';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const AuthenticatedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Redirect to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage/>
            {/* {!authToken ? <LoginPage onLoginSuccess={handleLoginSuccess} /> : <Redirect to="/" />} */}
          </Route>
          <Route exact path="/">
            <AuthenticatedRoute>
                <HomeComponent />
            </AuthenticatedRoute>
            {/* {authToken ? <HomeComponent authToken={authToken} username={username} /> : <Redirect to="/login" />} */}
          </Route>
          <Route path="/all-transactions">
            <AuthenticatedRoute>
              <TransactionsComponent />
            </AuthenticatedRoute>
            {/* {authToken ? <TransactionsComponent authToken={authToken} username={username} /> : <Redirect to="/login" />} */}
          </Route>
          <Route path="/transactions/:accountId">
            <AuthenticatedRoute>
              <AccountTransactionsComponent />
            </AuthenticatedRoute>
            {/* {authToken ? <AccountTransactionsComponent authToken={authToken} username={username}/> : <Redirect to="/login" />} */}
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
