import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Fade from '@material-ui/core/Fade';
import ButtonBase from '@material-ui/core/ButtonBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InfiniteScroll from 'react-infinite-scroller';

import DeleteIcon from '@material-ui/icons/Delete';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

import { AnimeActionCreators } from "../../../state/action";
import AnimeList from '../../components/AnimeList';

const useStyles = makeStyles((theme) => ({
  banner: {
	background: "gray",
	backgroundSize: 'cover',
	height: '568px',
	width: '100%',
	display: "-webkit-box",
	WebkitBoxAlign: "end"
  },
  poster: {
	background: "lightgray",
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover",
	backgroundPosition: "center",
	paddingTop: "150%",
	width: "100%",
	marginBottom: -25
  },
  input: {
	display: 'none',
  },
  backdrop: {
	zIndex: theme.zIndex.drawer + 1,
	color: '#fff',
  }
}));

export const HomeAdminScreen = () => {
	const classes = useStyles();
	let { slug } = useParams();
	let history = useHistory();

	const dispatch = useDispatch();
	const animeList = useSelector(state => state.anime.animeList);
	const defaultSearchState = { status: false, hasSearchQuery: false, query: "", genres: [], categories: [], teams: [], states: [], year: {min: 0, max: new Date().getFullYear()} };
	
	const [ searchDrawerState, setSearchDrawerState ] = useState(defaultSearchState);
	const [ pageNumber, setPageNumber ] = useState(0);

	useEffect(initialize, []);
	function initialize() {
		dispatch(AnimeActionCreators.getAnimeList({teams: ["fanvox"]}));
	}

	const loadAnimes = () => {
		dispatch(AnimeActionCreators.getAnimeList({...searchDrawerState, page: pageNumber+1, teams: ["fanvox"]}));
		setPageNumber(pageNumber+1);
	}

	return (
		<Container>
			<Box mt={2} textAlign="center">
				<AnimeList animeList={animeList} />
			</Box>
		</Container>
	);
}