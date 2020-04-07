import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { Footer } from './Footer';
import { Header } from './Header';
import { Slider, SliderSceleton } from './Slider';
import { AnimeList, AnimeListSceleton } from './AnimeList';
import { AnimeDrawer } from './AnimeDrawer';
import { SearchDrawer } from './SearchDrawer';


import { AnimeActionCreators } from "../../../state/action";

const Home = () => {
	const defaultSearchState = {status: false, query: "", genres: [], categories: [], teams: [], states: [], minYear: 0, maxYear: 0};
	
	const [ searchDrawerState, setSearchDrawerState ] = useState(defaultSearchState);
	const [ animeDrawerState, setAnimeDrawerState ] = useState({status: false});

  	const dispatch = useDispatch();
  	const anime = useSelector(state => state.anime);
  	let { slug } = useParams();

	useEffect(initialize, []);
	function initialize() {
	  	dispatch(AnimeActionCreators.getBannerAnimeList());
		dispatch(AnimeActionCreators.getAnimeList());

		if (slug != null) {
			dispatch(AnimeActionCreators.getAnime({slug}));
			setAnimeDrawerState({status: true});
		}
	}

  	return (
		<div>
			<Header drawerState={searchDrawerState} setDrawerState={setSearchDrawerState} />
			<SearchDrawer drawerState={searchDrawerState} setDrawerState={setSearchDrawerState} defaultState={defaultSearchState} />
			<AnimeDrawer drawerState={animeDrawerState} setDrawerState={setAnimeDrawerState} />
			{anime.bannerAnimeList != null ? <Slider data={anime.bannerAnimeList} setDrawerState={setAnimeDrawerState} /> : <SliderSceleton />}
			<Container>
				{anime.animeList != null ? <AnimeList data={anime.animeList} setDrawerState={setAnimeDrawerState} /> : <AnimeListSceleton />}
			</Container>
			<Footer />
		</div>
  	);
}

Home.propTypes = {

};

export {Home};