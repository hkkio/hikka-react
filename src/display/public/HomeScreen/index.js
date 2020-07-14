import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroller';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { Footer } from './Footer';
import { Header } from './Header';
import { Slider, SliderSceleton } from './Slider';
import { AnimeList, AnimeListSceleton } from './AnimeList';
import { AnimeDrawer } from './AnimeDrawer';
import { SearchDrawer } from './SearchDrawer';

import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SearchIcon from '@material-ui/icons/Search';
import UpdateIcon from '@material-ui/icons/Update';
import ClearAllIcon from '@material-ui/icons/ClearAll';

import { AnimeActionCreators } from "../../../state/action";

const useStyles = makeStyles((theme) => ({
	animeAppBar: {
		marginBottom: 10
	},
	animeToolbar: {
		padding: 0
	}
}));

const HomeScreen = (props) => {
	const classes = useStyles();

	const defaultSearchState = { status: false, hasSearchQuery: false, query: "", genres: [], categories: [], teams: [], states: [], year: {min: 0, max: new Date().getFullYear()} };
	
	const [ searchDrawerState, setSearchDrawerState ] = useState(defaultSearchState);
	const [ animeDrawerState, setAnimeDrawerState ] = useState({status: false});
	const [ pageNumber, setPageNumber ] = useState(0);

  	const dispatch = useDispatch();
  	const anime = useSelector(state => state.anime);

  	let { slug } = useParams();
  	let history = useHistory();

	useEffect(initialize, [slug]);
	function initialize() {
		if (!searchDrawerState.hasSearchQuery) {
			dispatch(AnimeActionCreators.getBannerAnimeList());
			dispatch(AnimeActionCreators.getAnimeList({page: 0}));
		}

		if (slug != null) {
			dispatch(AnimeActionCreators.getAnime({slug}));
			setAnimeDrawerState({status: true});
		} else {
			setAnimeDrawerState({status: false});
		}
	}

	const goToMain = () => {
		window.scrollTo(0, 0);
		setPageNumber(0);
		dispatch(AnimeActionCreators.setDefaultAnimeList());
		setSearchDrawerState(defaultSearchState);
		dispatch(AnimeActionCreators.getAnimeList({page: 0}));
	}

	const loadAnimes = () => {
		dispatch(AnimeActionCreators.getAnimeList({...searchDrawerState, page: pageNumber+1}));
		setPageNumber(pageNumber+1);
	}

  	return (
		<div>
			<Header />
			<SearchDrawer drawerState={searchDrawerState} setDrawerState={setSearchDrawerState} setPageNumber={setPageNumber} defaultState={defaultSearchState} />
			<AnimeDrawer drawerState={animeDrawerState} setDrawerState={setAnimeDrawerState} />
			{anime.bannerAnimeList.data != null ? <Slider data={anime.bannerAnimeList.data} setDrawerState={setAnimeDrawerState} /> : <SliderSceleton />}
			
			<Container>
				<Box mt={2} textAlign="center">
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
					
					{anime.animeList.data != null ?
						<InfiniteScroll
							pageStart={0}
							loadMore={loadAnimes}
							hasMore={anime.animeList.newData != null && anime.animeList.newData.length > 0 && !anime.animeList.loading}
							loader={<CircularProgress />}
						>
							<AnimeList data={anime.animeList.data} setDrawerState={setAnimeDrawerState} />
						</InfiniteScroll>
						:
						<AnimeListSceleton />}
					{searchDrawerState.hasSearchQuery && anime.animeList.data != null && anime.animeList.data.length == 0 && 
						<Box my={10} color="text.secondary">
							<SentimentVeryDissatisfiedIcon style={{fontSize: 50}} />
							<Typography variant="h3" component="h3">
		        				На жаль, не знайдено ні одного релізу за Вашим пошуковим запитом
		        			</Typography>
		        		</Box>
		        	}
					<Divider style={{height: 5, marginTop: 10}} />
				</Box>
			</Container>
			<Footer />
		</div>
  	);
}

export {HomeScreen};