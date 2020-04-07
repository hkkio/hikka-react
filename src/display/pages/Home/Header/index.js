import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import InfoIcon from '@material-ui/icons/Info';
import withWidth from '@material-ui/core/withWidth';

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
	const { drawerState, setDrawerState } = props;
	const classes = useStyles();
	let history = useHistory();

  	return (
  		<div className={classes.grow}>
  			<HideOnScroll {...props}>
		    	<AppBar position="fixed" color='transparent'>
				  	<Container>
						<Toolbar>
								<Hidden only="xs">
										<Button color="inherit" onClick={() => history.push('/')}>
											Головна
										</Button>
										<Button color="inherit">
											Про нас
										</Button>
										<div className={classes.grow} />
										<Button color="inherit" startIcon={<SearchIcon />} onClick={() => setDrawerState({...drawerState, status: true})}>
											Пошук
										</Button>
								</Hidden>
								<Hidden only={["md", "sm", "lg", "xl"]}>
									<IconButton edge="start" color="inherit" onClick={() => history.push('/')}>
								      <HomeIcon />
								    </IconButton>
								    <IconButton edge="start" color="inherit" onClick={() => setDrawerState({...drawerState, status: true})}>
								      <SearchIcon />
								    </IconButton>
								    <IconButton edge="start" color="inherit">
								      <InfoIcon />
								    </IconButton>
								</Hidden>
						</Toolbar>
					</Container>	
				</AppBar>
			</HideOnScroll>
		</div>
  	);
}

export { Header };
