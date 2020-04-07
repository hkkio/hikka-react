import React, { useState } from "react";
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

	let history = useHistory();
	const dispatch = useDispatch();

    const openSignupPage = () => {
        history.push('/signup');
    }

    const login = (e) => {
    	e.preventDefault();
		dispatch(ApplicationActionCreators.loginUser({email, password}));
	}

	if (loginUserStatus == 2) {
      return <Redirect to="/" />;
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

const SignUp = ({setDrawerState}) => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordCheck, setPasswordCheck] = useState("");
	const [errors, setErrors] = useState({email: false, username: false, password: false, passwordCheck: false});

	const dispatch = useDispatch();

	const join = () => {
		if (email == "") {
			setErrors({...errors, email: true});
			return;
		}

		if (username == "") {
			setErrors({...errors, username: true});
			return;
		}

		if (password == "") {
			setErrors({...errors, password: true});
			return;
		}

		if (passwordCheck == "") {
			setErrors({...errors, passwordCheck: true});
			return;
		}

		if (password == passwordCheck) {
			dispatch(ApplicationActionCreators.joinUser({username, email, password}));

			setEmail("");
			setUsername("");
			setPassword("");
			setPasswordCheck("");
			setErrors({email: false, username: false, password: false, passwordCheck: false});

			return;
		}

		setErrors({...errors, passwordCheck: true});
		return;
	}

	return (
		<form autoComplete="off">
			<Grid container direction="column">
				<Grid>
					<Typography component="h2" variant="h5" style={{fontWeight: 600}} align="center">Реєстрація</Typography>
				</Grid>
				<Grid>
					<TextField error={errors.username} required label="Нікнейм" margin="normal" fullWidth value={username} onChange={(event) => setUsername(event.target.value)} />
				</Grid>
				<Grid>
					<TextField error={errors.email} required label="Email" margin="normal" type="email" fullWidth value={email} onChange={(event) => setEmail(event.target.value)} />
				</Grid>
				<Grid>
					<TextField error={errors.password} required label="Пароль" margin="normal" type="password" fullWidth value={password} onChange={(event) => setPassword(event.target.value)} />
				</Grid>
				<Grid>
					<TextField error={errors.passwordCheck} required label="Підтвердіть пароль" margin="normal" type="password" fullWidth value={passwordCheck} onChange={(event) => setPasswordCheck(event.target.value)} />
				</Grid>
				<Grid>
					<Button variant="outlined" fullWidth color="primary" style={{marginTop: 30, marginBottom: 10}} onClick={() => join()}>
						Зареєстуватись
					</Button>
				</Grid>
				<Grid>
					<Typography component="p" variant="subtitle1" align="center">Вже маєте акаунт? <Link onClick={() => setDrawerState({status: true, content: 1}) }>Увійти</Link></Typography>
				</Grid>
			</Grid>
		</form>
	);
}

export { Login };
