import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {
	Home,
	Auth,
	ErrorComponent,
} from "../pages";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import { ApplicationActionCreators } from "../../state/action";

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const Application = () => {
	const application = useSelector(state => state.application);
	const dispatch = useDispatch();

	useEffect(initialize, []);

	function initialize() {
		dispatch(ApplicationActionCreators.initializeApplication());
		
		if (application.isInitialized) {
			dispatch(ApplicationActionCreators.getInfo());
		}
	}

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Switch>
					<PrivateRoute isAuthenticated={application.isAuthenticated} path="/" exact>
						<Home />
					</PrivateRoute>
					<PrivateRoute isAuthenticated={application.isAuthenticated} path="/anime/:slug" exact>
						<Home />
					</PrivateRoute>
					<Route path="/login" exact>
						<Auth />
					</Route>
				</Switch>
			</ThemeProvider>
		</BrowserRouter>
	);
}

Application.propTypes = {
};

export default Application;
