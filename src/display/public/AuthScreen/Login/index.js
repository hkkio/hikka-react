import React, { useState, useEffect } from "react";
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { isWidthUp } from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Redirect } from "react-router-dom";
import { useSnackbar } from 'notistack';

import CloseIcon from '@material-ui/icons/Close';

import { useSelector, useDispatch } from 'react-redux';
import { ApplicationActionCreators } from "../../../../state/action";

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
}));

const Login = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const loginUserStatus = useSelector(state => state.application.loginUser);
	const { enqueueSnackbar } = useSnackbar();

	let history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		if (loginUserStatus == 1) {
			enqueueSnackbar('Щось пішло не так.', { variant: 'error' });
		}

		if (loginUserStatus == 2) {
			dispatch(ApplicationActionCreators.resetStatuses());
	      	return <Redirect to="/" />;
	    }
	}, [loginUserStatus]);

    const openSignupPage = () => {
        history.push('/join');
        dispatch(ApplicationActionCreators.resetStatuses());
    }

    const login = (e) => {
    	e.preventDefault();
		dispatch(ApplicationActionCreators.loginUser({email, password}));
	}

	return (
		<form autoComplete="off" onSubmit={(e) => login(e)}>
			<Grid container direction="column">
				<Grid>
					<Typography component="h2" variant="h5" style={{fontWeight: 600}} align="center">Авторизація</Typography>
				</Grid>
				<Grid>
					<TextField error={loginUserStatus == 1} helperText="Мусить містити валідну email адресу" required label="Email" margin="normal" type="email" fullWidth value={email} onChange={(event) => setEmail(event.target.value)} />
				</Grid>
				<Grid>
					<TextField error={loginUserStatus == 1} helperText="Мінімальна довжина 16 символів" required label="Пароль" margin="normal" type="password" fullWidth value={password} onChange={(event) => setPassword(event.target.value)} />
				</Grid>
				<Grid>
					<Button variant="contained" fullWidth type="submit" color="primary" style={{marginTop: 30, marginBottom: 10}}>
						Ввійти
					</Button>
				</Grid>
				<Grid>
					<Button variant="text" fullWidth color="primary" onClick={() => openSignupPage()}>
						Зареєстуватись
					</Button>
				</Grid>
			</Grid>
		</form>
	);
}

export { Login };
