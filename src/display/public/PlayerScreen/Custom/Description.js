import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Fade from '@material-ui/core/Fade';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useHistory } from "react-router-dom";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { cutDescription } from "../../../../utils/AnimeUtils";

export const Description = (props) => {
	const { player, anime, episode } = props;

	return (
		<Hidden xsDown>
			<Fade in={!player.userActivity && player.paused}>
				<Box position="absolute" zIndex="modal" left={0} p={10} style={{backgroundColor: "rgba(0,0,0,0.6)"}} width="100%" height="100%">
					<Box display="flex" justifyContent="center" flexDirection="column" width="100%" height="100%">
						<Typography variant="h6" component="p" gutterBottom>
							Ти дивишся
						</Typography>
						<Typography variant="h3" component="h1" gutterBottom>
							{anime.title.ua}
						</Typography>
						<Typography variant="h5" component="h2" gutterBottom>
							Серія #{episode}
						</Typography>
						<Rating value={parseInt(anime.rating)/2} precision={0.5} readOnly size="large" style={{marginBottom: 10}} />
						<Box width={{md: "75%"}}>
							<Typography variant="h6" component="p">
								{cutDescription(anime.description, 400)}
							</Typography>
						</Box>
					</Box>
				</Box>
			</Fade>
		</Hidden>
	);
}