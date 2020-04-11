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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

const SignUp = ({setDrawerState}) => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordCheck, setPasswordCheck] = useState("");
	const [passwordComparison, setPasswordComparison] = useState(true);
	const joinUserStatus = useSelector(state => state.application.joinUser);
	const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);

	let history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		if (joinUserStatus == 2) {
			setOpenSuccessDialog(true);
			setEmail("");
			setUsername("");
			setPassword("");
			setPasswordCheck("");
			setPasswordComparison(true);
		}
	}, [joinUserStatus]);

	const handleCloseSuccessDialog = () => {
		setOpenSuccessDialog(false);
		openLoginPage();
	};

	const openEmailService = () => {
		window.open(`https://${email.split("@")[1]}`, "_blank");
	}

	const openLoginPage = () => {
        history.push('/login');
        dispatch(ApplicationActionCreators.resetStatuses());
    }

	const join = (e) => {
		e.preventDefault();

		if (password == passwordCheck) {
			dispatch(ApplicationActionCreators.joinUser({username, email, password}));
		} else {
			setPasswordComparison(false);
		}
	}

	return (
		<div>
			<form autoComplete="off" onSubmit={(e) => join(e)}>
				<Grid container direction="column">
					<Grid>
						<Typography component="h2" variant="h5" style={{fontWeight: 600}} align="center">Реєстрація</Typography>
					</Grid>
					<Grid>
						<TextField error={joinUserStatus == 1} required helperText="Мінімальна довжина 3 символи" label="Нікнейм" margin="normal" fullWidth value={username} onChange={(event) => setUsername(event.target.value)} />
					</Grid>
					<Grid>
						<TextField error={joinUserStatus == 1} required helperText="Мусить містити валідну email адресу" label="Email" margin="normal" type="email" fullWidth value={email} onChange={(event) => setEmail(event.target.value)} />
					</Grid>
					<Grid>
						<TextField error={joinUserStatus == 1 || !passwordComparison} required helperText="Мінімальна довжина 16 символів" label="Пароль" margin="normal" type="password" fullWidth value={password} onChange={(event) => setPassword(event.target.value)} />
					</Grid>
					<Grid>
						<TextField error={joinUserStatus == 1 || !passwordComparison} required helperText="Мусить співпадати з паролем" label="Підтвердіть пароль" margin="normal" type="password" fullWidth value={passwordCheck} onChange={(event) => setPasswordCheck(event.target.value)} />
					</Grid>
					<Grid>
						<Button variant="contained" fullWidth type="submit" color="primary" style={{marginTop: 30, marginBottom: 10}}>
							Зареєстуватись
						</Button>
					</Grid>
					<Grid>
						<Button variant="text" fullWidth color="primary" onClick={() => openLoginPage()}>
							Ввійти
						</Button>
					</Grid>
				</Grid>
			</form>
			<Dialog
				open={openSuccessDialog}
				onClose={handleCloseSuccessDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
		    >
		        <DialogTitle id="alert-dialog-title">{"Реєстрація"}</DialogTitle>
		        <DialogContent>
		          <DialogContentText id="alert-dialog-description">
		            Вітаємо! Ви успішно зареєструвались. Щоб ввійти на сайт, необхідно активувати Ваш акаунт. На Вашу пошту відправлено лист з підтвердженням. Відкрийте посилання та насолоджуйтесь якісним контентом!
		          </DialogContentText>
		        </DialogContent>
		        <DialogActions>
					<Button onClick={openEmailService} color="primary">
						Відкрити пошту
					</Button>
					<Button onClick={handleCloseSuccessDialog} color="primary" autoFocus>
						Зрозуміло
					</Button>
		        </DialogActions>
		    </Dialog>
		</div>
	);
}

export { SignUp };
