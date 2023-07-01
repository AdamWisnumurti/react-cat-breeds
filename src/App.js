import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Layout, PageNotFound } from './components';
import MainPage from './containers/main';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path={`/`}
          element={
            <Layout>
              <MainPage />
            </Layout>
          }
        />
        <Route
          path={`*`}
          element={
            <Layout>
              <PageNotFound />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
