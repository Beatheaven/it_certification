/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Loading } from 'components/atoms';
import { AppRoutes, PublicRoutes, UnauthorizedRoutes } from 'config/routes';

function App() {
  const dispatch = useDispatch();
  //const token = 'token' in localStorage;

  /*useEffect(() => {
    if (!token) return;
    const initialActions = [
      'user/GET_CURRENT_USER',
      'user/GET_CHECKPOINT',
      'user/GET_PROGRESS'
    ];
    Promise.all(
      initialActions.map(
        (type) => new Promise((resolve) => resolve(dispatch({ type })))
      )
    );
  }, [dispatch]);*/

  return (
    <Router>
      <Suspense fallback={<Loading loading />}>
        <Switch>
          {AppRoutes.map((route) => {
            const { component: Component, id, path, exact } = route;
            return (
              <Route
                key={id}
                path={path}
                exact={exact}
                render={(props) =>
                  <Component {...props} />
                }
              />
            );
          })}

          {UnauthorizedRoutes.map((route) => {
            const { component: Component, id, path, exact } = route;
            return (
              <Route
                key={id}
                path={path}
                exact={exact}
                render={(props) =>
                  <Component {...props} />}
              />
            );
          })}

          {PublicRoutes.map((route) => (
            <Route key={route.id} {...route} />
          ))}

          <Redirect from="/dashboard" to="/" />
          <Redirect from="*" to="/error-404" />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
