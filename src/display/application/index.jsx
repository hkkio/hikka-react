import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {
	HomeScreen,
	PlayerScreen,
	AuthScreen,
	CreateAnimeScreen,
	ErrorScreen,
} from "../pages";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
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

const PublicRoute = ({ children, isAuthenticated, ...rest }) => {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				!isAuthenticated ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/",
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

	// useEffect(initialize, []);

	// function initialize() {
	// 	if (application.isAuthenticated) {
	// 		dispatch(ApplicationActionCreators.getInfo());
	// 	}
	// }

	return (
		<SnackbarProvider maxSnack={3} anchorOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Switch>
						<PrivateRoute isAuthenticated={application.isAuthenticated} path="/" exact>
							<HomeScreen />
						</PrivateRoute>
						<PrivateRoute isAuthenticated={application.isAuthenticated} path="/anime/create" exact>
							<CreateAnimeScreen />
						</PrivateRoute>
						<PrivateRoute isAuthenticated={application.isAuthenticated} path="/anime/:slug" exact>
							<HomeScreen />
						</PrivateRoute>
						<PrivateRoute isAuthenticated={application.isAuthenticated} path="/anime/:slug/watch/:episode" exact>
							<PlayerScreen />
						</PrivateRoute>
						<PublicRoute isAuthenticated={application.isAuthenticated} path="/login" exact>
							<AuthScreen page="login" />
						</PublicRoute>
						<PublicRoute isAuthenticated={application.isAuthenticated} path="/join" exact>
							<AuthScreen page="join" />
						</PublicRoute>
						<Route path="/404" exact>
							<ErrorScreen />
						</Route>
		
					</Switch>
				</ThemeProvider>
			</BrowserRouter>
		</SnackbarProvider>
	);
}

Application.propTypes = {
};

export default Application;
