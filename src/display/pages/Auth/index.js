import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import LinearProgress from '@material-ui/core/LinearProgress';



import icon from '../../../data/icon.svg';
import { Login } from './Login';

import { ApplicationActionCreators } from "../../../state/action";

const Auth = () => {
  	const dispatch = useDispatch();
  	const application = useSelector(state => state.application);

	useEffect(initialize, []);
	function initialize() {
		// dispatch(ApplicationActionCreators.loginUser)

	}

  	return (
  		<Box textAlign="center" style={{height: window.innerHeight, backgroundSize: "cover", backgroundPosition: "left", backgroundRepeat: "no-repeat", backgroundImage: "url(https://images3.alphacoders.com/782/thumb-1920-782991.jpg)"}}>
			<Hidden>
				<Paper elevation={10} style={{width: 550, height: "100%", padding: 20, paddingTop: 30 }}>
					<img src={icon}  style={{paddingBottom: 20}} />
					<Login />
				</Paper>
			</Hidden>
		</Box>
  	);
}

Auth.propTypes = {

};

export { Auth };