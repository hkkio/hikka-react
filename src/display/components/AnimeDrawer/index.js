import React, { useState, useEffect } from "react";
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Rating from '@material-ui/lab/Rating';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import AppBar from '@material-ui/core/AppBar';
import { useHistory } from "react-router-dom";

import CloseIcon from '@material-ui/icons/Close';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import AddIcon from '@material-ui/icons/Add';

import { useSelector, useDispatch } from 'react-redux';
import config from "../../application/config";

const Anime = ({anime, setDrawerState, closeAnime}) => {
	const makeGenres = () => {
        return anime.genres.map(function(genre){
                return genre.name;
            }).join(",");
    }

	return (
		<Container style={{marginTop: 10}}>
			<Grid container>
		        <Grid item md xs={12}>
		        	<Box fontSize={24} fontWeight="600">
		        		{anime.title.ua}
		        	</Box>
		        	<Box fontSize={21} color="rgba(0, 0, 0, 0.5)">
		        		{anime.title.jp}
		        	</Box>
		        </Grid>
		        {"episodes" in anime && <Grid item md xs={12}>
		        	<Box textAlign={{xs: "left", md: "right"}}>
		        		<Box fontSize={48} component="span" fontWeight="600">{anime.episodes.animed ? anime.episodes.animed : "0"}</Box>
		        		<Box fontSize={24} component="span" fontWeight="600" color="rgba(0, 0, 0, 0.5)">/{anime.episodes.general ? anime.episodes.general : "?"}</Box>
		        	</Box>
		        </Grid>}
	        </Grid>
			<Grid container spacing={2} justify="center">
				<Grid item md={2} sm={3} xs={8}>
					<div style={{backgroundImage: `url(${anime.poster != null ? anime.poster : config.noPosterURL})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", paddingTop: "150%", marginBottom: 10}} />
				</Grid>
				<Grid item md={7} sm={6} xs={12}>
					<Box mb={2}>
						<Typography component="p" variant="body2" style={{fontWeight: 600}}>
							Опис
						</Typography>
						<Typography component="p" variant="body2">
							{anime.description}
						</Typography>
					</Box>
					{anime.voiceover.length > 0 && <Box mb={2}>
						<Typography component="p" variant="body2" style={{fontWeight: 600}}>
							Озвучували
						</Typography>
						<Box display="flex" mt={1}>
							{anime.voiceover.map((user, index) => {
								return <Avatar alt={user.username} src={user.avatar} key={index} style={{marginRight: 10}} />
							})}
						</Box>
					</Box>}
					{anime.subtitles.length > 0 && <Box mb={2}>
						<Typography component="p" variant="body2" style={{fontWeight: 600}}>
							Перекладали
						</Typography>
						<Box display="flex" mt={1}>
							{anime.subtitles.map((user, index) => {
								return <Avatar alt={user.username} src={user.avatar} key={index} style={{marginRight: 10}} />
							})}
						</Box>
					</Box>}
				</Grid>
				<Grid item md={3} sm={3} xs={12}>
					<Box mb={2}>
						<Typography component="p" variant="body2" style={{fontWeight: 600}}>
							Жанр
						</Typography>
						<Typography component="p" variant="body2">
							{makeGenres()}
						</Typography>
					</Box>
					<Box mb={2}>
						<Typography component="p" variant="body2" style={{fontWeight: 600}}>
							Статус
						</Typography>
						<Typography component="p" variant="body2">
							{anime.state.name}
						</Typography>
					</Box>
					<Box mb={2}>
						<Typography component="p" variant="body2" style={{fontWeight: 600}}>
							Тип
						</Typography>
						<Typography component="p" variant="body2">
							{anime.category.name}
						</Typography>
					</Box>
					<Box mb={2}>
						<Typography component="p" variant="body2" style={{fontWeight: 600}}>
							Рейтинг
						</Typography>
						<Rating value={anime.rating} readOnly />
					</Box>
				</Grid>
			</Grid>
			<AppBar position="fixed" color="outlined" style={{top: "auto", bottom: 0}}>
				<Container>
					<Hidden smUp>
						<Grid container spacing={2} align="center" alignItems="center" justify="center">
							<Grid item xs>
					        	<IconButton color="primary" edge="start">
							      	<AddIcon />
							    </IconButton>
				        	</Grid>
				        	<Grid item xs>
								<Button color="primary" variant="contained" edge="start">
					        		Дивитись
					        	</Button>
				        	</Grid>
				        	<Grid item xs>
					        	<IconButton onClick={() => closeAnime()} edge="start" color="primary">
							      	<CloseIcon />
							    </IconButton>
				        	</Grid>
				        </Grid>
			        </Hidden>
			        <Hidden only="xs">
						<Grid container spacing={2} align="right" alignItems="center" justify="center">
							<Grid item md>
								<Button color="primary" variant="outlined" style={{margin: 10}}>
					        		Додати у список
					        	</Button>
								<Button color="primary" variant="contained"  style={{margin: 10}}>
					        		Дивитись онлайн
					        	</Button>
							</Grid>
						</Grid>
					</Hidden>
				</Container>
			</AppBar>
		</Container>
	);
}

const AnimeSkeleton = () => {

	return (
		<Container style={{marginTop: 10}}>
			<Grid container>
		        <Grid item md xs={12}>
		        	<Skeleton variant="text" width="50%" />
		        	<Skeleton variant="text" width="20%" />
		        </Grid>
	        </Grid>
			<Grid container spacing={2} justify="center">
				<Grid item md={2} sm={3} xs={8}>
					<Skeleton variant="rect" style={{paddingTop: "150%", marginBottom: 10}} />
				</Grid>
				<Grid item md={7} sm={6} xs={12}>
					<Box mb={2}>
						<Skeleton variant="text" width="40%" />
						<Skeleton variant="text" />
					</Box>
					<Box mb={2}>
						<Skeleton variant="text" width="40%" />
						<Box display="flex" mt={1}>
							<Skeleton variant="circle" width={40} height={40} />
							<Skeleton variant="circle" width={40} height={40} />
							<Skeleton variant="circle" width={40} height={40} />
						</Box>
					</Box>
					<Box mb={2}>
						<Skeleton variant="text" width="40%" />
						<Box display="flex" mt={1}>
							<Skeleton variant="circle" width={40} height={40} />
							<Skeleton variant="circle" width={40} height={40} />
							<Skeleton variant="circle" width={40} height={40} />
						</Box>
					</Box>
				</Grid>
				<Grid item md={3} sm={3} xs={12}>
					<Box mb={2}>
						<Skeleton variant="text" width="60%" />
						<Skeleton variant="text" />
					</Box>
					<Box mb={2}>
						<Skeleton variant="text" width="60%" />
						<Skeleton variant="text" />
					</Box>
					<Box mb={2}>
						<Skeleton variant="text" width="60%" />
						<Skeleton variant="text" />
					</Box>
					<Box mb={2}>
						<Skeleton variant="text" width="60%" />
						<Skeleton variant="text" />
					</Box>
				</Grid>
			</Grid>
			<Grid container spacing={2} align="right">
				<Grid item md xs={12}>
					<Skeleton variant="rect" height={40} width={"40%"} style={{marginTop: 10}}/>
				</Grid>
			</Grid>
		</Container>
	);
}

const DrawerComponent = ({drawerState, setDrawerState}) => {
	const anime = useSelector(state => state.anime);
	const dispatch = useDispatch();
	let history = useHistory();

	const closeAnime = () => {
		setDrawerState({status: false});
		history.push('/');
	}

	return (
		<Drawer anchor="bottom" open={drawerState.status} onClose={() => closeAnime()}>
			<div style={{paddingTop: 20, paddingBottom: 50}}>
		    	{anime.currentAnime != null ? <Anime anime={anime.currentAnime} setDrawerState={setDrawerState} closeAnime={closeAnime} /> : <AnimeSkeleton />}
		    </div>
	    </Drawer>
	);
}

export { DrawerComponent as AnimeDrawer };
