import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroller';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SearchIcon from '@material-ui/icons/Search';
import UpdateIcon from '@material-ui/icons/Update';
import ClearAllIcon from '@material-ui/icons/ClearAll';

import SearchDrawer from './SearchDrawer';
import { List, ListSceleton } from "./List"; 

const useStyles = makeStyles((theme) => ({
	animeAppBar: {
		marginBottom: 10
	},
	animeToolbar: {
		padding: 0
	}
}));

const AnimeList = ({animeList, goToMain, loadAnimes, setAnimeDrawerState}) => {
	const classes = useStyles();

	const defaultSearchState = { status: false, hasSearchQuery: false, query: "", genres: [], categories: [], teams: [], states: [], year: {min: 0, max: new Date().getFullYear()} };
	
	const [ searchDrawerState, setSearchDrawerState ] = useState(defaultSearchState);
	const [ pageNumber, setPageNumber ] = useState(0);

	return (
		<Box mt={2} textAlign="center">
			<SearchDrawer drawerState={searchDrawerState} setDrawerState={setSearchDrawerState} setPageNumber={setPageNumber} defaultState={defaultSearchState} />
			<AppBar position="sticky" color="inherit" elevation={0} className={classes.animeAppBar}>
				<Toolbar className={classes.animeToolbar}>
					<Grid container alignItems="center" justify="space-between">
						<Grid item>
							<Typography variant="h3" component="span">
				        		 {searchDrawerState.hasSearchQuery ? "Знайдені релізи" : "Останні оновлення"}
				        	</Typography>
						</Grid>
						<Grid item>
							<Button color="inherit" startIcon={<ClearAllIcon />} disabled={!searchDrawerState.hasSearchQuery} onClick={goToMain}>
								Очистити
							</Button>
							<Button color="inherit" startIcon={<SearchIcon />} onClick={() => setSearchDrawerState({...searchDrawerState, status: true})}>
								Пошук
							</Button>
						</Grid>
					</Grid>
				</Toolbar>
				<Divider style={{height: 5}} />
			</AppBar>
			{animeList.data != null ?
				<InfiniteScroll
					pageStart={0}
					loadMore={loadAnimes}
					hasMore={animeList.newData != null && animeList.newData.length > 0 && !animeList.loading}
					loader={<CircularProgress />}
				>
					<List data={animeList.data} />
				</InfiniteScroll>
				:
				<ListSceleton />}
			{searchDrawerState.hasSearchQuery && animeList.data != null && animeList.data.length == 0 && 
				<Box my={10} color="text.secondary">
					<SentimentVeryDissatisfiedIcon style={{fontSize: 50}} />
					<Typography variant="h3" component="h3">
	    				На жаль, не знайдено ні одного релізу за Вашим пошуковим запитом
	    			</Typography>
	    		</Box>
	    	}
		</Box>
	);
}

export default AnimeList;