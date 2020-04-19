import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

import InfiniteScroll from 'react-infinite-scroller';

import { Footer } from './Footer';
import { Header } from './Header';
import { Slider, SliderSceleton } from './Slider';
import { AnimeList, AnimeListSceleton } from './AnimeList';
import { AnimeDrawer } from './AnimeDrawer';
import { SearchDrawer } from './SearchDrawer';

import { AnimeActionCreators } from "../../../state/action";

const HomeScreen = () => {
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
	  	dispatch(AnimeActionCreators.getBannerAnimeList());
		dispatch(AnimeActionCreators.getAnimeList({page: 0}));

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
		initialize();
		history.push('/');
	}

	const loadAnimes = () => {
		dispatch(AnimeActionCreators.getAnimeList({...searchDrawerState, page: pageNumber+1}));
		setPageNumber(pageNumber+1);
	}

  	return (
		<div>
			<Header goToMain={goToMain} drawerState={searchDrawerState} setDrawerState={setSearchDrawerState} />
			<SearchDrawer drawerState={searchDrawerState} setDrawerState={setSearchDrawerState} setPageNumber={setPageNumber} defaultState={defaultSearchState} />
			<AnimeDrawer drawerState={animeDrawerState} setDrawerState={setAnimeDrawerState} />
			{anime.bannerAnimeList.data != null ? <Slider data={anime.bannerAnimeList.data} setDrawerState={setAnimeDrawerState} /> : <SliderSceleton />}
			<Container>
				<Box mt={2} textAlign="center">
					<Typography variant="h4" component="p" gutterBottom align="left">
						{searchDrawerState.hasSearchQuery ? "Знайдені релізи" : "Останні оновлення"}
					</Typography>
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
					<Divider style={{height: 5, marginTop: 10}} />
				</Box>
			</Container>
			<Footer />
		</div>
  	);
}

export {HomeScreen};