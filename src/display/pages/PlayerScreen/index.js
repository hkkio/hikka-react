import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Grow from '@material-ui/core/Grow';

import { Player, BigPlayButton, ControlBar, PlayToggle, ProgressControl } from 'video-react';
import { Bar, BackButton, Description } from './Custom';
import LogoWhite from '../../../data/logo-white.svg';

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
  	const [logoTimeout, setLogoTimeout] = useState(false); 

	useEffect(initialize, []);
	function initialize() {
		if (slug != null) {
			dispatch(AnimeActionCreators.getAnime({slug}));

			setTimeout(() => {
				setLogoTimeout(true)
			}, 1000);
		}
	}

  	return (
		<Box style={{backgroundColor: "black", color: "white"}} width="100%" height="100vh" onContextMenu={(e)=> e.preventDefault()}>
			{anime.currentAnime.data != null && logoTimeout ?
				<Player
					fluid={false}
					autoPlay={true}
					width={size.width}
					height={size.height}
					poster="/assets/poster.png"
					src="https://cdn.hikka.io/development/video/65ef0b34246d6bf0f52d0555e257b513/5c218f97d186b240ef1c7252a19b9af9.mp4"
				>
					<BigPlayButton disabled />
					<ControlBar disabled />

					<BackButton slug={slug} />
					<Description episode={episode} anime={anime.currentAnime.data} />
					<Bar episode={episode} anime={anime.currentAnime.data} />

				</Player> :
				<Grow in={anime.currentAnime == null || logoTimeout == false}  timeout={1000}>
					<Box display="absolute" zIndex="tooltip" width="100%" height="100%">
						<Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
								<img src={LogoWhite} width="40%" height="40%" />
						</Box>
					</Box>
				</Grow>
			}
		</Box>
  	);
}

export { PlayerScreen };