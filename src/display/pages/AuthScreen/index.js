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
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import icon from '../../../data/icon.svg';
import { Login } from './Login';
import { SignUp } from './SignUp';

import { ApplicationActionCreators } from "../../../state/action";

const AuthScreen = ({page}) => {
	// const theme = useTheme();
 //  	const matches = useMediaQuery(theme.breakpoints.up('sm'));

  	return (
  		<Box textAlign="center" style={{height: "100vh", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundImage: "url(https://images3.alphacoders.com/782/thumb-1920-782991.jpg)"}}>
			<Box height="100%" width={{sm: "50%", md: "550px"}}>
				<Paper elevation={10} style={{height: "100%", padding: 20, paddingTop: 30 }}>
					<img src={icon}  style={{paddingBottom: 20}} />
					{page == "login" && <Login />}
					{page == "join" && <SignUp />}
				</Paper>
			</Box>
		</Box>
  	);
}

AuthScreen.propTypes = {

};

export { AuthScreen };