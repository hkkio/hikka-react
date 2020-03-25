import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import InfoIcon from '@material-ui/icons/Info';
import withWidth from '@material-ui/core/withWidth';

import {
  SearchDrawer
} from "../";

const useStyles = makeStyles({
    nav: {
        flexGrow: 1,
    },
});

const Header = () => {
	const defaultSearchState = {status: false, query: "", genres: [], categories: [], teams: [], states: [], minYear: 0, maxYear: 0};
	const [ searchDrawerState, setSearchDrawerState ] = useState(defaultSearchState);
	const classes = useStyles();
	let history = useHistory();


  	return (
  		<div className={classes.nav}>
  			<SearchDrawer drawerState={searchDrawerState} setDrawerState={setSearchDrawerState} defaultState={defaultSearchState} />
	    	<AppBar position="fixed" style={{ background: 'rgba(0,0,0, 0.6)'}}>
			  	<Container>
					<Toolbar>
						<div style={{ flex: 1 }}>
							<Hidden only="xs">
									<Button color="inherit" onClick={() => history.push('/')}>
										Головна
									</Button>
									<Button color="inherit">
										Календар
									</Button>
									<Button color="inherit">
										Про нас
									</Button>
									<Button color="inherit" onClick={() => setSearchDrawerState({...searchDrawerState, status: true})}>
										Пошук
									</Button>
							</Hidden>
							<Hidden only={["md", "sm", "lg", "xl"]}>
								<IconButton edge="start" color="inherit">
							      <HomeIcon />
							    </IconButton>
							    <IconButton edge="start" color="inherit">
							      <CalendarTodayIcon />
							    </IconButton>
							    <IconButton edge="start" color="inherit">
							      <InfoIcon />
							    </IconButton>
							    <IconButton edge="start" color="inherit" onClick={() => setSearchDrawerState({...searchDrawerState, status: true})}>
							      <SearchIcon />
							    </IconButton>
							</Hidden>
						</div>
					</Toolbar>
				</Container>	
			</AppBar>
		</div>
  	);
}

export { Header };
