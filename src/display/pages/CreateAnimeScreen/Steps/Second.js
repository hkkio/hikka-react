import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';

import { AnimeActionCreators } from "../../../../state/action";
import config from "../../../application/config";

const useStyles = makeStyles({
    card: {
        border: "none",
        height: "100%",
    },
    poster: {
        paddingTop: "150%",
        background: "gray",
        backgroundSize: "cover"
    },
    banner: {
    	height: 400,
    	width: "100%",
    	background: "gray",
    	backgroundSize: "cover"
    },
	input: {
		display: 'none',
	},
});

export const Second = ({anime, setActiveStep}) => {
	const [poster, setPoster] = useState(null);
	const [banner, setBanner] = useState(null);
	const classes = useStyles();

	const dispatch = useDispatch();
	const currentAnime = useSelector((state) => state.anime.currentAnime);

	const chunkBytes = 1024*1024;

	useEffect(() => {
		if (poster != null) {
			for (var i = 0; i < poster.size; i+=chunkBytes) {
				if (i + chunkBytes < poster.size) {
					let blob = poster.slice(i, i+chunkBytes-1);
					console.log(blob.size);
				} else {
					let blob = poster.slice(i, poster.size);
					console.log(blob.size);
				}
			}
		}
		
		console.log(banner);
	}, [poster, banner]);

	const uploadImages = () => {
		dispatch(AnimeActionCreators.uploadFile({file: poster, type: "poster", slug: "clannad-after-story-1868c766"}));
		// dispatch(AnimeActionCreators.uploadFile({file: banner, type: "banner", slug: "clannad-after-story-1868c766"}));
	}

	return (
		<div>
			<Box my={4}>
				<input
					accept="image/*"
					className={classes.input}
					id="poster"
					onChange={(e) => e.target.value != "" && setPoster(e.target.files[0])}
					type="file"
				/>
				<input
					accept="image/*"
					className={classes.input}
					id="banner"
					onChange={(e) => e.target.value != "" && setBanner(e.target.files[0])}
					type="file"
				/>
				{currentAnime.data != null && Object.keys(currentAnime.data).length != 0 && <Grid container>
			        <Grid item md xs={12}>
			        	<Box fontSize={24} fontWeight="600">
			        		{currentAnime.data.title.ua}
			        	</Box>
			        	<Box fontSize={21} color="rgba(0, 0, 0, 0.5)">
			        		{currentAnime.data.title.jp}
			        	</Box>
			        </Grid>
			        <Grid item md xs={12}>
			        	<Box textAlign={{xs: "left", md: "right"}}>
			        		<Box fontSize={48} component="span" fontWeight="600">{currentAnime.data.episodes.released ? currentAnime.data.episodes.released : "0"}</Box>
			        		<Box fontSize={24} component="span" fontWeight="600" color="rgba(0, 0, 0, 0.5)">/{currentAnime.data.episodes.total ? currentAnime.data.episodes.total : "?"}</Box>
			        	</Box>
			        </Grid>
		        </Grid>}
				<Grid container spacing={2}>
					<Grid item md={2} sm={2} xs={12}>
						<Card className={classes.card} variant="outlined" align="center">
							<label htmlFor="poster">
				              <CardActionArea component="span">
				                <CardMedia
				                  className={classes.poster}
				                  image={poster != null ? URL.createObjectURL(poster) : config.noPosterURL}
				                />
				                <CardContent>
						          <Typography gutterBottom variant="h5" component="h2">
						            Постер
						          </Typography>
						          <Typography variant="body2" color="textSecondary" component="p">
						            Рекомендоване співвідношення 1:2
						          </Typography>
						        </CardContent>
				              </CardActionArea>
				            </label>
				            <CardActions>
								<Button disabled={poster == null} onClick={() => setPoster(null)} size="small" color="primary">
								  Очистити
								</Button>
						    </CardActions>
			            </Card>
					</Grid>
					<Grid item md={10} sm={10} xs={12}>
						<Card className={classes.card} variant="outlined" > 
							<label htmlFor="banner">
				              <CardActionArea component="span">
				                <CardMedia
				                  className={classes.banner}
				                  image={banner != null ? URL.createObjectURL(banner) : config.noPosterURL}
				                />
				                <CardContent>
						          <Typography gutterBottom variant="h5" component="h2">
						            Банер
						          </Typography>
						          <Typography variant="body2" color="textSecondary" component="p">
						            Рекомендована висота 568px 
						          </Typography>
						        </CardContent>
				              </CardActionArea>
				            </label>
				            <CardActions>
								<Button disabled={banner == null} onClick={() => setBanner(null)} size="small" color="primary">
								  Очистити
								</Button>
						    </CardActions>
			            </Card>
					</Grid>
				</Grid>
				
			</Box>
			<Button variant="contained" color="primary" onClick={uploadImages}>
				Завантажити
			</Button>
		</div>
	);
}