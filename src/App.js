import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Layout from './components/layout';
import PageNotFound from './components/NotFoundDialog';
import MainPage from './containers/MainPage';

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
