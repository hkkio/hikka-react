import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import * as jikanjs from 'jikanjs';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Fade from '@material-ui/core/Fade';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

import { categories, states, genres, getSeason, getState, getCategory, getGenresByMAL } from "../../../utils/AnimeUtils";
import { AnimeActionCreators } from "../../../state/action";

const Tag = withStyles(theme => ({
	root: {
		borderRadius: 15,
		marginRight: 10,
		marginBottom: 10
	},
}))(Button);

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const CreateAnimeScreen = () => {
	const defaultAnimeState = {
		title: {
			ua: "",
			jp: "",
		},
		selected: false,
		description: "",
		subtitles: [],
		voiceover: [],
		team: "fanvox",
		year: "0",
		total: "",
		genres: [],
		category: "",
		state: "",
		season: 0,
		aliases: [],
		external: {
			myanimelist: 0,
			toloka: 0
		},
	}

	const teamUsers = [
		{
			title: "test"
		},
		{
			title: "test 2"
		},
		{
			title: "test 3"
		},

	]

	const classes = useStyles();
	const [anime, setAnime] = useState(defaultAnimeState);
	const [MALdata, setMALdata] = useState([]);
	const [MALanime, setMALanime] = useState(null);
	const [isLoadingData, setIsLoadingData] = useState(false);
	const dispatch = useDispatch();
	const currentAnime = useSelector((state) => state.anime.currentAnime);
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		if (currentAnime.error != null && "message" in currentAnime.error) {
			enqueueSnackbar(currentAnime.error.message, { variant: 'error' });
		};
	}, [currentAnime]);

	const searchInMAL = (event, value, reason) => {
		if (isLoadingData) {
			return;
		}

		if (reason == "input" && value.length >= 3) {
			setIsLoadingData(true);

			jikanjs.search('anime', value).then((res) => {
				setMALdata(res.results);
				setIsLoadingData(false);
			})
		}
	}

	const chooseAnime = (event, value, reason) => {
		if (reason == "select-option") {
			jikanjs.loadAnime(value.mal_id).then((res) => {
				setMALanime(res);
				console.log(res)
				updateBasicInfo(res);
			})
		}

		if (reason == "remove-option" || reason == "clear") {
			setMALanime(null);
		}
	}

	const updateBasicInfo = (mal) => {
		let updated = {...anime};

		updated.title.jp = mal.title;
		updated.aliases = mal.title_synonyms;
		updated.description = mal.synopsis;
		updated.category = mal.type.toLowerCase();
		updated.total = mal.episodes != null ? mal.episodes : 0;
		updated.state = mal.airing ? "ongoing" : "released";

		if (mal.premiered != null && mal.premiered.length > 0) {
			updated.year = mal.premiered.split(" ")[1];
			updated.season = getSeason(mal.premiered.split(" ")[0].toLowerCase());
		}

		updated.genres = getGenresByMAL(mal.genres);
		updated.external.myanimelist = mal.mal_id;

		setAnime(updated);
	}

	const toggleGenre = (item) => {
    	if (anime.genres.includes(item.slug)) {
    		setAnime({...anime, genres: anime.genres.filter((genre) => genre !== item.slug)});
    	} else {
    		setAnime({...anime, genres: anime.genres.concat([item.slug])});
    	}
    }

	return (
		<Container>
			<Typography variant="h4" component="p" gutterBottom align="left">
				Створення релізу
			</Typography>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<Backdrop className={classes.backdrop} open={currentAnime.loading}>
					<CircularProgress color="inherit" />
				</Backdrop>
				<Box my={4}>
					<Grid container spacing={4} alignItems="center">
						<Grid item md={8} sm={8} xs={12}>
							<Autocomplete 
								loading={isLoadingData}
								options={MALdata}
								onChange={chooseAnime}
								onInputChange={searchInMAL}
								noOptionsText={"Немає варіантів"}
								loadingText={"Завантаження.."}
								getOptionLabel={(option) => option.title}
								renderOption={(option) => (
									<Box>
										<Grid container spacing={2} wrap="nowrap">
											<Grid item>
												<img src={option.image_url} width="75" />
											</Grid>
											<Grid item>
											<Typography variant="inherit" gutterBottom>
													{option.title}
												</Typography>
												<Typography variant="subtitle2">Тип </Typography>
												<Typography variant="body2" gutterBottom>
													 {getCategory(option.type.toLowerCase()) != "" ? getCategory(option.type.toLowerCase()) : option.type}
												</Typography>
												<Typography variant="subtitle2">Епізоди </Typography>
												<Typography variant="body2" gutterBottom>
													 {option.episodes}
												</Typography>
											</Grid>
										</Grid>
									</Box>
								)}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Пошук по MyAnimeList"
										variant="outlined"
										inputProps={{
										...params.inputProps,
										autoComplete: 'new-password', // disable autocomplete and autofill
										}}
									/>
								)}
							/>
						</Grid>
						<Grid item md={4} sm={4} xs={12}>
							<Button variant="outlined" disabled={MALanime == null} href={MALanime != null ? MALanime.url : ""} color="primary">
								Переглянути на MAL
							</Button>
						</Grid>
						<Grid item md={4} sm={4} xs={12}>
							<TextField value={anime.title.ua} onChange={(event) => setAnime({...anime, title: {...anime.title, ua: event.target.value}})} fullWidth disabled={MALanime == null} label="Назва українською" variant="outlined" />
						</Grid>
						<Grid item md={4} sm={4} xs={12}>
							<TextField value={anime.title.jp} onChange={(event) => setAnime({...anime, title: {...anime.title, jp: event.target.value}})} fullWidth disabled={MALanime == null} label="Оригінальна назва (лат.)" variant="outlined" />
						</Grid>
						<Grid item md={4} sm={4} xs={12}>
							<TextField value={anime.aliases.join(",")} onChange={(event) => setAnime({...anime, aliases: [...anime.aliases, event.target.value]})} fullWidth disabled={MALanime == null} label="Додаткові назви (через кому)" variant="outlined" />
						</Grid>
						<Grid item md={12} sm={12} xs={12}>
							<TextField value={anime.description} onChange={(event) => setAnime({...anime, description: event.target.value})} fullWidth disabled={MALanime == null} multiline rows={8} label="Опис релізу" variant="outlined" />
						</Grid>
						<Grid item md={3} sm={6} xs={12}>
							<DatePicker value={anime.year != "0" ? anime.year : "2010"} onChange={(event) => setAnime({...anime, year: event.target.value})} format="yyyy" disabled={MALanime == null} fullWidth label="Рік" minDate="2000" views={['year']} inputVariant="outlined" />
						</Grid>
						<Grid item md={3} sm={6} xs={12}>
							<TextField value={anime.total.toString()} onChange={(event) => setAnime({...anime, total: event.target.value})} fullWidth disabled={MALanime == null} label="Кількість епізодів" variant="outlined" />
						</Grid>
						<Grid item md={3} sm={6} xs={12}>
							<TextField value={anime.category} onChange={(event) => setAnime({...anime, category: event.target.value})} select fullWidth disabled={MALanime == null} label="Тип релізу" variant="outlined">
								{categories.map((option) => (
									<MenuItem key={option.slug} value={option.slug}>
										{option.name}									
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item md={3} sm={6} xs={12}>
							<TextField value={anime.state} onChange={(event) => setAnime({...anime, state: event.target.value})} select fullWidth disabled={MALanime == null} label="Статус" variant="outlined">
								{states.map((option) => (
									<MenuItem key={option.slug} value={option.slug}>
										{option.name}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item md={12} sm={12} xs={12}>
							<Typography variant="caption" display="block" gutterBottom>
								Жанри
							</Typography>
							{
								genres.map((genre, index) => {
									return <Tag size="small" onClick={() => toggleGenre(genre)} key={index} color={anime.genres.includes(genre.slug) ? "primary" : "default"} disabled={MALanime == null} disableElevation variant="contained">{genre.name}</Tag>
								})
							}
						</Grid>
						<Grid item md={6} sm={6} xs={12}>
							<Autocomplete
								multiple
								options={teamUsers}
								getOptionLabel={(option) => option.title}
								renderInput={(params) => (
									<TextField
										{...params}
										variant="outlined"
										label="Озвучували"
										placeholder="Юзернейм користувача"
									/>
								)}
							/>
						</Grid>
						<Grid item md={6} sm={6} xs={12}>
							<Autocomplete
								multiple
								options={teamUsers}
								getOptionLabel={(option) => option.title}
								renderInput={(params) => (
									<TextField
										{...params}
										variant="outlined"
										label="Перекладали"
										placeholder="Юзернейм користувача"
									/>
								)}
							/>
						</Grid>
					</Grid>
				</Box>
				<Button variant="contained" color="primary">
					Створити
				</Button>
			</MuiPickersUtilsProvider>
		</Container>
	);
}