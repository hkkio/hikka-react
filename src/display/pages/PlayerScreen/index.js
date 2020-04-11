import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { Player, BigPlayButton, ControlBar, PlayToggle, ProgressControl } from 'video-react';
import { Bar } from './Custom/ControlBar';

import { AnimeActionCreators } from "../../../state/action";


const useWindowSize = () => {
	const isClient = typeof window === 'object';

	function getSize() {
		return {
			width: isClient ? window.innerWidth : undefined,
			height: isClient ? window.innerHeight : undefined
		};
	}

	const [windowSize, setWindowSize] = useState(getSize);

	useEffect(() => {
		if (!isClient) {
			return false;
		}

		function handleResize() {
			setWindowSize(getSize());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowSize;
}


const PlayerScreen = () => {
  	const dispatch = useDispatch();
  	const size = useWindowSize();
  	const anime = useSelector(state => state.anime);
  	let { slug, episode } = useParams();

	useEffect(initialize, []);
	function initialize() {
		if (slug != null) {
			dispatch(AnimeActionCreators.getAnime({slug}));
		}
	}

  	return (
		<Box>
			<Player
				playsInline
				fluid={false}
				autoPlay={false}
				width={size.width}
				height={size.height}
				poster="/assets/poster.png"
				src="https://cdn.hikka.io/development/video/65ef0b34246d6bf0f52d0555e257b513/5c218f97d186b240ef1c7252a19b9af9.mp4"
			>
				<BigPlayButton disabled />
				<ControlBar disabled />
				{anime.currentAnime != null && <Bar episode={episode} anime={anime.currentAnime} />}
			</Player>
		</Box>
  	);
}

PlayerScreen.propTypes = {

};

export { PlayerScreen };