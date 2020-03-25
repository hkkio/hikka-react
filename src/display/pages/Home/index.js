import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {
  Slider,
  SliderSceleton,
  AnimeList,
  AnimeListSceleton,
  AnimeDrawer
} from "../../components";

import { AnimeActionCreators } from "../../../state/action";

const Home = () => {
  	const dispatch = useDispatch();
  	const anime = useSelector(state => state.anime);
  	let { slug } = useParams();
  	const [ animeDrawerState, setAnimeDrawerState ] = useState({status: false});

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
			<AnimeDrawer drawerState={animeDrawerState} setDrawerState={setAnimeDrawerState} />
			{anime.bannerAnimeList != null ? <Slider data={anime.bannerAnimeList} setDrawerState={setAnimeDrawerState} /> : <SliderSceleton />}
			<Container>
				{anime.animeList != null ? <AnimeList data={anime.animeList} setDrawerState={setAnimeDrawerState} /> : <AnimeListSceleton />}
			</Container>
		</div>
  	);
}

Home.propTypes = {

};

export {Home};