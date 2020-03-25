import React from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Player } from 'video-react';

import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import AddIcon from '@material-ui/icons/Add';

const EpisodeInput = withStyles(theme => ({
  root: {
  	marginRight: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 5,
    '&:focus': {
      backgroundColor: "white",
    },
  },
}))(InputBase);

const PlayerComponent = ({anime}) => {
  	const styles = {
		backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${anime.banner.url})`,
		backgroundSize: 'cover'

	}

	const episodesArr = Array.from(Array(anime.episodes.animed).keys());

	return (
		<Box pt={10} pb={5} color="white" style={styles}>
		  	<Container>
		        <Grid container>
			        <Grid item md xs={12}>
			        	<Box fontSize={24} textAlign={"left"} fontWeight="600">
			        		{anime.title.ua}
			        	</Box>
			        	<Box fontSize={21} textAlign={"left"} color="rgba(255, 255, 255, 0.5)">
			        		{anime.title.jp}
			        	</Box>
			        </Grid>
			        <Grid item md xs={12}>
			        	<Box textAlign={{xs: "left", md: "right"}}>
			        		<Box fontSize={48} component="span" fontWeight="600">{anime.episodes.animed}</Box>
			        		<Box fontSize={24} component="span" fontWeight="600" color="rgba(255, 255, 255, 0.5)">/{anime.episodes.general ? anime.episodes.general : "?"}</Box>
			        	</Box>
			        </Grid>
		        </Grid>
		        <Grid container justify="center" style={{ marginTop: 20 }}>
		        	<Grid item md={8} sm={10} xs={12}>
			        	<Player
					      playsInline
					      poster="/assets/poster.png"
					      src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
					    />
			        </Grid>
		        </Grid>
		        <Grid container justify="center" alignItems="center" style={{ marginTop: 20 }}>
		        	<Grid item md={8} sm={10} xs={12}>
			        	<Grid container alignItems="center" spacing={2}>
				        	<Grid item>
				        		<Hidden only="xs">
						        	<Button color="inherit" variant="outlined">
						        		Попередня
						        	</Button>
					        	</Hidden>
					        	<Hidden smUp>
					        		<IconButton edge="start" color="inherit">
								    	<SkipPreviousIcon fontSize="large" />
								    </IconButton>
					        	</Hidden>
					        </Grid>
					        <Grid item>
					        	<Select
					        	defaultValue={1}
					        	input={<EpisodeInput />}
						        >
						          {episodesArr.map(episode => 
						          	<MenuItem value={episode+1}>{episode+1}</MenuItem>
						          )}
						          
						        </Select>
					        	<Typography variant="subtitle2" component="span">
								  з {anime.episodes.released}
								</Typography>
					        </Grid>
					        <Grid item>
					        	<Hidden only="xs">
						        	<Button color="inherit" variant="outlined">
						        		Наступна
						        	</Button>
						        </Hidden>
						        <Hidden smUp>
					        		<IconButton edge="start" color="inherit">
								    	<SkipNextIcon fontSize="large" />
								    </IconButton>
					        	</Hidden>
					        </Grid>
					        <Grid item md sm xs style={{textAlign: "right"}}>
					        	<Hidden only="xs">
						        	<Button color="inherit" variant="outlined">
						        		Додати у список
						        	</Button>
					        	</Hidden>
					        	<Hidden smUp>
					        		<IconButton edge="start" color="inherit">
								    	<AddIcon fontSize="large" />
								    </IconButton>
					        	</Hidden>
					        </Grid>
				        </Grid>
			        </Grid>
		        </Grid>
		        
			</Container>
		</Box>
	);
}



export { PlayerComponent as Player };
