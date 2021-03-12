import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  Redirect,
  MemoryRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import { Dashboard } from '../../src/pages';
import { configureStore, STORE_SCOPES } from '../../src/redux/store';
import { isDevelopment } from '../utils';
import './index.css';

const store = configureStore(STORE_SCOPES.RENDERER);
const app = (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/main_window" render={() => <Redirect to="/" />} />
        <Route exact path="/" component={Dashboard} />
      </Switch>
    </Router>
  </Provider>
);

(() => {
  render(app, document.getElementById('root'));
})();

if (isDevelopment && module.hot) {
  module.hot.accept();
}
