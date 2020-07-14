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

import DeleteIcon from '@material-ui/icons/Delete';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

import { AnimeActionCreators } from "../../../state/action";
import { EpisodeList, EpisodeListSceleton, NewEpisodeItem } from "./EpisodeList";

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

const Settings = ({open, onClose, settings}) => {
	return (
		<Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Налаштування епізоду {settings.episode != null && `#${settings.episode.position}`}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Налаштуйте інтервали опенінгу, задайте початок ендінгу та вкажіть назву епізоду для зручності перегляду
				</DialogContentText>
				<Grid container spacing={2}>
					<Grid item md={12} sm={12} xs={12}>
						<TextField
							autoFocus
							margin="dense"
							label="Назва епізоду"
							fullWidth
						/>
					</Grid>
					<Grid item md={4} sm={6} xs={12}>
						<TextField
							margin="dense"
							type="time"
							defaultValue="00:00"
							label="Початок опенінгу"
							fullWidth
						/>
					</Grid>
					<Grid item md={4} sm={6} xs={12}>
						<TextField
							margin="dense"
							type="time"
							defaultValue="00:00"
							label="Кінець опенінгу"
							fullWidth
						/>
					</Grid>
					<Grid item md={4} sm={12} xs={12}>
						<TextField
							margin="dense"
							type="time"
							defaultValue="00:00"
							label="Початок ендінгу"
							fullWidth
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Скасувати
				</Button>
				<Button onClick={onClose} color="primary">
					Оновити
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export const AnimeScreen = () => {
	const classes = useStyles();
	let { slug } = useParams();
  	let history = useHistory();

  	const defaultSettings = {status: false, anime: null, episode: null};
  	const [settings, setSettings] = useState(defaultSettings);

  	const dispatch = useDispatch();
  	const currentAnime = useSelector(state => state.anime.currentAnime);

	const uploadFile = (file, type) => {
		dispatch(AnimeActionCreators.uploadFile({file, type, slug: currentAnime.data.slug}));
	}

	const handleClickOpenSettings = (anime, episode) => {
		setSettings({status: true, anime, episode});
	};

	const handleCloseSettings = () => {
		setSettings({...settings, status: false});
	};

	useEffect(initialize, []);
	function initialize() {
	  	dispatch(AnimeActionCreators.getAnime({slug}));
	}

	return (
		<div>
			<input
				accept="image/*"
				className={classes.input}
				id="poster"
				onChange={(e) => e.target.value != "" && uploadFile(e.target.files[0], "poster")}
				type="file"
			/>
			<input
				accept="image/*"
				className={classes.input}
				id="banner"
				onChange={(e) => e.target.value != "" && uploadFile(e.target.files[0], "banner")}
				type="file"
			/>
			<input
				accept=".mp4"
				className={classes.input}
				id="episode"
				onChange={(e) => e.target.value != "" && uploadFile(e.target.files[0], "episode")}
				type="file"
			/>
			<Backdrop className={classes.backdrop} open={currentAnime.loading}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Settings open={settings.status} onClose={handleCloseSettings} settings={settings} />
			{ currentAnime.data != null &&
				<Box display="flex" alignContent="flex-end" color="white" className={classes.banner} style={{"backgroundImage": `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${currentAnime.data.banner})`}}>
					<Container>
						<Grid container justify="space-between" alignItems="flex-end">
				        	<Grid item md={2} xs={8} sm={4}>
				        		<label htmlFor="poster">
					        		<ButtonBase component="span" className={classes.poster} style={{backgroundImage: `url(${currentAnime.data.poster})`}}>
						        	</ButtonBase>
					        	</label>
					        </Grid>
					        <Grid item md sm xs align="right">
					        	<label htmlFor="banner">
					        		<Hidden only="xs">
						        		<Button component="span" color="inherit" style={{marginBottom: 10}} variant="outlined">
											Змінити банер
										</Button>
									</Hidden>
									<Hidden smUp>
										<IconButton component="span" color="inherit" style={{marginBottom: 10}} variant="outlined">
											<InsertPhotoIcon />
										</IconButton>
									</Hidden>
								</label>
					        </Grid>
				        </Grid>
					</Container>
				</Box>
			}
			{ currentAnime.data != null &&
				<Box mt={6}>
					<Container>
						<Typography variant="h4" component="p" gutterBottom align="left">
							{currentAnime.data.title.ua}
						</Typography>
						<EpisodeList data={currentAnime.data.episodes.list} anime={currentAnime} handleClickOpenSettings={handleClickOpenSettings} />
					</Container>
				</Box>
			}
		</div>
	);
}