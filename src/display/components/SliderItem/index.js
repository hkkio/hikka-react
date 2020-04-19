import React from "react";
import Container from '@material-ui/core/Container';
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

import { useSelector, useDispatch } from 'react-redux';
import { AnimeActionCreators } from "../../../state/action";
import { getGenres } from "../../../utils/AnimeUtils";

const SliderItem = ({anime, setDrawerState}) => {
    let history = useHistory();
    const dispatch = useDispatch();
	const styles = {
		backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${anime.banner})`,
		backgroundSize: 'cover',
		height: '568px',
		width: '100%',
		display: "-webkit-box",
		WebkitBoxAlign: "end"
	}

	const openAnime = () => {
		dispatch(AnimeActionCreators.setAnime(null));
        dispatch(AnimeActionCreators.getAnime({slug: anime.slug}));
        setDrawerState({status: true});
        history.push('/anime/' + anime.slug);
    }

  	return (
	  	<Box display="flex" flexWrap="wrap" pb={5} alignContent="flex-end" color="white" style={styles}>
		  	<Container>
			        <Grid container>
			        	<Grid item md xs={12}>
				        	<Button variant="outlined" color="inherit" style={{marginBottom: 20}} onClick={() => openAnime()}>
				        		Дивитись онлайн
				        	</Button>
				        </Grid>
			        </Grid>
			        <Grid container>
				        <Grid item md xs={12}>
				        	<Box fontSize={24} fontWeight="600">
				        		{anime.title.ua}
				        	</Box>
				        	<Box fontSize={21} color="rgba(255, 255, 255, 0.5)">
				        		{anime.title.jp}
				        	</Box>
				        </Grid>
				        <Grid item md xs={12}>
				        	<Box textAlign={{xs: "left", md: "right"}}>
				        		<Box fontSize={48} component="span" fontWeight="600">{anime.episodes.released}</Box>
				        		<Box fontSize={24} component="span" fontWeight="600" color="rgba(255, 255, 255, 0.5)">/{anime.episodes.total ? anime.episodes.total : "?"}</Box>
				        	</Box>
				        </Grid>
			        </Grid>
			        <Grid container>
				        <Grid item xs={12} md={3}>
				        	<Box fontSize={18} component="p" mb={0} fontWeight="600">Рейтинг</Box>
				        	<Rating value={parseInt(anime.rating)/2} precision={0.5} readOnly />
				        </Grid>
				        <Grid item xs={12} md={3}>
				        	<Box fontSize={18} component="p" mb={0} fontWeight="600">Жанр</Box>
				        	<Box fontSize={16} component="p" m={0}>{getGenres(anime.genres).join(", ")}</Box>
				        </Grid>
			        </Grid>
			</Container>
		</Box>
  	);
}

const SliderSceleton = () => {
	return(
		<Skeleton height={568} variant="rect" style={{display: "flex", flexWrap: "wrap", paddingBottom: 30, alignContent: "flex-end"}}>
			<Container>
				<Grid container>
		        	<Grid item md xs={12}>
		        		<Skeleton variant="rect" width="30%" />
			        </Grid>
		        </Grid>
		        <Grid container style={{marginBottom: 30}}>
			        <Grid item md xs={12}>
			        	<Skeleton variant="text" width="30%" />
			        	<Skeleton variant="text" width="30%" />
			        </Grid>
		        </Grid>
		        <Grid container>
			        <Grid item xs={12} md={3}>
			        	<Skeleton variant="text" width="70%" />
			        	<Skeleton variant="text" width="40%" />
			        </Grid>
			        <Grid item xs={12} md={3}>
			        	<Skeleton variant="text" width="70%" />
			        	<Skeleton variant="text" width="40%" />
			        </Grid>
		        </Grid>
			</Container>
		</Skeleton>
	)
}

export { SliderItem, SliderSceleton };
