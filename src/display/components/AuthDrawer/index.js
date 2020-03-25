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

import CloseIcon from '@material-ui/icons/Close';

import { useSelector, useDispatch } from 'react-redux';
import { ApplicationActionCreators } from "../../../state/action";

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
}));

const Login = ({setDrawerState}) => {
	return (
		<form noValidate autoComplete="off">
			<Grid container direction="column">
				<Grid>
					<Typography component="h2" variant="h5" style={{fontWeight: 600}} align="center">Вхід</Typography>
				</Grid>
				<Grid>
					<TextField required label="Email" margin="normal" fullWidth />
				</Grid>
				<Grid>
					<TextField required label="Пароль" margin="normal" fullWidth />
				</Grid>
				<Grid>
					<Button variant="outlined" fullWidth color="primary" style={{marginTop: 30, marginBottom: 10}}>
						Ввійти
					</Button>
				</Grid>
				<Grid>
					<Typography component="p" variant="subtitle1" align="center">Новий користвувач? <Link onClick={() => setDrawerState({status: true, content: 2}) }>Зареєстуватись</Link></Typography>
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

/*function Profile({setDrawerState}) {
	const classes = useStyles();

	return (
		<Grid container direction="column">
			<Grid>
				<Typography component="h2" variant="h5" style={{fontWeight: 600}} align="center">Профіль</Typography>
			</Grid>
			<Grid>
				<Box display="flex" flexDirection="column" alignItems="center" mt={4}>
					<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
					<Typography component="h3" variant="h6" align="center">olexh</Typography>
				</Box>
			</Grid>
		</Grid>
	);
}*/

const DrawerComponent = ({drawerState, setDrawerState, params}) => {
	return (
		<SwipeableDrawer anchor="right" open={drawerState.status} onClose={() => setDrawerState({status: false, content: 1})}>
			<div style={{padding: 20, paddingLeft: 30, paddingRight: 30, width: 500}}>
	   			<Grid container>
	   				<Grid item>
	   					<IconButton onClick={() => setDrawerState({status: false, content: 1})} edge="start" color="inherit">
					      	<CloseIcon />
					    </IconButton>
	   				</Grid>
	   			</Grid>
		    	{drawerState.content == 1 && <Login setDrawerState={setDrawerState} />}
		    	{drawerState.content == 2 && <SignUp setDrawerState={setDrawerState} />}
		    </div>
	    </SwipeableDrawer>
	);
}

export { DrawerComponent as AuthDrawer };
