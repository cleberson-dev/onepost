import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Container, ContentArea } from './App.styles';

import Header from './components/Header';

import { getSessionUser } from './store/user/actions';

import HomePage from './pages/Home';
import WordsPage from './pages/Words';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

const App: React.FC = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getSessionUser());
  });

  return (
    <Container>
      <Router>
        <Header />
        <ContentArea>
          <Switch>
            <Route exact path="/" children={<HomePage />} />
            <Route path="/login" children={<LoginPage />} />
            <Route path="/register" children={<RegisterPage />} />
            <Route path="/words" children={<WordsPage />} />
          </Switch>
        </ContentArea>
      </Router>
    </Container>
  );
}

export default App;
