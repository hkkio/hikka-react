import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const VolumeSlider = withStyles({
  root: {
    height: 4,
  },
  thumb: {
  	height: 16,
    width: 16,

    backgroundColor: '#fff',
  },
  track: {
    height: 4,
  },
  rail: {
    height: 4,
  },
})(Slider);

const ProgressSlider = withStyles({
  root: {
    height: 5,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  track: {
    height: 5,
  },
  rail: {
    height: 5,
  },
})(Slider);

export const Bar = (props) => {
	let history = useHistory();
	const { enqueueSnackbar } = useSnackbar();
	const theme = useTheme();
  	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { player, actions, position, anime, episode } = props;
	const [time, setTime] = useState(player.seekingTime || player.currentTime);

	let iconSize = matches ? 38 : 58;

	useEffect(() => {
		setTime(player.seekingTime || player.currentTime)
	}, [player.currentTime]);

	const toggleAnime = () => {
		actions.togglePlay();
	}

	const changeVolume = (vol) => {
		actions.changeVolume(vol);
	}

	const toggleFullScreen = () => {
		actions.toggleFullscreen();
	}

	const seekAnime = (time, status) => {
		if (status == "handle") {
			actions.handleSeekingTime(time);
			setTime(time)
		}
		
		if (status == "end") {
			actions.seek(time);
    		actions.handleEndSeeking(time);
		}
	} 

	const openNextEpisode = () => {
		history.push(`/anime/${anime.slug}/watch/${parseInt(episode) + 1}`);

		if (player.isFullscreen) {
			toggleFullScreen();
		}

		enqueueSnackbar(`Серію #${episode} переглянуто.`, { variant: 'success' });
	}

	const openPrevEpisode = () => {
		history.push(`/anime/${anime.slug}/watch/${parseInt(episode) - 1}`);

		if (player.isFullscreen) {
			toggleFullScreen();
		}
	}
	
	return (
		<Box position="absolute" bottom={0} zIndex="modal" width="100%" height={150} px={2} style={{backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.40) 29%, #000000 100%)"}}>
			<Grid container alignItems="center" style={{height: "100%"}} spacing={2}>
				<Grid item md={12} xs={12} sm={12}>
					<ProgressSlider value={time} onChange={(e, time) => seekAnime(time, "handle")} onChangeCommitted={(e, time) => seekAnime(time, "end")} step={1} min={0} max={player.duration} />
				</Grid>
		        <Grid item md sm>
					<Grid container alignItems="center" justify="flex-start" spacing={2} wrap="nowrap">
						<Grid item>
							<IconButton onClick={toggleAnime}>
								{player.paused ? <PlayArrowIcon style={{ fontSize: iconSize }} /> : <PauseIcon style={{ fontSize: iconSize }} />}
							</IconButton>
						</Grid>
						<Hidden only="xs">
							<Grid item>
								<VolumeDown fontSize={"large"} />
							</Grid>
							<Grid item md={6} sm>
								<VolumeSlider aria-labelledby="continuous-slider" value={player.volume} step={0.01} min={0} max={1} onChange={(e, vol) => changeVolume(vol)} />
							</Grid>
							<Grid item>
								<VolumeUp fontSize={"large"} />
							</Grid>
						</Hidden>
					</Grid>
				</Grid>
				<Hidden mdDown>
					<Grid item align="center" md>
						<Typography variant="h5" component="h3">
							{anime.title.ua}
						</Typography>
						<Typography variant="h6" component="h4">
							{episode} серія
						</Typography>
					</Grid>
				</Hidden>
				<Grid item md sm>
					<Grid container alignItems="center" justify="flex-end" spacing={2} wrap="nowrap">
						<Grid item>
							<IconButton disabled={!(1 <= parseInt(episode) - 1)} onClick={openPrevEpisode}>
								<SkipPreviousIcon style={{ fontSize: iconSize }} />
							</IconButton>
						</Grid>
						<Grid item>
							<IconButton disabled={!(anime.episodes.total >= parseInt(episode) + 1)} onClick={openNextEpisode}>
								<SkipNextIcon style={{ fontSize: iconSize }} />
							</IconButton>
						</Grid>
						<Grid item>
							<IconButton onClick={toggleFullScreen}>
								{player.isFullscreen ? <FullscreenExitIcon style={{ fontSize: iconSize }} /> : <FullscreenIcon style={{ fontSize: iconSize }} />}
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}