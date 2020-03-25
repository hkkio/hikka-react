import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
	Home,
	ErrorComponent,
} from "../pages";
import { Header, Footer, Drawer } from "../components";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import { ApplicationActionCreators } from "../../state/action";

const Application = () => {
	const application = useSelector(state => state.application);
	const dispatch = useDispatch();

	useEffect(initialize, []);

	function initialize() {
		dispatch(ApplicationActionCreators.getInfo());
	}

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Header />
				<Switch>
					<Route
						path="/"
						render={data => <Home />}
						exact
					/>
					<Route
						path="/anime/:slug"
						render={data => <Home />}
						exact
					/>
					<Route component={ErrorComponent} />
				</Switch>
				<Footer />
			</ThemeProvider>
		</BrowserRouter>
	);
}

Application.propTypes = {
};

export default Application;
