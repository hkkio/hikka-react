import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import withWidth from '@material-ui/core/withWidth';

import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import InfoIcon from '@material-ui/icons/Info';

import Logo from '../../../../data/logo.svg';

import { useDispatch } from 'react-redux';
import { ApplicationActionCreators } from "../../../../state/action";

const useStyles = makeStyles({
	grow: {
		flexGrow: 1,
	}
});

function HideOnScroll(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({ target: window ? window() : undefined });

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

const Header = (props) => {
	const { drawerState, setDrawerState, goToMain } = props;
	const [anchorEl, setAnchorEl] = React.useState(null);
	const isMenuOpen = Boolean(anchorEl);
	const classes = useStyles();
	const dispatch = useDispatch();
	let history = useHistory();

	const handleProfileMenuOpen = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		handleMenuClose();

		dispatch(ApplicationActionCreators.logoutUser());
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Профіль</MenuItem>
			<MenuItem onClick={handleLogout}>Вихід</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<HideOnScroll {...props}>
				<AppBar position="fixed" color='inherit'>
					<Container>
						<Toolbar>
							<Hidden only="xs">
								<Button color="inherit" onClick={goToMain}>
									<img src={Logo} width="75%" />
								</Button>
								<Button color="inherit">
									Про нас
								</Button>
								<div className={classes.grow} />
								<Button color="inherit" startIcon={<SearchIcon />} onClick={() => setDrawerState({...drawerState, status: true})}>
									Пошук
								</Button>
								<IconButton
									edge="end"
									aria-label="account of current user"
									aria-controls={menuId}
									aria-haspopup="true"
									onClick={handleProfileMenuOpen}
									color="inherit"
								>
									<AccountCircle />
								</IconButton>
							</Hidden>
							<Hidden only={["md", "sm", "lg", "xl"]}>
								<IconButton edge="start" color="inherit" onClick={() => history.push('/')}>
									<img src={Logo} width="75%" />
								</IconButton>
								<IconButton edge="start" color="inherit">
									<InfoIcon />
								</IconButton>
								<div className={classes.grow} />
								<IconButton edge="start" color="inherit" onClick={() => setDrawerState({...drawerState, status: true})}>
									<SearchIcon />
								</IconButton>
								
								<IconButton
									edge="end"
									aria-label="account of current user"
									aria-controls={menuId}
									aria-haspopup="true"
									onClick={handleProfileMenuOpen}
									color="inherit"
								>
									<AccountCircle />
								</IconButton>
							</Hidden>
						</Toolbar>
					</Container>	
				</AppBar>
			</HideOnScroll>
			{renderMenu}
		</div>
	);
}

export { Header };
