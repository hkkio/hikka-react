import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Fade from '@material-ui/core/Fade';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useHistory } from "react-router-dom";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const BackButton = (props) => {
	let history = useHistory();
	const theme = useTheme();
  	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const { player, slug } = props;

	let iconSize = matches ? 38 : 58;

	return (
		<Fade in={player.userActivity}>
			<Box position="absolute" zIndex="modal" top={0} left={0} m={4}>
				<IconButton onClick={() => history.push(`/anime/${slug}`)}>
					<ArrowBackIcon style={{ fontSize: iconSize }} />
				</IconButton>
			</Box>
		</Fade>
	);
}